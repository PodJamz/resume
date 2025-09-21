import { cookies } from "next/headers";
import { verifySession, getVaultCookieName } from "@/lib/vaultAuth";
import React from "react";

export default async function VaultLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get(getVaultCookieName())?.value;
  const session = verifySession(token);

  if (!session) {
    return (
      <section className="max-w-[600px] mx-auto py-16 px-4">
        <h1 className="text-3xl font-bold mb-4">Vault</h1>
        <p className="text-zinc-500 mb-6">Enter password to access the vault.</p>
        <form className="space-y-4" action="/api/vault/login" method="post" id="vault-form">
          <input type="password" name="password" className="w-full rounded-md border px-3 py-2 bg-background" placeholder="Password" autoComplete="current-password" />
          <button formAction="#" onClick={async (e) => { e.preventDefault(); const form = document.getElementById("vault-form") as HTMLFormElement; const data = new FormData(form); const res = await fetch("/api/vault/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password: data.get("password") }) }); if (res.ok) location.replace("/vault"); else alert("Invalid password"); }} className="inline-flex items-center rounded-md border px-4 py-2">Unlock</button>
        </form>
      </section>
    );
  }

  return <>{children}</>;
}
