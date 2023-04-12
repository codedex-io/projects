import firebaseAdmin from "firebase-admin";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
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

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert({
    type: "service_account",
    project_id: "codedex-io",
    private_key_id: process.env.private_key_id,
    private_key: process.env.private_key,
    client_email: process.env.client_email,
    client_id: process.env.client_id,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: process.env.client_cert_url,
  }),
});

const firestore = firebaseAdmin.firestore();

function getProjectFolderNames() {
  return fs.readdirSync(path.resolve(process.cwd(), "projects"));
}

function getProjectMdxFile(projectFolderName) {
  const files = fs.readdirSync(
    path.resolve(process.cwd(), "projects", projectFolderName)
  );

  for (let file of files) {
    if (file.endsWith(".mdx")) {
      return file;
    }
  }
  return null;
}

main();

async function main() {
  const projectFolders = getProjectFolderNames();

  for (let projectFolderName of projectFolders) {
    const projectMdxFile = getProjectMdxFile(projectFolderName);
    if (!projectMdxFile) {
      continue;
    }

    const fileNameWithoutExtension = projectMdxFile.split(".")[0];
    const projectExists = (
      await firestore.collection("projects").doc(fileNameWithoutExtension).get()
    ).exists;

    const projectContent = fs.readFileSync(
      path.resolve(
        process.cwd(),
        "projects",
        projectFolderName,
        projectMdxFile
      ),
      "utf-8"
    );

    const projectMatter = matter(projectContent);

    const source = await serialize(projectMatter.content, {
      mdxOptions: {
        remarkPlugins: [
          remarkMath,
          remarkPresetLintRecommended,
          remarkBreaks,
          remarkGfm,
          remarkPresetLintConsistent,
        ],
        rehypePlugins: [
          rehypeSlug,
          rehypeHighlight,
          [
            rehypeExternalLinks,
            { target: "_blank", rel: ["nofollow", "noreferrer", "noopener"] },
          ],
          rehypeKatex,
          [
            rehypeRewrite,
            {
              rewrite(node) {
                if (
                  node.tagName === "h2" ||
                  node.tagName === "h3" ||
                  node.tagName === "h4"
                ) {
                  node.children[0].value = " " + node.children[0].value;
                }
              },
            },
          ],
          [
            rehypeAutoLinkHeadings,
            {
              behavior: "prepend",
              content(node) {
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
        ],
      },
    });

    if (!projectExists) {
      await firestore
        .collection("projects")
        .doc(fileNameWithoutExtension)
        .set(
          {
            source,
            content: projectMatter.content,
            ...projectMatter.data,
            dateUpdated: firebaseAdmin.firestore.Timestamp.now(),
            likes: 0,
            link: fileNameWithoutExtension,
          },
          { merge: true }
        );
    } else {
      await firestore
        .collection("projects")
        .doc(fileNameWithoutExtension)
        .set(
          {
            source,
            content: projectMatter.content,
            ...projectMatter.data,
            dateUpdated: firebaseAdmin.firestore.Timestamp.now(),
            link: fileNameWithoutExtension,
          },
          { merge: true }
        );
    }
  }
}
