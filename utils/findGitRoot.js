import fs from "fs";
import path from "path";

export function findGitRoot(startPath = process.cwd()) {
    let currentPath = startPath;

    while (currentPath !== path.parse(currentPath).root) {
        if (fs.existsSync(path.join(currentPath, ".git"))) {
            return currentPath;
        }
        currentPath = path.dirname(currentPath);
    }
    return null;
}