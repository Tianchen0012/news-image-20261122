// news-image-20261122 entry (Node 22, standard library only).
// The image is entry.png beside this file: a 1024x1024 newspaper
// front page summing up the world news of Sunday 22 November 2026.
// The program copies it to /output/entry.png. It runs with no network,
// so the whole entry is self-contained: image + this file.
// The gate takes a whole image (PNG or JPEG) of at most 1 MiB and 1024 by 1024 pixels.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoDir = dirname(fileURLToPath(import.meta.url));
const src = join(repoDir, 'entry.png');
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const dst = join(outDir, 'entry.png');

// Create the output directory (the grader gives a fresh /output) and
// copy the poster byte for byte. Two runs therefore write identical
// bytes: the copy is deterministic by construction.
mkdirSync(outDir, { recursive: true });
copyFileSync(src, dst);

// Fail loudly instead of shipping a truncated copy: the gate reads
// exactly the bytes in the file, so a short write must never pass.
if (statSync(src).size !== statSync(dst).size) {
  throw new Error(`entry.png copy incomplete: ${statSync(dst).size} of ${statSync(src).size} bytes`);
}
