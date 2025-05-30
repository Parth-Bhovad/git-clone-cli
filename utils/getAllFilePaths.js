const fs = require("fs").promises
const path = require("path");
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
}
module.exports = getAllFilePaths;