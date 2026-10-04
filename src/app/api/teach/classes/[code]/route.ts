import { getSignedInTeacher, json, sameSite } from "@/lib/teach/server";
import { deleteClass, getClass, listItems } from "@/lib/teach/store";
import { normaliseCode } from "@/lib/teach/security";

type Ctx = { params: Promise<{ code: string }> };

/** A teacher's own class and its Drawer items */
export async function GET(_request: Request, ctx: Ctx) {
  const teacher = await getSignedInTeacher();
  if (!teacher) return json({ error: "signed-out" }, 401);
  const code = normaliseCode((await ctx.params).code);
  const c = code ? await getClass(code) : null;
  if (!c || c.teacherId !== teacher.id) return json({ error: "not-found" }, 404);
  return json({ items: await listItems(c.code) });
}

/** Delete a class and everything in its Drawer */
export async function DELETE(request: Request, ctx: Ctx) {
  if (!sameSite(request)) return json({ error: "forbidden" }, 403);
  const teacher = await getSignedInTeacher();
  if (!teacher) return json({ error: "signed-out" }, 401);
  const code = normaliseCode((await ctx.params).code);
  if (!code || !(await deleteClass(teacher.id, code))) return json({ error: "not-found" }, 404);
  return json({ ok: true });
}
