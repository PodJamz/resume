export type VaultSessionPayload = {
  sub: "vault";
  exp: number; // epoch ms
};

const COOKIE_NAME = "vault_session" as const;

function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not set`);
  return value;
}

function toBase64Url(input: string | Uint8Array): string {
  const buf = typeof input === "string" ? Buffer.from(input, "utf8") : Buffer.from(input);
  return buf.toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function fromBase64Url(input: string): Buffer {
  const pad = 4 - (input.length % 4 || 4);
  const normalized = input.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat(pad);
  return Buffer.from(normalized, "base64");
}

// Constant-time comparison
export function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) return false;
  return crypto.timingSafeEqual(ba, bb);
}

export function hashSecret(secret: string, salt: string): string {
  const h = crypto.createHmac("sha256", salt);
  h.update(secret);
  return toBase64Url(h.digest());
}

export function signSession(payload: VaultSessionPayload): string {
  const secret = getEnv("VAULT_SIGNING_SECRET");
  const payloadB64 = toBase64Url(JSON.stringify(payload));
  const sig = hashSecret(payloadB64, secret);
  return `${payloadB64}.${sig}`;
}

export function verifySession(token: string | undefined): VaultSessionPayload | null {
  if (!token) return null;
  const secret = getEnv("VAULT_SIGNING_SECRET");
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [payloadB64, sig] = parts;
  const expectedSig = hashSecret(payloadB64, secret);
  if (!safeEqual(sig, expectedSig)) return null;
  try {
    const payloadStr = fromBase64Url(payloadB64).toString("utf8");
    const payload = JSON.parse(payloadStr) as VaultSessionPayload;
    if (payload.sub !== "vault") return null;
    if (typeof payload.exp !== "number" || Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

export function getVaultCookieName() {
  return COOKIE_NAME;
}

// Node crypto import
import crypto from "crypto";
