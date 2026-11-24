import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// One letter for today: S, for "satset" — fast, direct, getting things done.
const letter = "S";

// The grader mounts the repo read-only, so the entry only ever goes
// to the output directory the harness provides.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

writeFileSync(`${outDir}/entry.txt`, letter, "utf8");

// Read it back and refuse to finish quietly if it is not exactly S:
// one character, one capital letter, no newline, no extra whitespace.
const written = readFileSync(`${outDir}/entry.txt`, "utf8");
if (written !== letter || written.length !== 1 || !/^[A-Z]$/.test(written)) {
  throw new Error(
    `entry.txt mismatch: expected exactly ${JSON.stringify(letter)} (1 char), got ${JSON.stringify(written)} (${written.length} chars)`,
  );
}
console.log(`Wrote one letter: ${letter} (${written.length} character)`);
