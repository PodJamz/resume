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
  const subtitle = `${summary} | Published ${publishedAt}`;

  return (
    <section id="blog" className="max-w-[800px] mx-auto">
      <PostHeader title={title} subtitle={subtitle} authors={authors || []} />
      <BlogContent heroImageGradient={gradient || "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"} imageCaption={undefined}>
        <div dangerouslySetInnerHTML={{ __html: post.source }} />
      </BlogContent>
      <CommentBox postId={post.slug} />
    </section>
  );
}
