// Compiles the course data files with tsc into a temporary folder and returns a require function for them.
// The data files only import types, so no extra tooling is needed.
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";

export const TMP = ".tmp-curriculum";

export function compileData() {
  rmSync(TMP, { recursive: true, force: true });
  mkdirSync(TMP, { recursive: true });
  writeFileSync(
    `${TMP}/tsconfig.json`,
    JSON.stringify({
      extends: "../tsconfig.json",
      compilerOptions: { module: "commonjs", moduleResolution: "node", outDir: "./js", rootDir: "../src", noEmit: false, incremental: false, plugins: [], jsx: "preserve", allowJs: false },
      include: ["../src/data/**/*.ts", "../src/lib/types.ts"],
    }),
  );
  try {
    execFileSync("npx tsc -p " + TMP + "/tsconfig.json", { stdio: "pipe", shell: true });
  } catch (e) {
    console.error(String(e.stdout || e.message));
    process.exit(1);
  }
  const require = createRequire(import.meta.url);
  return (path) => require(`../../${TMP}/js/${path}`);
}

export const cleanup = () => rmSync(TMP, { recursive: true, force: true });
