import fs from "fs/promises";
import path from "path";
import axios from "axios";
import chalk from "chalk";
import { getRefData } from "../utils/getRefData.js";
import { findGitRoot } from "../utils/findGitRoot.js";
import getEnvSetting from "../utils/getEnvSettings.js";

async function pullRepo() {
    console.log(chalk.cyan("📥 Pull command called"));

    const gitRoot = findGitRoot();
    if (!gitRoot) {
        console.log(chalk.red.bold("✖ Not a git repository. Please initialize one with `gix init`."));
        process.exit(1);
    }

    const envSetting = getEnvSetting(gitRoot);

    const repoPath = path.join(gitRoot, ".git");

    const { username, reponame } = await getRefData(repoPath);

    try {
        let urlEndpoint = envSetting === "development"
            ? "http://localhost:3000"
            : "https://github-server-4yd9.onrender.com";

        console.log(chalk.yellow(`🔗 Fetching repository data from ${urlEndpoint}/repo/pull/${reponame}`));

        const response = await axios.get(`${urlEndpoint}/repo/pull/${reponame}`);
        console.log(chalk.green("✔ Repository data fetched successfully!"));

        const { files } = response.data;

        const basePath = path.join(username, reponame);

        for (const file of files) {
            const relativePath = path.relative(basePath, file.path);
            await fs.mkdir(path.dirname(relativePath), { recursive: true });
            await fs.writeFile(relativePath, file.content, "utf-8");
        }

        console.log(chalk.green.bold("✅ Repository files pulled successfully into your project."));
    } catch (error) {
        console.error(chalk.red.bold("✖ Error pulling repository:"), chalk.red(error.message));
        process.exit(1);
    }
}

export { pullRepo };