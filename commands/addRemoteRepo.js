import { promises as fs } from "fs";
import path from "path";
import chalk from "chalk";

const addRemoteRepo = async (link) => {
    console.log(chalk.cyan(`➡️  Adding remote repository: ${link}`));

    const refsPath = path.resolve(process.cwd(), ".git", "refs");
    try {
        await fs.mkdir(refsPath, { recursive: true });
        await fs.writeFile(
            path.join(refsPath, "remoteRef.json"),
            JSON.stringify({ remoteRef: link })
        );
        console.log(chalk.green.bold("✔ Remote refs added locally."));
    } catch (error) {
        console.log(chalk.red.bold("✖ Error while adding remote refs:"), chalk.red(error.message));
    }
};

export { addRemoteRepo };