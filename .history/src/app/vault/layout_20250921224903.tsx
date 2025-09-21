import { cookies } from "next/headers";
import { verifySession, getVaultCookieName } from "@/lib/vaultAuth";
import React from "react";
import { VaultUnlockForm } from "@/components/vault/VaultUnlockForm";

export default async function VaultLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get(getVaultCookieName())?.value;
  const session = verifySession(token);

  if (!session) {
    return (
      <section className="max-w-[600px] mx-auto py-16 px-4">
        <h1 className="text-3xl font-bold mb-4">Vault</h1>
        <p className="text-zinc-500 mb-6">Enter password to access the vault.</p>
        <VaultUnlockForm />
      </section>
    );
  }

  return <>{children}</>;
}
