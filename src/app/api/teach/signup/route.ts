import { clean, checkBoard, checkUsername, json, sameSite, startTeacherSession, teachAvailability, toPublic } from "@/lib/teach/server";
import { createTeacher } from "@/lib/teach/store";
import { tooManyAttempts } from "@/lib/teach/security";

/** Create a teacher account and sign in. Body: { name, username, password, board } */
export async function POST(request: Request) {
  if (!sameSite(request)) return json({ error: "forbidden" }, 403);
  const avail = teachAvailability();
  if (!avail.ok) return json({ error: avail.reason }, 503);
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (tooManyAttempts(`signup:${ip}`, 10, 60 * 60 * 1000)) return json({ error: "too-many" }, 429);

  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const name = clean(body.name, 60);
  const username = checkUsername(body.username);
  const password = typeof body.password === "string" ? body.password : "";
  const board = checkBoard(body.board);
  if (!name) return json({ error: "name" }, 400);
  if (!username) return json({ error: "username" }, 400);
  if (password.length < 10 || password.length > 200) return json({ error: "password" }, 400);
  if (!board) return json({ error: "board" }, 400);

  const teacher = await createTeacher({ name, username, password, board });
  if (teacher === "taken") return json({ error: "taken" }, 409);
  await startTeacherSession(avail.secret, teacher);
  return json({ teacher: toPublic(teacher) }, 201);
}
