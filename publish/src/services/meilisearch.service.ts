import { MeiliSearch } from "meilisearch";
import type { MeiliSearchConfig, SearchDocument } from "../types/index.js";

export class MeiliSearchService {
  private client: MeiliSearch;
  private readonly indexName = "projects";

  constructor(config: MeiliSearchConfig) {
    try {
      this.client = new MeiliSearch({
        host: config.host,
        apiKey: config.apiKey,
      });
    } catch (error) {
      throw new Error(`Failed to initialize MeiliSearch: ${error}`);
    }
  }

  async indexProject(document: SearchDocument): Promise<void> {
    try {
      await this.client.index(this.indexName).addDocuments([document]);
      console.log(`  ✓ Indexed in MeiliSearch: ${document.id}`);
    } catch (error) {
      // Non-fatal: log error but don't throw
      console.error(
        `  ✗ Failed to index in MeiliSearch (${document.id}):`,
        error,
      );
    }
  }

  async removeProject(projectId: string): Promise<void> {
    try {
      await this.client.index(this.indexName).deleteDocument(projectId);
      console.log(`  ✓ Removed from MeiliSearch: ${projectId}`);
    } catch (error) {
      // Non-fatal: log error but don't throw
      console.error(
        `  ✗ Failed to remove from MeiliSearch (${projectId}):`,
        error,
      );
    }
  }
}
