import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ignoredDirs = new Set([".git", ".next", "node_modules"]);
const conflictPattern = /^(<<<<<<<|=======|>>>>>>>) /m;
const offenders = [];

function walk(directory) {
  for (const entry of readdirSync(directory)) {
    if (ignoredDirs.has(entry)) continue;
    const fullPath = join(directory, entry);
    const stats = statSync(fullPath);
    if (stats.isDirectory()) {
      walk(fullPath);
      continue;
    }
    if (!stats.isFile()) continue;
    const content = readFileSync(fullPath, "utf8");
    if (conflictPattern.test(content)) offenders.push(fullPath);
  }
}

const unmerged = execFileSync("git", ["ls-files", "-u"], {
  encoding: "utf8",
}).trim();

walk(process.cwd());

if (unmerged || offenders.length > 0) {
  if (unmerged) {
    console.error("Unmerged git index entries detected:");
    console.error(unmerged);
  }
  if (offenders.length > 0) {
    console.error("Conflict markers detected in files:");
    for (const file of offenders) console.error(`- ${file}`);
  }
  process.exit(1);
}

console.log("No git unmerged entries or conflict markers found.");
