const fs = require("fs").promises;
const path = require("path");
const axios = require("axios");
const { getRefData } = require("../utils/getRefData");

//importing the findGitRoot function to find the root of the git repository
const { findGitRoot } = require("../utils/findGitRoot");

async function pullRepo() {
    console.log("pull function called");
    const gitRoot = findGitRoot();
    if (!gitRoot) {
        console.log("Not a git repository.");
        process.exit(1);
    }
    const repoPath = path.join(gitRoot, ".git");

    const { username, reponame } = await getRefData(repoPath);

    try {

        let urlEndpoint = process.env.NODE_ENV === "production" ? "https://github-server-4yd9.onrender.com" : "http://localhost:3000";

        const response = await axios.get(`${urlEndpoint}/repo/pull/${reponame}`);
        console.log("Pull response:", response.data);
        const { files } = response.data;

        const basePath = path.join(username, reponame);

        for (const file of files) {
            const relativePath = path.relative(basePath, file.path);
            await fs.mkdir(path.dirname(relativePath), { recursive: true });
            await fs.writeFile(relativePath, file.content, 'utf-8');
        }
    } catch (error) {
        console.error("Error pulling repository:", error);
        process.exit(1);
    }
}

module.exports = {
    pullRepo
};