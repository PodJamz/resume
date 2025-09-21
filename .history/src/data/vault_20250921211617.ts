import fs from "fs";
import matter from "gray-matter";
import path from "path";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

type Author = {
  name: string;
  role: string;
  gradientClass: string;
};

type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  gradient?: string;
  authors?: Author[];
  bookmarked?: boolean;
};

function getMDXFiles(dir: string) {
  return fs.existsSync(dir)
    ? fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx")
    : [];
}

export async function markdownToHTML(markdown: string) {
  const p = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      theme: { light: "min-light", dark: "min-dark" },
      keepBackground: false,
    })
    .use(rehypeStringify)
    .process(markdown);
  return p.toString();
}

export async function getVaultPost(slug: string) {
  const filePath = path.join("content", "vault", `${slug}.mdx`);
  let source = fs.readFileSync(filePath, "utf-8");
  const { content: rawContent, data: metadata } = matter(source);
  const content = await markdownToHTML(rawContent);
  return { source: content, metadata: metadata as Metadata, slug };
}

async function getAllVaultPosts(dir: string) {
  let mdxFiles = getMDXFiles(dir);
  return Promise.all(
    mdxFiles.map(async (file) => {
      let slug = path.basename(file, path.extname(file));
      let { metadata, source } = await getVaultPost(slug);
      return { metadata, slug, source };
    })
  );
}

export async function getVaultPosts() {
  return getAllVaultPosts(path.join(process.cwd(), "content", "vault"));
}
