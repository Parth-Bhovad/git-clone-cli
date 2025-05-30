import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import getAllFilePaths from "../utils/getAllFilePaths.js";
import { findGitRoot } from "../utils/findGitRoot.js";
import chalk from "chalk";

export async function commitRepo(message) {
    const gitRoot = findGitRoot();
    if (!gitRoot) {
        console.log(chalk.red.bold("✖ Not a git repository. Please initialize one with `gix init`."));
        process.exit(1);
    }

    const repoPath = path.join(gitRoot, ".git");
    const stagedPath = path.join(repoPath, "staging");
    const commitDir = path.join(repoPath, "commitDir");

    try {
        let results = await getAllFilePaths(stagedPath);
        if (results.length === 0) {
            console.log(chalk.yellow("⚠ No files staged to commit."));
            return;
        }

        const commitId = uuidv4();
        const commitJson = path.join(commitDir, "commitsJson");
        const relativePaths = results.map((result) => path.relative(stagedPath, result));

        console.log(chalk.cyan(`📦 Committing ${results.length} file(s)...`));

        for (const result of results) {
            let ans = result.replace(/\\staging\\/g, "\\commitDir\\commits\\");
            let dirName = path.dirname(ans);
            await fs.mkdir(dirName, { recursive: true });
            await fs.copyFile(result, ans);
        }

        await fs.mkdir(commitJson, { recursive: true });
        await fs.writeFile(
            path.join(commitJson, `${commitId}.json`),
            JSON.stringify({
                msg: message,
                date: new Date().toISOString(),
                filePaths: relativePaths,
                _id: commitId,
            })
        );

        console.log(chalk.green.bold(`✔ Commit ${commitId} created with message:`), chalk.green(`"${message}".`));

        await fs.rm(stagedPath, { recursive: true, force: true });
        console.log(chalk.blue("🧹 Staging area cleared. Ready for new changes."));
        
    } catch (error) {
        console.error(chalk.red.bold("✖ Error while committing files:"), chalk.red(error.message));
    }
}