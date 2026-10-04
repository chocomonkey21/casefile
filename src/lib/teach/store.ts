import { kvDel, kvGet, kvGetRaw, kvSet, kvSetRaw, kvUpdateList } from "./kv";
import { hashPassword, newClassCode, newId, verifyPassword } from "./security";
import type { ClassRecord, ClassSummary, DrawerFile, DrawerItem, TeacherRecord } from "./types";
import type { Board, Grade } from "@/lib/types";

/*
  Teacher accounts, classes and Drawer items. Server only.

  Keys (all under the prefix in kv.ts):
    teacher:<id>              TeacherRecord
    teacher-user:<username>   the teacher id for a username
    teacher-classes:<id>      the class codes a teacher made
    class:<code>              ClassRecord
    class-items:<code>        the Drawer item ids in a class, newest first
    item:<id>                 DrawerItem
    file:<id>:<n>             part n of an item's file, base64

  Files are split into parts so each stored value stays well under Upstash's request size limit.
*/

const CHUNK_BYTES = 400 * 1024;

/* ---------- Teachers ---------- */

export async function getTeacherById(id: string): Promise<TeacherRecord | null> {
  return kvGet<TeacherRecord>(`teacher:${id}`);
}

export async function findTeacher(username: string): Promise<TeacherRecord | null> {
  const id = await kvGet<string>(`teacher-user:${username}`);
  return id ? getTeacherById(id) : null;
}

export async function createTeacher(input: { username: string; name: string; board: Board; password: string }): Promise<TeacherRecord | "taken"> {
  if (await kvGet<string>(`teacher-user:${input.username}`)) return "taken";
  const { salt, hash } = await hashPassword(input.password);
  const teacher: TeacherRecord = {
    id: newId(),
    username: input.username,
    name: input.name,
    board: input.board,
    salt,
    hash,
    createdAt: new Date().toISOString(),
  };
  await kvSet(`teacher:${teacher.id}`, teacher);
  await kvSet(`teacher-user:${teacher.username}`, teacher.id);
  return teacher;
}

export async function checkTeacherLogin(username: string, password: string): Promise<TeacherRecord | null> {
  const teacher = await findTeacher(username);
  if (!teacher) {
    // Spend the same time as a real check, so response time does not reveal which usernames exist
    await verifyPassword(password, "AAAAAAAAAAAAAAAAAAAAAA==", "A".repeat(88));
    return null;
  }
  return (await verifyPassword(password, teacher.salt, teacher.hash)) ? teacher : null;
}

/** Delete a teacher account and everything it owns: classes, Drawer items and files */
export async function deleteTeacher(teacher: TeacherRecord): Promise<void> {
  for (const c of await listClasses(teacher.id)) await deleteClass(teacher.id, c.code);
  await kvDel(`teacher-classes:${teacher.id}`);
  await kvDel(`teacher-user:${teacher.username}`);
  await kvDel(`teacher:${teacher.id}`);
}

/* ---------- Classes ---------- */

export async function getClass(code: string): Promise<ClassRecord | null> {
  return kvGet<ClassRecord>(`class:${code}`);
}

export function summarise(c: ClassRecord): ClassSummary {
  return { code: c.code, name: c.name, grade: c.grade, board: c.board, teacherName: c.teacherName };
}

export async function listClasses(teacherId: string): Promise<ClassRecord[]> {
  const codes = (await kvGet<string[]>(`teacher-classes:${teacherId}`)) ?? [];
  const all = await Promise.all(codes.map(getClass));
  return all.filter((c): c is ClassRecord => c !== null);
}

export async function createClass(teacher: TeacherRecord, name: string, grade: Grade): Promise<ClassRecord> {
  let code = newClassCode();
  // Codes are random; in the very unlikely case of a clash, draw again
  for (let i = 0; i < 5 && (await getClass(code)); i++) code = newClassCode();
  const record: ClassRecord = { code, teacherId: teacher.id, teacherName: teacher.name, name, grade, board: teacher.board, createdAt: new Date().toISOString() };
  await kvSet(`class:${code}`, record);
  await kvUpdateList(`teacher-classes:${teacher.id}`, (list) => [...list, code]);
  return record;
}

export async function deleteClass(teacherId: string, code: string): Promise<boolean> {
  const c = await getClass(code);
  if (!c || c.teacherId !== teacherId) return false;
  for (const item of await listItems(code)) await deleteItemData(item);
  await kvDel(`class-items:${code}`);
  await kvDel(`class:${code}`);
  await kvUpdateList(`teacher-classes:${teacherId}`, (list) => list.filter((x) => x !== code));
  return true;
}

/* ---------- Drawer items ---------- */

export async function listItems(code: string): Promise<DrawerItem[]> {
  const ids = (await kvGet<string[]>(`class-items:${code}`)) ?? [];
  const all = await Promise.all(ids.map((id) => kvGet<DrawerItem>(`item:${id}`)));
  return all.filter((x): x is DrawerItem => x !== null);
}

export async function getItem(id: string): Promise<DrawerItem | null> {
  return /^[a-f0-9]{24}$/.test(id) ? kvGet<DrawerItem>(`item:${id}`) : null;
}

export async function addItem(
  classCode: string,
  fields: { title: string; message: string; link: string | null; dueDate: string | null },
  upload: { name: string; type: string; bytes: Buffer } | null,
): Promise<DrawerItem> {
  const id = newId();
  let file: DrawerFile | null = null;
  if (upload) {
    const chunks = Math.max(1, Math.ceil(upload.bytes.length / CHUNK_BYTES));
    for (let n = 0; n < chunks; n++) {
      await kvSetRaw(`file:${id}:${n}`, upload.bytes.subarray(n * CHUNK_BYTES, (n + 1) * CHUNK_BYTES).toString("base64"));
    }
    file = { name: upload.name, type: upload.type, size: upload.bytes.length, chunks };
  }
  const item: DrawerItem = { id, classCode, ...fields, file, createdAt: new Date().toISOString() };
  await kvSet(`item:${id}`, item);
  await kvUpdateList(`class-items:${classCode}`, (list) => [id, ...list]);
  return item;
}

async function deleteItemData(item: DrawerItem) {
  if (item.file) for (let n = 0; n < item.file.chunks; n++) await kvDel(`file:${item.id}:${n}`);
  await kvDel(`item:${item.id}`);
}

export async function deleteItem(teacherId: string, id: string): Promise<boolean> {
  const item = await getItem(id);
  if (!item) return false;
  const c = await getClass(item.classCode);
  if (!c || c.teacherId !== teacherId) return false;
  await deleteItemData(item);
  await kvUpdateList(`class-items:${item.classCode}`, (list) => list.filter((x) => x !== id));
  return true;
}

export async function readFileBytes(item: DrawerItem): Promise<Buffer | null> {
  if (!item.file) return null;
  const parts: Buffer[] = [];
  for (let n = 0; n < item.file.chunks; n++) {
    const raw = await kvGetRaw(`file:${item.id}:${n}`);
    if (raw === null) return null;
    parts.push(Buffer.from(raw, "base64"));
  }
  return Buffer.concat(parts);
}
