import { promises as fs } from "fs";
import path from "path";
import chalk from "chalk";

export async function initRepo() {
    console.log(chalk.cyan("🚀 Init command called."));

    const repoPath = path.resolve(process.cwd(), ".git");

    try {
        await fs.mkdir(repoPath, { recursive: true });
        console.log(chalk.green.bold("✔ Repository initialized successfully at ./.git"));
    } catch (err) {
        console.error(chalk.red.bold("✖ Error initializing repository:"), chalk.red(err.message));
    }
}