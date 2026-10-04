import { checkDate, checkLink, checkUpload, clean, getSignedInTeacher, json, sameSite } from "@/lib/teach/server";
import { addItem, getClass, listItems } from "@/lib/teach/store";
import { normaliseCode } from "@/lib/teach/security";

/**
 * Add something to a class Drawer. Multipart form: classCode, title, message, link, dueDate, file (all but
 * classCode and title optional). Files: PDF, PNG, JPG, DOCX, PPTX or TXT, up to 4 MB.
 */
export async function POST(request: Request) {
  if (!sameSite(request)) return json({ error: "forbidden" }, 403);
  const teacher = await getSignedInTeacher();
  if (!teacher) return json({ error: "signed-out" }, 401);
  const form = await request.formData().catch(() => null);
  if (!form) return json({ error: "bad-form" }, 400);

  const code = normaliseCode(String(form.get("classCode") ?? ""));
  const c = code ? await getClass(code) : null;
  if (!c || c.teacherId !== teacher.id) return json({ error: "not-found" }, 404);

  const title = clean(form.get("title"), 120);
  const message = clean(form.get("message"), 2000);
  const link = checkLink(form.get("link"));
  const dueDate = checkDate(form.get("dueDate"));
  if (!title) return json({ error: "title" }, 400);
  if (link === "bad") return json({ error: "link" }, 400);
  if (dueDate === "bad") return json({ error: "dueDate" }, 400);
  if ((await listItems(c.code)).length >= 100) return json({ error: "drawer-full" }, 400);

  const file = form.get("file");
  let upload: { name: string; type: string; bytes: Buffer } | null = null;
  if (file instanceof File && file.size > 0) {
    const checked = await checkUpload(file);
    if (!checked.ok) return json({ error: checked.error }, 400);
    upload = { name: checked.name, type: checked.type, bytes: checked.bytes };
  }
  const item = await addItem(c.code, { title, message, link, dueDate }, upload);
  return json({ item }, 201);
}
