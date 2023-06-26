import {
  readdir,
  statSync,
  access,
  createReadStream,
  writeFile,
  rename,
  createWriteStream,
  unlink,
  mkdir,
} from "fs";
import path, { join, resolve, basename, parse, dirname } from "path";
import { fileURLToPath } from "url";
import { handleError } from "../lib/helpers.js";

export let currentDirectory = process.cwd();
export const getCurrDir = () => {
  return dirname(fileURLToPath(import.meta.url));
};

export const printWorkingDirectory = () => {
  console.log(`You are currently in ${currentDirectory}\n`);
};

export const listFilesAndFolders = () => {
  try {
    readdir(currentDirectory, (err, files) => {
      if (err) {
        handleError(err);
      }

      files.sort();
      const items = [];

      files.forEach((file) => {
        const fullPath = join(currentDirectory, file);
        const stat = statSync(fullPath);
        const type = stat.isDirectory() ? "Directory" : "File";

        items.push({ Name: file, Type: type });
      });

      console.table(items);
      console.log();
    });
  } catch (error) {
    handleError(error);
  }
};

export const navigateToDirectory = (directory) => {
  const targetDirectory = resolve(currentDirectory, directory);

  if (!targetDirectory.startsWith(process.cwd())) {
    console.log(`Invalid input: "${directory}" is not a valid path.`);
    return;
  }

  access(targetDirectory, (err) => {
    if (err) {
      console.log("Operation failed");
      return;
    }

    currentDirectory = targetDirectory;
    printWorkingDirectory();
  });
};

export const navigateToParentDirectory = (directory) => {
  const targetDirectory = dirname(directory);
  if (targetDirectory === currentDirectory) {
    console.log("You are already in the root directory");
    return;
  }
  currentDirectory = targetDirectory;
  printWorkingDirectory();
};

export const createDirectory = (directory) => {
  const directoryPath = path.join(currentDirectory, directory);
  mkdir(directoryPath, (error) => {
    if (error) {
      console.log("Operation failed");
    } else {
      console.log(`Successfully created directory: ${directory}`);
    }
    printWorkingDirectory();
  });
};
