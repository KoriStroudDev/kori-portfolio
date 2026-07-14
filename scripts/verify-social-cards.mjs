import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import sharp from "sharp";
import {
  generateSocialCards,
  SOCIAL_CARD_HEIGHT,
  SOCIAL_CARD_WIDTH,
  socialCards,
} from "./generate-social-cards.mjs";

const firstDirectory = await mkdtemp(join(tmpdir(), "kori-social-verify-a-"));
const secondDirectory = await mkdtemp(join(tmpdir(), "kori-social-verify-b-"));

try {
  const first = await generateSocialCards({ outputDirectory: firstDirectory });
  const second = await generateSocialCards({ outputDirectory: secondDirectory });
  assert.equal(first.length, socialCards.length);
  assert.equal(second.length, socialCards.length);

  for (const card of socialCards) {
    const firstPath = join(firstDirectory, card.file);
    const secondPath = join(secondDirectory, card.file);
    const firstBytes = await readFile(firstPath);

    assert.deepEqual(firstBytes, await readFile(secondPath), `${card.file} changed between identical generations`);

    const metadata = await sharp(firstPath).metadata();
    assert.equal(metadata.format, "png");
    assert.equal(metadata.width, SOCIAL_CARD_WIDTH);
    assert.equal(metadata.height, SOCIAL_CARD_HEIGHT);
  }

  console.log(`Verified ${socialCards.length} deterministic 1200×630 social cards.`);
} finally {
  await Promise.all([
    rm(firstDirectory, { recursive: true, force: true }),
    rm(secondDirectory, { recursive: true, force: true }),
  ]);
}
