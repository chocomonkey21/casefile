import { parseGrade } from "@/lib/access";
import { clean, getSignedInTeacher, json, sameSite } from "@/lib/teach/server";
import { createClass, listClasses } from "@/lib/teach/store";

/** Create a class. Body: { name, grade }. Its code is what students type to join. */
export async function POST(request: Request) {
  if (!sameSite(request)) return json({ error: "forbidden" }, 403);
  const teacher = await getSignedInTeacher();
  if (!teacher) return json({ error: "signed-out" }, 401);
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const name = clean(body.name, 60);
  const grade = parseGrade(String(body.grade ?? ""));
  if (!name) return json({ error: "name" }, 400);
  if (!grade) return json({ error: "grade" }, 400);
  if ((await listClasses(teacher.id)).length >= 30) return json({ error: "too-many-classes" }, 400);
  const c = await createClass(teacher, name, grade);
  return json({ class: { code: c.code, name: c.name, grade: c.grade, board: c.board, teacherName: c.teacherName, createdAt: c.createdAt, itemCount: 0 } }, 201);
}
