import { ConfigValidator } from "./config/env.js";
import { FileSystem } from "./infrastructure/file-system.js";
import { FirebaseService } from "./services/firebase.service.js";
import { MeiliSearchService } from "./services/meilisearch.service.js";
import { MDXProcessor } from "./domain/mdx-processor.js";
import { ProjectPublisher } from "./domain/project-publisher.js";

async function main() {
  console.log("🚀 Starting Codédex Projects Publisher\n");
  console.log("NODE_ENV:", process.env.NODE_ENV ?? "(undefined)");

  try {
    // Validate configuration
    console.log("Validating configuration...");
    const config = ConfigValidator.validate();
    console.log("✓ Configuration valid\n");

    // Initialize services
    console.log("Initializing services...");
    const firebaseService = new FirebaseService(config.firebase);
    const meilisearchService = new MeiliSearchService(config.meilisearch);
    const mdxProcessor = new MDXProcessor();
    const fileSystem = new FileSystem(config.projectsDir);
    console.log("✓ Services initialized\n");

    // Create publisher
    const publisher = new ProjectPublisher(
      firebaseService,
      meilisearchService,
      mdxProcessor,
      fileSystem,
    );

    // Publish all projects
    const result = await publisher.publishAllProjects();

    // Report results
    console.log("\n" + "=".repeat(50));
    console.log("📊 Publishing Results");
    console.log("=".repeat(50));
    console.log(`✓ Successful: ${result.success}`);
    console.log(`✗ Failed: ${result.failed}`);

    if (result.errors.length > 0) {
      console.log("\nErrors:");
      for (const error of result.errors) {
        console.log(`  • ${error.project}: ${error.error}`);
      }
    }

    console.log("=".repeat(50) + "\n");

    // Exit with appropriate code
    process.exit(result.failed > 0 ? 1 : 0);
  } catch (error) {
    console.error("\n❌ Fatal error:", error);
    process.exit(1);
  }
}

main();
