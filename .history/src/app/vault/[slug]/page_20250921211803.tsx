import { getVaultPost } from "@/data/vault";
import { notFound } from "next/navigation";
import { PostHeader } from "@/components/blog/PostHeader";
import { BlogContent } from "@/components/blog/BlogContent";

export default async function VaultPost({ params }: { params: { slug: string } }) {
  const post = await getVaultPost(params.slug).catch(() => null);
  if (!post) notFound();
  const { title, publishedAt, summary, gradient, authors } = post.metadata;

  return (
    <div className="min-h-screen">
      <div className="animate-in fade-in duration-700 slide-in-from-bottom-4">
        <div className="py-8 lg:py-12">
          <PostHeader title={title} summary={summary} publishedAt={publishedAt} authors={authors || []} />
          <BlogContent heroImageGradient={gradient || "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"} postSlug={post.slug}>
            <div dangerouslySetInnerHTML={{ __html: post.source }} />
          </BlogContent>
        </div>
      </div>
    </div>
  );
}
