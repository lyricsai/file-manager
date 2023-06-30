import { readdir, statSync, access, mkdir } from "fs";
import path, { join, resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { handleError } from "../lib/helpers.js";
import { homedir } from "os";

export let currentDirectory = homedir();
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
  console.log(currentDirectory, directory, targetDirectory);
  if (!targetDirectory.startsWith(currentDirectory)) {
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
  if (currentDirectory === homedir()) {
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
