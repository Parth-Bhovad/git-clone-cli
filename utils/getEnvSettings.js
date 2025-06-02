import fs from "fs";
import path from "path";

export default function getEnvSetting(gitRoot) {
  const configPath = path.join(gitRoot, "gix.config.json");
  if (fs.existsSync(configPath)) {
    const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
    return config.env || "development";
  }
  return "development";
}