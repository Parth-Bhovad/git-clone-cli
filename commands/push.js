const axios = require("axios");
const fs = require("fs").promises;
const path = require("path");
const getAllFilePaths = require("../utils/getAllFilePaths");
const { getRefData } = require("../utils/getRefData");

//importing the findGitRoot function to find the root of the git repository
const { findGitRoot } = require("../utils/findGitRoot");

async function pushRepo() {
    const gitRoot = findGitRoot();
    if (!gitRoot) {
        console.log("Not a git repository.");
        process.exit(1);
    }
    const repoPath = path.join(gitRoot, ".git");
    const commitDir = path.join(repoPath, "commitDir");
    const commitPaths = path.join(commitDir, "commits");
    const commitJsonPath = path.join(commitDir, "commitsJson");

    const { username, reponame } = await getRefData(repoPath);

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
    // Send POST request to backend
    try {
        let urlEndpoint = process.env.NODE_ENV === "production" ? "https://github-server-4yd9.onrender.com" : "http://localhost:3000"

        let res = await axios.post(`${urlEndpoint}/repo/push`, {
            username: username,
            reponame: reponame,
            files: filesToUpload,
            commits: commitObjects
        });
        if (res.status == 200) {
            await fs.rm(commitDir, { recursive: true, force: true });
        }
        console.log("Push completed!");
    } catch (error) {
        console.error("Push failed:", error.message);
    }
}

module.exports = { pushRepo };