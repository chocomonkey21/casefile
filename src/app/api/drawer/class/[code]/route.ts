import { json } from "@/lib/teach/server";
import { normaliseCode, tooManyAttempts } from "@/lib/teach/security";
import { getClass, summarise } from "@/lib/teach/store";

/**
 * Look up a class by its code, so a student can check it before joining. Signed-up students only (proxy.ts).
 * Guessing is slowed down: codes are 8 random characters, and each address gets a limited number of tries.
 */
export async function GET(request: Request, ctx: { params: Promise<{ code: string }> }) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (tooManyAttempts(`join:${ip}`, 20, 15 * 60 * 1000)) return json({ error: "too-many" }, 429);
  const code = normaliseCode((await ctx.params).code);
  const c = code ? await getClass(code) : null;
  if (!c) return json({ error: "not-found" }, 404);
  return json({ class: summarise(c) });
}
