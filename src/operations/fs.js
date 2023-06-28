import { createReadStream, rename, createWriteStream, unlink } from "fs";
import { writeFile } from "fs/promises";
import path, { join, resolve, basename, parse, dirname } from "path";
import { fileURLToPath } from "url";
import { handleError } from "../lib/helpers.js";
import { currentDirectory, getCurrDir } from "./dir.js";
import { rl } from "./readline.js";

export const readFile = (filePath) => {
  const src = resolve(currentDirectory, filePath);

  if (!src.startsWith(currentDirectory)) {
    console.log(`Invalid input: "${filePath}" is not a valid path.`);
    return;
  }

  const stream = createReadStream(src, "utf-8");
  stream.pipe(process.stdout);
  stream
    .on("close", () => {
      stream.destroy();
      console.log("");
      rl.prompt();
    })
    .on("error", (error) => console.error(error));
};

export const createFile = async (fileName) => {
  const filePath = resolve(currentDirectory, fileName);
  const content = "";
  try {
    await writeFile(filePath, content, { flag: "wx" });
  } catch (error) {
    handleError(error);
  }
};

export const renameFile = (filePath, newFileName) => {
  const srcPath = resolve(currentDirectory, filePath);
  const fullNewFilePath = resolve(currentDirectory, newFileName);

  if (
    !srcPath.startsWith(currentDirectory) ||
    !fullNewFilePath.startsWith(currentDirectory)
  ) {
    console.log(
      `Invalid input: "${filePath}" or "${newFileName}" is not a valid path.`
    );
    return;
  }

  rename(srcPath, fullNewFilePath, (err) => {
    if (err) {
      console.log("Operation failed");
      return;
    }

    console.log(`File "${filePath}" renamed to "${newFileName}"\n`);
  });
};

export const copyFile = (filePath, dest) => {
  const { name, ext } = path.parse(filePath);
  const src = path.resolve(currentDirectory, filePath);
  const fullNewDirectory = path.resolve(currentDirectory, dest);

  if (
    !src.startsWith(currentDirectory) ||
    !fullNewDirectory.startsWith(currentDirectory)
  ) {
    console.log(
      `Invalid input: "${filePath}" or "${dest}" is not a valid path.`
    );
    return;
  }

  const targetPath = path.join(fullNewDirectory, name + "_copy" + ext);

  const readStream = createReadStream(src);

  readStream.on("error", (err) => {
    console.log("Operation failed");
    console.error(err.message);
  });

  readStream.on("open", () => {
    const writeStream = createWriteStream(targetPath);

    writeStream.on("error", (err) => {
      console.log("Operation failed");
      console.error(err.message);
    });

    writeStream.on("finish", () => {
      console.log(`Copied to ${targetPath}`);
    });

    readStream.pipe(writeStream);
  });
};

export const moveFile = (filePath, dest) => {
  try {
    const src = path.resolve(currentDirectory, filePath);
    const fullNewDirectory = path.resolve(currentDirectory, dest);

    if (
      !src.startsWith(currentDirectory) ||
      !fullNewDirectory.startsWith(currentDirectory)
    ) {
      console.log(
        `Invalid input: "${filePath}" or "${dest}" is not a valid path.`
      );
      return;
    }

    const targetPath = path.join(fullNewDirectory, path.basename(src));

    const readStream = createReadStream(src);

    readStream.on("error", (err) => {
      console.log("Operation failed");
      console.error(err.message);
    });

    readStream.on("open", () => {
      const writeStream = createWriteStream(targetPath);

      writeStream.on("error", (err) => {
        console.log("Operation failed");
        console.error(err.message);
      });

      writeStream.on("finish", () => {
        unlink(src, (err) => {
          if (err) {
            console.log("Operation failed");
            return;
          }
          console.log(`Moved to directory ${dest}`);
        });
      });

      readStream.pipe(writeStream);
    });
  } catch (error) {
    console.log("Operation failed", error.message);
  }
};

export const deleteFile = (filePath) => {
  const fullPath = resolve(currentDirectory, filePath);

  if (!fullPath.startsWith(currentDirectory)) {
    console.log(`Invalid input: "${filePath}" is not a valid path.`);
    return;
  }

  unlink(fullPath, (err) => {
    if (err) {
      console.log("Operation failed");
      return;
    }

    console.log(`File "${filePath}" deleted successfully\n`);
  });
};
