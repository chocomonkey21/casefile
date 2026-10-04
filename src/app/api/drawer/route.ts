import { json } from "@/lib/teach/server";
import { normaliseCode } from "@/lib/teach/security";
import { getClass, listItems, summarise } from "@/lib/teach/store";
import { kvKind } from "@/lib/teach/kv";

/**
 * A student's Drawer: the items from every class whose code they joined. GET /api/drawer?codes=CODE1,CODE2
 * Signed-up students only (proxy.ts). The class code is the key: anyone who has it can read that class's Drawer,
 * which is why teachers should share codes only with their class.
 */
export async function GET(request: Request) {
  if (kvKind() === "none") return json({ error: "no-storage" }, 503);
  const raw = new URL(request.url).searchParams.get("codes") ?? "";
  const codes = [...new Set(raw.split(",").map(normaliseCode).filter((c): c is string => c !== null))].slice(0, 10);
  const classes = await Promise.all(
    codes.map(async (code) => {
      const c = await getClass(code);
      if (!c) return { code, missing: true as const };
      const items = (await listItems(code)).map((i) => ({ ...i, file: i.file ? { name: i.file.name, type: i.file.type, size: i.file.size } : null }));
      return { ...summarise(c), items };
    }),
  );
  return json({ classes });
}
