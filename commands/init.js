const fs = require("fs").promises;
const path = require("path");

async function initRepo() {
    console.log("Init Command called");
    const repoPath = path.resolve(process.cwd(), ".git");

    try {
        await fs.mkdir(repoPath, { recursive: true });
        console.log("Repository intialised");
    } catch (error) {
        console.error("Error initailizing repository", err);
    }
}

module.exports = { initRepo };