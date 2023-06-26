import { createInterface } from "readline";
import { processCommand } from "../index.js";
import { exiting } from "../lib/helpers.js";

export const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> ",
});

rl.on("line", (line) => {
  processCommand(line);
  rl.prompt();
});

rl.on("close", exiting);
