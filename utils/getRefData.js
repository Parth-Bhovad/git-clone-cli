import { promises as fs } from "fs";
import path from "path";

export async function getRefData(repoPath) {
    const remoteRefPath = path.join(repoPath, "refs", "remoteRef.json");
    const ref = await fs.readFile(remoteRefPath);
    const { remoteRef } = JSON.parse(ref);
    const url = new URL(remoteRef);
    let pathSegments = url.pathname.split("/").filter(Boolean);
    return { username: pathSegments[0], reponame: pathSegments[1] };
}