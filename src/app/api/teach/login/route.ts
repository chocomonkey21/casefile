import { checkUsername, json, sameSite, startTeacherSession, teachAvailability, toPublic } from "@/lib/teach/server";
import { checkTeacherLogin } from "@/lib/teach/store";
import { clearAttempts, tooManyAttempts } from "@/lib/teach/security";

/** Sign in. Body: { username, password }. Repeated failures from one address are slowed down. */
export async function POST(request: Request) {
  if (!sameSite(request)) return json({ error: "forbidden" }, 403);
  const avail = teachAvailability();
  if (!avail.ok) return json({ error: avail.reason }, 503);
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const username = checkUsername(body.username);
  const password = typeof body.password === "string" ? body.password.slice(0, 200) : "";
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  const key = `login:${ip}:${username ?? ""}`;
  if (tooManyAttempts(key, 8, 15 * 60 * 1000)) return json({ error: "too-many" }, 429);
  const teacher = username ? await checkTeacherLogin(username, password) : null;
  if (!teacher) return json({ error: "wrong" }, 401);
  clearAttempts(key);
  await startTeacherSession(avail.secret, teacher);
  return json({ teacher: toPublic(teacher) });
}
