import { getBlogPosts } from "@/data/blog";
import { PostHeader } from "@/components/blog/PostHeader";
import { BlogContent } from "@/components/blog/BlogContent";
import { CommentBox } from "@/components/blog/CommentBox";

export const metadata = {
  title: "Blog",
  description: "My thoughts on software development, life, and more.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const latestPost = posts.sort((a, b) => {
    if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
      return -1;
    }
    return 1;
  })[0];

  if (!latestPost) {
    return (
      <section className="max-w-[800px] mx-auto">
        <h1 className="text-3xl font-bold mb-8">No posts found</h1>
      </section>
    );
  }

  const { title, publishedAt, summary, gradient, authors } = latestPost.metadata;

  return (
    <div className="min-h-screen">
      {/* Content wrapper with subtle animation */}
      <div className="animate-in fade-in duration-700 slide-in-from-bottom-4">
        <div className="py-8 lg:py-12">
          <PostHeader 
            title={title} 
            summary={summary} 
            publishedAt={publishedAt} 
            authors={authors || []} 
          />
          
          <BlogContent 
            heroImageGradient={gradient || "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"} 
            imageCaption={undefined}
            postSlug={latestPost.slug}
          >
            <div dangerouslySetInnerHTML={{ __html: latestPost.source }} />
          </BlogContent>
          
          <div className="max-w-4xl mx-auto mt-12 sm:mt-16 lg:mt-20">
            <CommentBox postId={latestPost.slug} />
          </div>
        </div>
      </div>
    </div>
  );
}
