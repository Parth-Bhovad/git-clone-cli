const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const getAllFilePaths = require("../utils/getAllFilePaths");

//imorting the findGitRoot function to find the root of the git repository
const { findGitRoot } = require("../utils/findGitRoot");

async function commitRepo(message) {
    const gitRoot = findGitRoot();
    if (!gitRoot) {
        console.log("Not a git repository.");
        process.exit(1);
    }
    const repoPath = path.join(gitRoot, ".git");
    const stagedPath = path.join(repoPath, "staging");
    const commitDir = path.join(repoPath, "commitDir");

    try {
        let results = await getAllFilePaths(stagedPath);
        const commitId = uuidv4();
        const commitJson = path.join(commitDir, "commitsJson");
        const relativePaths = results.map((result) => path.relative(stagedPath, result));
        for (const result of results) {
            let ans = result.replace(/\\staging\\/g, "\\commitDir\\commits\\");
            let dirName = path.dirname(ans);
            await fs.mkdir(dirName, { recursive: true });
            await fs.copyFile(
                result,
                ans,
            );
        }
        await fs.mkdir(commitJson, { recursive: true });
        await fs.writeFile(path.join(commitJson, `${commitId}.json`), JSON.stringify({ msg: message, date: new Date().toISOString(), filePaths: relativePaths, _id: commitId }));
        console.log(`Commit ${commitId} created with message : ${message}.`);
        await fs.rm(stagedPath, { recursive: true, force: true });
    } catch (error) {
        console.error("error in committing files:", error);
    }
}

module.exports = {
    commitRepo
};