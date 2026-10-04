import { endTeacherSession, getSignedInTeacher, json, sameSite, teachAvailability, toPublic } from "@/lib/teach/server";
import { deleteTeacher, listClasses, listItems } from "@/lib/teach/store";

/** The signed-in teacher and their classes (with how many Drawer items each has) */
export async function GET() {
  const avail = teachAvailability();
  if (!avail.ok) return json({ error: avail.reason }, 503);
  const teacher = await getSignedInTeacher();
  if (!teacher) return json({ error: "signed-out" }, 401);
  const classes = await listClasses(teacher.id);
  const withCounts = await Promise.all(
    classes.map(async (c) => ({
      code: c.code,
      name: c.name,
      grade: c.grade,
      board: c.board,
      teacherName: c.teacherName,
      createdAt: c.createdAt,
      itemCount: (await listItems(c.code)).length,
    })),
  );
  return json({ teacher: toPublic(teacher), classes: withCounts });
}

/** Delete the signed-in teacher's account, with all their classes, Drawer items and files, then sign out */
export async function DELETE(request: Request) {
  if (!sameSite(request)) return json({ error: "forbidden" }, 403);
  const teacher = await getSignedInTeacher();
  if (!teacher) return json({ error: "signed-out" }, 401);
  await deleteTeacher(teacher);
  await endTeacherSession();
  return json({ ok: true });
}
