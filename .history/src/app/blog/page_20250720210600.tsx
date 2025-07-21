import { getBlogPosts } from "@/data/blog";
import { PostHeader } from "@/components/blog/PostHeader";
import { BlogContent } from "@/components/blog/BlogContent";

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
  const subtitle = `${summary} | Edited 20 hours ago`;

  return (
    <section className="max-w-[800px] mx-auto">
      <PostHeader title={title} subtitle={subtitle} authors={authors || []} />
      
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Body</h2>
          <svg width="16" height="16" fill="none" viewBox="0 0 16 16" className="text-zinc-400">
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        
        <div className="prose dark:prose-invert max-w-none mb-8">
          <p>Conduct thorough market research to understand customer pain points, emerging trends, and unmet needs. By gaining insights into the problems users face, the team can brainstorm solutions that address these challenges effectively. This customer-centric approach ensures that the generated ideas have genuine market potential.</p>
        </div>
        
        <BlogContent 
          heroImageGradient={gradient || "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)"}
          imageCaption="Encourage open discussions and idea-sharing."
        >
          <div />
        </BlogContent>
        
        <div className="prose dark:prose-invert max-w-none mt-8">
          <p>Foster a diverse team with members from different backgrounds, expertise, and perspectives. Diversity stimulates creativity by bringing together varied viewpoints and approaches to problem-solving. Encourage open discussions and idea-sharing sessions where team members can draw inspiration from each other's experiences.</p>
          
          <h3 className="text-xl font-semibold mt-8 mb-4">Embrace Design Thinking</h3>
          <p>Adopt a design thinking approach to ideation, which emphasizes empathy, iteration, and user-centricity. Start by empathizing with users to understand their needs, define the problem statement, ideate potential solutions, prototype and test them iteratively, and finally, implement the best ideas. This human-centered approach ensures that the products developed resonate with users.</p>
        </div>
      </div>
    </section>
  );
}
