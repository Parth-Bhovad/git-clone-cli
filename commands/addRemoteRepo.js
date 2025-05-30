const fs = require("fs").promises;
const path = require("path");

const addRemoteRepo = async (link) => {
    console.log(`Adding remote repository: ${link}`);
    
    const refsPath = path.resolve(process.cwd(), ".git", "refs");
    try {
        await fs.mkdir(refsPath, {recursive:true});
        await fs.writeFile(path.join(refsPath, "remoteRef.json"), JSON.stringify({remoteRef:link}));
        console.log("remote refs added locally");
    } catch (error) {
        console.log("error", error);
    }
}

module.exports = {addRemoteRepo};