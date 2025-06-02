import axios from "axios";
import fs from "fs/promises";
import path from "path";
import chalk from "chalk";
import getAllFilePaths from "../utils/getAllFilePaths.js";
import { getRefData } from "../utils/getRefData.js";
import { findGitRoot } from "../utils/findGitRoot.js";
import getEnvSetting from "../utils/getEnvSettings.js";

async function pushRepo() {
    console.log(chalk.cyan("🚀 Push command called"));

    const gitRoot = findGitRoot();
    if (!gitRoot) {
        console.log(chalk.red.bold("✖ Not a git repository. Please initialize one with `gix init`."));
        process.exit(1);
    }

    const envSetting = getEnvSetting(gitRoot);

    const repoPath = path.join(gitRoot, ".git");
    const commitDir = path.join(repoPath, "commitDir");
    const commitPaths = path.join(commitDir, "commits");
    const commitJsonPath = path.join(commitDir, "commitsJson");

    const { username, reponame } = await getRefData(repoPath);
    console.log(chalk.yellow(`🔍 Preparing to push ${chalk.bold(reponame)} for user ${chalk.bold(username)}...`));

    let filesToUpload = [];
    let filePaths = await getAllFilePaths(commitPaths);

    for (const file of filePaths) {
        const content = await fs.readFile(file, "utf-8");
        filesToUpload.push({
            path: path.relative(commitPaths, file),
            content
        });
    }

    const commitsJson = await fs.readdir(commitJsonPath);
    let commitObjects = [];

    for (const file of commitsJson) {
        const commit = await fs.readFile(path.join(commitJsonPath, file), "utf-8");
        commitObjects.push(JSON.parse(commit));
    }

    try {
        let urlEndpoint = envSetting === "development"
            ? "http://localhost:3000"
            : "https://github-server-4yd9.onrender.com";

        console.log(chalk.yellow("📡 Uploading files and commits to server..."));

        let res = await axios.post(`${urlEndpoint}/repo/push`, {
            username: username,
            reponame: reponame,
            files: filesToUpload,
            commits: commitObjects
        });

        if (res.status === 200) {
            await fs.rm(commitDir, { recursive: true, force: true });
            console.log(chalk.green.bold("✅ Push completed successfully!"));
        }
    } catch (error) {
        console.error(chalk.red.bold("✖ Push failed:"), chalk.red(error.message));
    }
}

export { pushRepo };