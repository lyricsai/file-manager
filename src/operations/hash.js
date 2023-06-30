import { createHash } from "crypto";
import { createReadStream } from "fs";
import { resolve } from "path";
import { currentDirectory } from "./dir.js";
import { handleError } from "../lib/helpers.js";
import { rl } from "./readline.js";

export const calculateHash = (filePath) => {
  const fullPath = resolve(currentDirectory, filePath);

  if (!fullPath.startsWith(currentDirectory)) {
    console.log(`Invalid input: "${filePath}" is not a valid path.`);
    return;
  }

  const hash = createHash("sha256").setEncoding("hex");
  const stream = createReadStream(fullPath).on("error", handleError);

  async function hashing() {
    return new Promise((resolve) => {
      stream
        .pipe(hash)
        .on("data", (data) => {
          resolve(hash.update(data));
        })
        .on("end", () => {
          console.log(`Hash for file "${filePath}": ${hash.digest("hex")}`);
        })
        .on("error", handleError)
        .on("close", () => {
          stream.destroy();
          rl.prompt();
        });
    });
  }

  hashing().catch(console.error);
};
