import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, editorConfig, verifySession } from "./session";

export type EditorState =
  | { status: "not-configured"; problems: string[] }
  | { status: "signed-out" }
  | { status: "signed-in" };

/** Reads the editor's session cookie and checks its signature. Server only. */
export async function getEditorState(): Promise<EditorState> {
  const cfg = editorConfig();
  if (!cfg.configured) return { status: "not-configured", problems: cfg.problems };
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  return verifySession(cfg.secret, token) ? { status: "signed-in" } : { status: "signed-out" };
}

/**
 * Every editor page and every editor action starts with this. Anything that is not a valid, signed,
 * unexpired session is sent to the sign-in screen. Server Actions can be called directly over HTTP,
 * so hiding a button in the page is never enough on its own.
 */
export async function requireEditor(): Promise<void> {
  const state = await getEditorState();
  if (state.status !== "signed-in") redirect("/studio");
}
