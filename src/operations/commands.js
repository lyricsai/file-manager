"use strict";
import path from "path";
import {
  createFile,
  readFile,
  renameFile,
  copyFile,
  moveFile,
  deleteFile,
} from "./fs.js";
import {
  createDirectory,
  currentDirectory,
  navigateToDirectory,
  printWorkingDirectory,
  listFilesAndFolders,
} from "./dir.js";
import { compressFile, decompressFile } from "./zip.js";
import { exiting } from "../lib/helpers.js";
import {
  getCPUArchitecture,
  getCPUsInfo,
  getCurrentUsername,
  getEOL,
  getHomeDirectory,
} from "./os.js";
import { calculateHash } from "./hash.js";
import { printHelp } from "./help.js";

export const executeCommand = (command, parts) => {
  switch (command) {
    case "nwd":
      printWorkingDirectory();
      break;
    case "mkdir":
      const newDirectoryArg = parts[1];
      createDirectory(newDirectoryArg);
      break;
    case "up":
      const parentDirectory = path.dirname(currentDirectory);
      console.log("parent", parentDirectory, "current", currentDirectory);
      navigateToDirectory(parentDirectory);
      printWorkingDirectory();
      break;
    case "cd":
      const directory = parts[1];
      navigateToDirectory(directory);
      break;
    case "ls":
      listFilesAndFolders();
      break;
    case "cat":
      const file = parts[1];
      readFile(file);
      break;
    case "add":
      const newFile = parts[1];
      createFile(newFile);
      break;
    case "rn":
      const oldName = parts[1];
      const newName = parts[2];
      renameFile(oldName, newName);
      break;
    case "cp":
      const sourceFile = parts[1];
      const copyTo = parts[2];
      copyFile(sourceFile, copyTo);
      break;
    case "mv":
      const fileToMove = parts[1];
      const moveTo = parts[2];
      moveFile(fileToMove, moveTo);
      break;
    case "rm":
      const fileToDelete = parts[1];
      deleteFile(fileToDelete);
      break;
    case "os":
      const flag = parts[1];
      switch (flag) {
        case "--EOL":
          getEOL();
          break;
        case "--cpus":
          getCPUsInfo();
          break;
        case "--homedir":
          getHomeDirectory();
          break;
        case "--username":
          getCurrentUsername();
          break;
        case "--architecture":
          getCPUArchitecture();
          break;
        default:
          console.log("Invalid input");
      }
      break;
    case "hash":
      const fileToHash = parts[1];
      calculateHash(fileToHash);
      break;
    case "compress":
      const fileToCompress = parts[1];
      const compressedDestination = parts[2];
      compressFile(fileToCompress, compressedDestination);
      break;
    case "decompress":
      const fileToDecompress = parts[1];
      const decompressedDestination = parts[2];
      decompressFile(fileToDecompress, decompressedDestination);
      break;
    case ".exit":
      exiting();
    case "help":
      printHelp();
      break;
    default:
      console.log("Invalid input");
  }
};
