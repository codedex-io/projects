import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import type { Timestamp } from "firebase-admin/firestore";

export interface ProjectFrontmatter {
  title: string;
  description: string;
  author: string;
  published: "live" | "beta" | undefined;
  tags?: string[];
  [key: string]: unknown;
}

export interface ProjectDocument extends ProjectFrontmatter {
  link: string;
  content: string;
  source: MDXRemoteSerializeResult;
  likes: number;
  dateUpdated: Timestamp;
}

export interface ProjectReactions {
  likes: number;
  shares: number;
  bookmarks: number;
}

export interface SearchDocument {
  id: string;
  title: string;
  description: string;
  content: string;
  author: string;
  tags: string[];
}

export interface PublishResult {
  success: number;
  failed: number;
  errors: Array<{ project: string; error: string }>;
}
