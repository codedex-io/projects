import firebaseAdmin from "firebase-admin";
import type { Firestore, Timestamp } from "firebase-admin/firestore";
import type {
  FirebaseConfig,
  ProjectDocument,
  ProjectReactions,
} from "../types/index.js";

export class FirebaseService {
  private firestore: Firestore;

  constructor(config: FirebaseConfig) {
    try {
      firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(config as any),
      });
      this.firestore = firebaseAdmin.firestore();
    } catch (error) {
      throw new Error(`Failed to initialize Firebase: ${error}`);
    }
  }

  async projectExists(projectId: string): Promise<boolean> {
    try {
      const doc = await this.firestore
        .collection("projects")
        .doc(projectId)
        .get();
      return doc.exists;
    } catch (error) {
      throw new Error(
        `Failed to check if project exists (${projectId}): ${error}`,
      );
    }
  }

  async projectReactionsExists(projectId: string): Promise<boolean> {
    try {
      const doc = await this.firestore
        .collection("projectReactions")
        .doc(projectId)
        .get();
      return doc.exists;
    } catch (error) {
      throw new Error(
        `Failed to check if project reactions exist (${projectId}): ${error}`,
      );
    }
  }

  async createProject(
    projectId: string,
    data: Omit<ProjectDocument, "dateUpdated" | "likes">,
  ): Promise<void> {
    try {
      await this.firestore
        .collection("projects")
        .doc(projectId)
        .set(
          {
            ...data,
            dateUpdated: firebaseAdmin.firestore.Timestamp.now(),
            likes: 0,
          },
          { merge: true },
        );
    } catch (error) {
      throw new Error(`Failed to create project (${projectId}): ${error}`);
    }
  }

  async updateProject(
    projectId: string,
    data: Omit<ProjectDocument, "dateUpdated" | "likes">,
  ): Promise<void> {
    try {
      await this.firestore
        .collection("projects")
        .doc(projectId)
        .set(
          {
            ...data,
            dateUpdated: firebaseAdmin.firestore.Timestamp.now(),
          },
          { merge: true },
        );
    } catch (error) {
      throw new Error(`Failed to update project (${projectId}): ${error}`);
    }
  }

  async createProjectReactions(projectId: string): Promise<void> {
    try {
      const reactions: ProjectReactions = {
        likes: 0,
        shares: 0,
        bookmarks: 0,
      };

      await this.firestore
        .collection("projectReactions")
        .doc(projectId)
        .set(reactions);
    } catch (error) {
      throw new Error(
        `Failed to create project reactions (${projectId}): ${error}`,
      );
    }
  }
}
