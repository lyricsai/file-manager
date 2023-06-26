"use strict";

import { executeCommand } from "./operations/commands.js";
import { rl } from "./operations/readline.js";
import { printWorkingDirectory } from "./operations/dir.js";
import { exiting } from "./lib/helpers.js";

export const processCommand = (line) => {
  try {
    const input = line.trim().split(" ");
    const command = input[0];
    executeCommand(command, input);
  } catch (error) {
    console.log(error.message);
  }
};

const args = process.argv.slice(2);
const usernameIndex = args.findIndex((arg) => arg.startsWith("--username="));
const username =
  usernameIndex !== -1 ? args[usernameIndex].split("=")[1] : "User";

process.on("SIGINT", exiting);

console.log(`Welcome to the File Manager, ${username}!`);
console.log(`Use help command to list all operations in the File Manager\n`);
printWorkingDirectory();
rl.prompt();
