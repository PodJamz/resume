import { getPost } from "@/data/blog";
import { PostHeader } from "@/components/blog/PostHeader";
import { BlogContent } from "@/components/blog/BlogContent";
import { CommentBox } from "@/components/blog/CommentBox";
import { notFound } from "next/navigation";

export default async function Blog({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  let post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  const { title, publishedAt, summary, gradient, authors } = post.metadata;

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
            postSlug={post.slug}
          >
            <div dangerouslySetInnerHTML={{ __html: post.source }} />
          </BlogContent>
          
          <div className="max-w-4xl mx-auto mt-12 sm:mt-16 lg:mt-20">
            <CommentBox postId={post.slug} />
          </div>
        </div>
      </div>
    </div>
  );
}
