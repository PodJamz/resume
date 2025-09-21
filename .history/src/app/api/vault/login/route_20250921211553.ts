import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getVaultCookieName, safeEqual, signSession } from "@/lib/vaultAuth";

export async function POST(req: Request) {
  const { password } = await req.json().catch(() => ({ password: "" }));
  const expected = process.env.VAULT_PASSWORD || "";

  if (!expected) {
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  if (!password || !safeEqual(password, expected)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const exp = Date.now() + 24 * 60 * 60 * 1000; // 24h
  const token = signSession({ sub: "vault", exp });

  const cookieStore = await cookies();
  cookieStore.set(getVaultCookieName(), token, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return NextResponse.json({ ok: true });
}
