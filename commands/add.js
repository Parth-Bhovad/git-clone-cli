const fs = require("fs").promises;
const path = require("path");

//imorting the findGitRoot function to find the root of the git repository
const { findGitRoot } = require("../utils/findGitRoot");

async function addRepo(filePath) {
    const gitRoot = findGitRoot();
    if (!gitRoot) {
        console.log("Not a git repository.");
        process.exit(1);
    }
    const repoPath = path.join(gitRoot, ".git");
    const stagingPath = path.join(repoPath, "staging");

    try {
        await fs.mkdir(stagingPath, { recursive: true });
        const relativePath = path.relative(gitRoot, filePath);
        if (!relativePath) {
            console.log("File is not in the git repository.");
            return;
        }
        const dirName = path.dirname(relativePath);
        await fs.mkdir(path.join(stagingPath, dirName), { recursive: true });
        await fs.copyFile(filePath, path.join(stagingPath, relativePath));
        console.log(`Added ${relativePath} to the staging area.`);
    } catch (error) {
        console.log("error during adding the files", error);
    }
}

module.exports = { addRepo };