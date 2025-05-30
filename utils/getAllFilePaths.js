import { promises as fs } from "fs";
import path from "path";

const getAllFilePaths = async (filePath) => {
    let filePaths = [];
    let items = await fs.readdir(filePath);

    for (const item of items) {
        const fullPath = path.join(filePath, item);
        const stats = await fs.stat(fullPath);

        if (stats.isDirectory()) {
            let nestedPaths = await getAllFilePaths(fullPath);
            filePaths = filePaths.concat(nestedPaths);
        } else {
            filePaths.push(fullPath);
        }
    }
    return filePaths;
};

export default getAllFilePaths;