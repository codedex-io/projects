import fs from "fs";
import path from "path";

export class FileSystem {
  constructor(private projectsDir: string) {
    if (!fs.existsSync(projectsDir)) {
      throw new Error(`Projects directory does not exist: ${projectsDir}`);
    }
  }

  getProjectFolders(): string[] {
    try {
      const entries = fs.readdirSync(this.projectsDir, { withFileTypes: true });
      return entries
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name);
    } catch (error) {
      throw new Error(`Failed to read projects directory: ${error}`);
    }
  }

  findMdxFile(projectFolder: string): string | null {
    const projectPath = path.join(this.projectsDir, projectFolder);

    if (!fs.existsSync(projectPath)) {
      return null;
    }

    try {
      const files = fs.readdirSync(projectPath);
      const mdxFile = files.find((file) => file.endsWith(".mdx"));
      return mdxFile || null;
    } catch (error) {
      console.error(`Error reading project folder ${projectFolder}:`, error);
      return null;
    }
  }

  readMdxFile(projectFolder: string, fileName: string): string {
    const filePath = path.join(this.projectsDir, projectFolder, fileName);

    if (!fs.existsSync(filePath)) {
      throw new Error(`MDX file does not exist: ${filePath}`);
    }

    try {
      return fs.readFileSync(filePath, "utf-8");
    } catch (error) {
      throw new Error(`Failed to read MDX file ${filePath}: ${error}`);
    }
  }
}
