import { getSignedInTeacher, json, sameSite } from "@/lib/teach/server";
import { deleteItem } from "@/lib/teach/store";

/** Remove an item (and its file) from a Drawer */
export async function DELETE(request: Request, ctx: { params: Promise<{ id: string }> }) {
  if (!sameSite(request)) return json({ error: "forbidden" }, 403);
  const teacher = await getSignedInTeacher();
  if (!teacher) return json({ error: "signed-out" }, 401);
  if (!(await deleteItem(teacher.id, (await ctx.params).id))) return json({ error: "not-found" }, 404);
  return json({ ok: true });
}
