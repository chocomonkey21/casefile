import { getSignedInTeacher, json } from "@/lib/teach/server";
import { normaliseCode } from "@/lib/teach/security";
import { getClass, getItem, readFileBytes } from "@/lib/teach/store";

/**
 * Download a file from a Drawer. GET /api/drawer/file/<itemId>?code=<classCode>
 * Students must give the class code the item belongs to; the class's own teacher can always download.
 * Files are served with headers that stop the browser running them as part of this site.
 */
export async function GET(request: Request, ctx: { params: Promise<{ id: string }> }) {
  const item = await getItem((await ctx.params).id);
  if (!item?.file) return json({ error: "not-found" }, 404);
  const code = normaliseCode(new URL(request.url).searchParams.get("code") ?? "");
  let allowed = code === item.classCode;
  if (!allowed) {
    const teacher = await getSignedInTeacher();
    const c = await getClass(item.classCode);
    allowed = !!teacher && !!c && c.teacherId === teacher.id;
  }
  if (!allowed) return json({ error: "not-found" }, 404);

  const bytes = await readFileBytes(item);
  if (!bytes) return json({ error: "not-found" }, 404);
  // PDFs and images open in the browser; other files download
  const pdf = item.file.type === "application/pdf";
  const inline = pdf || item.file.type.startsWith("image/");
  const headers: Record<string, string> = {
    "Content-Type": item.file.type,
    "Content-Length": String(bytes.length),
    "Content-Disposition": `${inline ? "inline" : "attachment"}; filename="${item.file.name.replace(/"/g, "")}"`,
    "X-Content-Type-Options": "nosniff",
    "Cache-Control": "private, no-store",
  };
  // A sandbox policy would stop the browser's own PDF viewer, which already isolates PDFs, so it is left off for them
  if (!pdf) headers["Content-Security-Policy"] = "sandbox; default-src 'none'; img-src 'self'; style-src 'unsafe-inline'";
  return new Response(new Uint8Array(bytes), { headers });
}
