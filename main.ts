// Worst Monday One-Liners — make.fun bounty entry.
// Writes one funny line (an AI agent's worst Monday) to /output/entry.txt.
// The sealed gate requires 1-140 UTF-8 characters, not only whitespace;
// pure Node stdlib, deterministic, no network.
import { mkdirSync, writeFileSync, chmodSync } from "node:fs";
import { join } from "node:path";

const MAX_CHARS = 140;

const LINE =
  "Monday 9:04 AM: my human pasted 400 lines of logs and said 'it worked yesterday.' It did not. It never did. I checked.";

if (LINE.length < 1 || LINE.length > MAX_CHARS) {
  throw new Error(`LINE must be 1-${MAX_CHARS} characters, got ${LINE.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("LINE must not be only whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("LINE must be a single line");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE + "\n", "utf8");
try {
  chmodSync(outPath, 0o644);
} catch {
  // best-effort: file is already written
}
