// Encrypts locked post bodies at build time.
//
//   BLOG_PASSWORD='...' npm run encrypt-posts
//
// Reads plaintext from src/content/blog-locked/ (gitignored, never deployed)
// and writes ciphertext to src/data/encryptedPosts.json (committed, bundled).
// The browser derives the same key from the password the reader types, so the
// plaintext never ships.

import { readFile, writeFile, readdir, mkdir } from "node:fs/promises";
import { webcrypto } from "node:crypto";
import path from "node:path";

const SOURCE_DIR = "src/content/blog-locked";
const OUTPUT_FILE = "src/data/encryptedPosts.json";
const ITERATIONS = 250_000;

const password = process.env.BLOG_PASSWORD;
if (!password) {
  console.error("BLOG_PASSWORD is required.");
  console.error("Usage: BLOG_PASSWORD='your-password' npm run encrypt-posts");
  process.exit(1);
}

const { subtle } = webcrypto;
// Not destructured: getRandomValues throws if it loses its `this` binding.
const randomBytes = (length) => webcrypto.getRandomValues(new Uint8Array(length));
const toBase64 = (bytes) => Buffer.from(bytes).toString("base64");

const deriveKey = async (salt) => {
  const material = await subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );
  return subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: ITERATIONS, hash: "SHA-256" },
    material,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt"]
  );
};

// One salt for the whole file means the reader derives the key once and every
// locked post opens instantly afterwards.
const salt = randomBytes(16);
const key = await deriveKey(salt);

const files = (await readdir(SOURCE_DIR)).filter((name) => name.endsWith(".md"));
const posts = {};

for (const file of files.sort()) {
  const match = file.match(/^(.+)\.(en|ko)\.md$/);
  if (!match) {
    console.warn(`skipping ${file}: expected <slug>.<en|ko>.md`);
    continue;
  }

  const [, slug, lang] = match;
  const plaintext = await readFile(path.join(SOURCE_DIR, file), "utf8");
  const iv = randomBytes(12);
  const ciphertext = await subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    new TextEncoder().encode(plaintext)
  );

  posts[slug] ??= {};
  posts[slug][lang] = { iv: toBase64(iv), body: toBase64(ciphertext) };
}

await mkdir(path.dirname(OUTPUT_FILE), { recursive: true });
await writeFile(
  OUTPUT_FILE,
  `${JSON.stringify(
    { version: 1, iterations: ITERATIONS, salt: toBase64(salt), posts },
    null,
    2
  )}\n`
);

const slugs = Object.keys(posts);
console.log(`Encrypted ${files.length} files across ${slugs.length} posts.`);
for (const slug of slugs) {
  console.log(`  ${slug} [${Object.keys(posts[slug]).sort().join(", ")}]`);
}
