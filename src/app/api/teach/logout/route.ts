import { endTeacherSession, json, sameSite } from "@/lib/teach/server";

/** Sign the teacher out on this browser */
export async function POST(request: Request) {
  if (!sameSite(request)) return json({ error: "forbidden" }, 403);
  await endTeacherSession();
  return json({ ok: true });
}
