import { getVaultPost } from "@/data/vault";
import { notFound } from "next/navigation";
import { PostHeader } from "@/components/blog/PostHeader";
import { BlogContent } from "@/components/blog/BlogContent";
import Link from "next/link";

export default async function VaultPost({ params }: { params: { slug: string } }) {
  const post = await getVaultPost(params.slug).catch(() => null);
  if (!post) notFound();
  const { title, publishedAt, summary, gradient, authors } = post.metadata;

  return (
    <div className="min-h-screen">
      <div className="animate-in fade-in duration-700 slide-in-from-bottom-4">
        <div className="py-8 lg:py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-0 mb-4">
            <Link href="/vault" className="group inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/60">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4.5 w-4.5 -ml-0.5 transition-transform group-hover:-translate-x-0.5"><path d="M15 18l-6-6 6-6"/></svg>
              <span>Back</span>
            </Link>
          </div>
          <PostHeader title={title} summary={summary} publishedAt={publishedAt} authors={authors || []} />
          <BlogContent heroImageGradient={gradient || "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"} postSlug={post.slug}>
            <div dangerouslySetInnerHTML={{ __html: post.source }} />
          </BlogContent>
        </div>
      </div>
    </div>
  );
}
