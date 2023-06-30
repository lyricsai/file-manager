import { createInterface } from "readline";
import { processCommand } from "../index.js";
import { exiting } from "../lib/helpers.js";
import { printWorkingDirectory } from "./dir.js";

export const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> ",
});

rl.on("line", (line) => {
  processCommand(line);
  printWorkingDirectory();
  rl.prompt();
});

rl.on("close", exiting);
