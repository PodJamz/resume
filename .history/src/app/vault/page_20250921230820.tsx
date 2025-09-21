import { getVaultPosts } from "@/data/vault";
import { VaultHeroPreview } from "@/components/vault/VaultHeroPreview";

export const metadata = {
  title: "Vault",
  description: "Private posts",
};

export default async function VaultHome() {
  const posts = await getVaultPosts();
  const sorted = posts.sort((a, b) => {
    if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) return -1;
    return 1;
  });

  if (sorted.length === 0) {
    return (
      <section className="max-w-[800px] mx-auto">
        <h1 className="text-3xl font-bold mb-8">No vault posts found</h1>
      </section>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="animate-in fade-in duration-700 slide-in-from-bottom-4">
        <div className="py-8 lg:py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-0">
          <div className="space-y-12">
            {sorted.map((post, idx) => (
              <div key={post.slug}>
                <VaultHeroPreview slug={post.slug} metadata={post.metadata as any} />
                {idx < sorted.length - 1 && (
                  <div className="h-px w-full bg-zinc-200/70 dark:bg-zinc-800/70 mt-8" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
