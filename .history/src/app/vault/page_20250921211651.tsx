import { getVaultPosts } from "@/data/vault";
import { PostHeader } from "@/components/blog/PostHeader";
import { BlogContent } from "@/components/blog/BlogContent";

export const metadata = {
  title: "Vault",
  description: "Private posts",
};

export default async function VaultHome() {
  const posts = await getVaultPosts();
  const latestPost = posts.sort((a, b) => {
    if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
      return -1;
    }
    return 1;
  })[0];

  if (!latestPost) {
    return (
      <section className="max-w-[800px] mx-auto">
        <h1 className="text-3xl font-bold mb-8">No vault posts found</h1>
      </section>
    );
  }

  const { title, publishedAt, summary, gradient, authors } = latestPost.metadata;

  return (
    <div className="min-h-screen">
      <div className="animate-in fade-in duration-700 slide-in-from-bottom-4">
        <div className="py-8 lg:py-12">
          <PostHeader title={title} summary={summary} publishedAt={publishedAt} authors={authors || []} />
          <BlogContent heroImageGradient={gradient || "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"} postSlug={latestPost.slug}>
            <div dangerouslySetInnerHTML={{ __html: latestPost.source }} />
          </BlogContent>
        </div>
      </div>
    </div>
  );
}
