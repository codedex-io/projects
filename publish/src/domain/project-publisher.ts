import type { FirebaseService } from "../services/firebase.service.js";
import type { MeiliSearchService } from "../services/meilisearch.service.js";
import type { MDXProcessor } from "./mdx-processor.js";
import type { FileSystem } from "../infrastructure/file-system.js";
import type { PublishResult, SearchDocument } from "../types/index.js";

export class ProjectPublisher {
  constructor(
    private firebaseService: FirebaseService,
    private meilisearchService: MeiliSearchService,
    private mdxProcessor: MDXProcessor,
    private fileSystem: FileSystem,
  ) {}

  async publishAllProjects(): Promise<PublishResult> {
    const result: PublishResult = {
      success: 0,
      failed: 0,
      errors: [],
    };

    const projectFolders = this.fileSystem.getProjectFolders();
    console.log(`\nFound ${projectFolders.length} project folders\n`);

    for (const projectFolder of projectFolders) {
      try {
        await this.publishProject(projectFolder);
        result.success++;
      } catch (error) {
        result.failed++;
        result.errors.push({
          project: projectFolder,
          error: error instanceof Error ? error.message : String(error),
        });
        console.error(`✗ Failed to publish ${projectFolder}:`, error);
      }
    }

    return result;
  }

  private async publishProject(projectFolder: string): Promise<void> {
    // Find MDX file
    const mdxFileName = this.fileSystem.findMdxFile(projectFolder);
    if (!mdxFileName) {
      console.log(`  ⊘ Skipping ${projectFolder}: no MDX file found`);
      return;
    }

    const projectId = mdxFileName.replace(/\.mdx$/, "");
    console.log(`\nProcessing: ${projectId}`);

    // Ensure project reactions exist
    await this.ensureProjectReactions(projectId);

    // Read and process MDX
    const content = this.fileSystem.readMdxFile(projectFolder, mdxFileName);
    const { frontmatter, source, rawContent } =
      await this.mdxProcessor.process(content);

    // Check if project exists
    const exists = await this.firebaseService.projectExists(projectId);

    // Prepare document data
    const documentData = {
      source,
      content: rawContent,
      link: projectId,
      ...frontmatter,
    };

    // Create or update in Firestore
    if (exists) {
      await this.firebaseService.updateProject(projectId, documentData);
      console.log(`  ✓ Updated in Firestore: ${projectId}`);
    } else {
      await this.firebaseService.createProject(projectId, documentData);
      console.log(`  ✓ Created in Firestore: ${projectId}`);
    }

    // Index in MeiliSearch if published as "live"
    if (frontmatter.published === "live") {
      const searchDoc: SearchDocument = {
        id: projectId,
        title: frontmatter.title,
        description: frontmatter.description,
        content: rawContent,
        author: frontmatter.author,
        tags: frontmatter.tags || [],
      };
      await this.meilisearchService.indexProject(searchDoc);
    }
  }

  private async ensureProjectReactions(projectId: string): Promise<void> {
    const exists = await this.firebaseService.projectReactionsExists(projectId);
    if (!exists) {
      await this.firebaseService.createProjectReactions(projectId);
      console.log(`  ✓ Created reactions document: ${projectId}`);
    }
  }
}
