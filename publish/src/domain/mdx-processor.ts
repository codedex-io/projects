import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkPresetLintConsistent from "remark-preset-lint-consistent";
import remarkPresetLintRecommended from "remark-preset-lint-recommended";
import rehypeExternalLinks from "rehype-external-links";
import remarkBreaks from "remark-breaks";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeAutoLinkHeadings from "rehype-autolink-headings";
import rehypeRewrite from "rehype-rewrite";
import { h } from "hastscript";
import type { ProjectFrontmatter } from "../types/index.js";

interface ProcessedMDX {
  frontmatter: ProjectFrontmatter;
  source: MDXRemoteSerializeResult;
  rawContent: string;
}

export class MDXProcessor {
  private readonly remarkPlugins = [
    remarkMath,
    remarkPresetLintRecommended,
    remarkBreaks,
    remarkGfm,
    remarkPresetLintConsistent,
  ];

  private readonly rehypePlugins = [
    rehypeSlug,
    [rehypeHighlight, { aliases: { markdown: ["output", "terminal"] } }],
    [
      rehypeExternalLinks,
      { target: "_blank", rel: ["nofollow", "noreferrer", "noopener"] },
    ],
    rehypeKatex,
    [
      rehypeRewrite,
      {
        rewrite(node: any) {
          if (
            node.tagName === "h2" ||
            node.tagName === "h3" ||
            node.tagName === "h4"
          ) {
            if (node.children[0]) {
              node.children[0].value = " " + node.children[0].value;
            }
          }
        },
      },
    ],
    [
      rehypeAutoLinkHeadings,
      {
        behavior: "prepend",
        content(node: any) {
          const { tagName } = node;
          if (tagName === "h1") {
            return h("span", "");
          } else if (tagName === "h2") {
            return h("span", "#");
          } else if (tagName === "h3") {
            return h("span", "##");
          } else if (tagName === "h4") {
            return h("span", "###");
          } else if (tagName === "h5") {
            return h("span", "");
          } else if (tagName === "h6") {
            return h("span", "");
          }
        },
      },
    ],
  ];

  async process(content: string): Promise<ProcessedMDX> {
    try {
      const { data, content: rawContent } = matter(content);

      const source = await serialize(rawContent, {
        mdxOptions: {
          remarkPlugins: this.remarkPlugins as any,
          rehypePlugins: this.rehypePlugins as any,
        },
      });

      return {
        frontmatter: data as ProjectFrontmatter,
        source,
        rawContent,
      };
    } catch (error) {
      throw new Error(`Failed to process MDX: ${error}`);
    }
  }
}
