import encrypted from "../data/encryptedPosts.json";

// Locked post bodies ship as AES-256-GCM ciphertext only. The key is derived
// from the reader's password with PBKDF2, so plaintext is never in the bundle.
// Regenerate the ciphertext with:
//
//   BLOG_PASSWORD='your-password' npm run encrypt-posts
//
// Plaintext sources live in src/content/blog-locked/, which is gitignored.
//
// Nothing is cached or persisted: no derived key is kept between posts and no
// unlock is written to storage. Every locked post asks for the password again,
// and leaving a post re-locks it.

export const isLocked = (slug) => Boolean(encrypted.posts[slug]);

export const LOCKED_SLUGS = Object.keys(encrypted.posts);

const fromBase64 = (value) =>
  Uint8Array.from(atob(value), (char) => char.charCodeAt(0));

const requireSubtle = () => {
  const subtle = typeof window !== "undefined" && window.crypto?.subtle;
  if (!subtle) {
    // WebCrypto needs a secure context. Production is https, so this only
    // trips on a plain-http host.
    throw new Error("Unlocking needs a secure (https) context.");
  }
  return subtle;
};

const deriveKey = async (password) => {
  const subtle = requireSubtle();
  const material = await subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );
  return subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: fromBase64(encrypted.salt),
      iterations: encrypted.iterations,
      hash: "SHA-256",
    },
    material,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"]
  );
};

// Returns the decrypted { en, ko } bodies for one post, or null when the
// password is wrong. GCM authentication is the password check: a bad key
// simply fails to decrypt.
export const unlockPost = async (slug, password) => {
  const entry = encrypted.posts[slug];
  if (!entry) return null;

  const subtle = requireSubtle();
  const key = await deriveKey(password);

  const bodies = {};
  for (const [lang, payload] of Object.entries(entry)) {
    try {
      const plaintext = await subtle.decrypt(
        { name: "AES-GCM", iv: fromBase64(payload.iv) },
        key,
        fromBase64(payload.body)
      );
      bodies[lang] = new TextDecoder().decode(plaintext);
    } catch {
      return null;
    }
  }
  return bodies;
};
