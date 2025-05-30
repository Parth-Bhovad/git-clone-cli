const fs = require("fs").promises;
const path = require("path");

async function getRefData(repoPath) {
    const remoteRefPath = path.join(repoPath, "refs", "remoteRef.json");
    const ref = await fs.readFile(remoteRefPath);
    const { remoteRef } = JSON.parse(ref);
    const url = new URL(remoteRef);
    let pathSegments = url.pathname.split("/").filter(Boolean);
    return { username: pathSegments[0], reponame: pathSegments[1] };
}

module.exports = { getRefData };