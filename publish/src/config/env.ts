import type {
  AppConfig,
  FirebaseConfig,
  MeiliSearchConfig,
} from "../types/index.js";
import path from "path";

export class ConfigValidator {
  static validate(): AppConfig {
    const firebase = this.validateFirebaseConfig();
    const meilisearch = this.validateMeiliSearchConfig();
    const projectsDir = this.getProjectsDir();

    return {
      firebase,
      meilisearch,
      projectsDir,
    };
  }

  private static validateFirebaseConfig(): FirebaseConfig {
    const required = [
      "client_id",
      "private_key",
      "client_email",
      "private_key_id",
      "client_cert_url",
    ];

    for (const key of required) {
      if (!process.env[key]) {
        throw new Error(`Missing required environment variable: ${key}`);
      }
    }

    return {
      type: "service_account",
      projectId: "codedex-io",
      privateKeyId: process.env.PRIVATE_KEY_ID!,
      privateKey: process.env.PRIVATE_KEY!,
      clientEmail: process.env.CLIENT_EMAIL!,
      clientId: process.env.CLIENT_ID!,
      authUri: "https://accounts.google.com/o/oauth2/auth",
      tokenUri: "https://oauth2.googleapis.com/token",
      authProviderCertUrl: "https://www.googleapis.com/oauth2/v1/certs",
      clientCertUrl: process.env.CLIENT_CERT_URL!,
    };
  }

  private static validateMeiliSearchConfig(): MeiliSearchConfig {
    const required = ["MEILISEARCH_HOST", "MEILISEARCH_API_KEY"];

    for (const key of required) {
      if (!process.env[key]) {
        throw new Error(`Missing required environment variable: ${key}`);
      }
    }

    return {
      host: process.env.MEILISEARCH_HOST!,
      apiKey: process.env.MEILISEARCH_API_KEY!,
    };
  }

  private static getProjectsDir(): string {
    // Assumes script runs from publish/ directory, projects are in ../projects
    return path.resolve(process.cwd(), "..", "projects");
  }
}
