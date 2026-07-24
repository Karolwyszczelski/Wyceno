import { existsSync } from "node:fs";
import { cp, mkdir } from "node:fs/promises";

const standaloneRoot = new URL("../.next/standalone/apps/web/", import.meta.url);
const copies = [
  {
    source: new URL("../.next/static/", import.meta.url),
    target: new URL(".next/static/", standaloneRoot),
  },
  {
    source: new URL("../public/", import.meta.url),
    target: new URL("public/", standaloneRoot),
  },
];

await mkdir(standaloneRoot, { recursive: true });

for (const { source, target } of copies) {
  if (existsSync(source)) {
    await cp(source, target, { force: true, recursive: true });
  }
}
