import fs from "fs/promises";
import path from "path";
import { findGitRoot } from "../utils/findGitRoot.js";
import chalk from "chalk";

export async function addRepo(filePath) {
    const gitRoot = findGitRoot();
    if (!gitRoot) {
        console.log(chalk.red.bold("✖ Not a git repository. Please initialize one with `gix init`."));
        process.exit(1);
    }
    const repoPath = path.join(gitRoot, ".git");
    const stagingPath = path.join(repoPath, "staging");

    try {
        await fs.mkdir(stagingPath, { recursive: true });
        const relativePath = path.relative(gitRoot, filePath);

        if (!relativePath || relativePath.startsWith('..')) {
            console.log(chalk.yellow("⚠️  File is outside the git repository. Please add files inside your repo."));
            return;
        }

        const dirName = path.dirname(relativePath);
        await fs.mkdir(path.join(stagingPath, dirName), { recursive: true });
        await fs.copyFile(filePath, path.join(stagingPath, relativePath));

        console.log(chalk.green(`✔ Added ${chalk.cyan(relativePath)} to the staging area.`));
    } catch (error) {
        console.log(chalk.red("❌ Error during adding the file:"), chalk.red.bold(error.message));
    }
}