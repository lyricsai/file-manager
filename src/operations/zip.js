import { createBrotliCompress, createBrotliDecompress } from "zlib";
import { resolve, basename, parse } from "path";
import { createReadStream, createWriteStream, read, rm } from "fs";
import { currentDirectory } from "./dir.js";
import { handleError } from "../lib/helpers.js";

export const compressFile = async (filePath, dest) => {
  const _basename = basename(filePath);
  const src = resolve(currentDirectory, filePath);
  const fullDestinationPath = resolve(currentDirectory, dest, _basename);

  const read = async () => {
    try {
      return createReadStream(src, { flags: "r" });
    } catch (error) {
      handleError(error);
    }
  };

  const readStream = await read();

  readStream.on("error", (e) => {
    handleError(e);
    return;
  });

  const writeStream = createWriteStream(fullDestinationPath + ".br", {
    flags: "wx+",
  });

  writeStream.on("error", handleError);
  const compress = createBrotliCompress();

  readStream.pipe(compress).pipe(writeStream);

  readStream.on("error", handleError).on("end", () => {
    console.log(
      `File "${filePath}" compressed successfully to "${fullDestinationPath}.br"\n`
    );
  });
};

export const decompressFile = (filePath, destinationPath) => {
  try {
    const { name } = parse(filePath);
    const src = resolve(currentDirectory, filePath);
    const fullDestinationPath = resolve(
      currentDirectory,
      destinationPath,
      name
    );

    if (
      !src.startsWith(process.cwd()) ||
      !fullDestinationPath.startsWith(process.cwd())
    ) {
      console.log(
        `Invalid input: "${filePath}" or "${destinationPath}" is not a valid path.`
      );
      return;
    }

    const readStream = createReadStream(src, { flags: "r" }).on(
      "error",
      handleError
    );

    const writeStream = createWriteStream(fullDestinationPath, {
      flags: "wx+",
    }).on("error", handleError);

    const brotli = createBrotliDecompress();
    const stream = readStream.pipe(brotli).pipe(writeStream);

    stream.on("finish", () => {
      console.log(
        `File "${filePath}" decompressed successfully to "${fullDestinationPath}"\n`
      );
    });
    stream.on("error", handleError);
  } catch (error) {
    console.log(`Operation failed ${error.message}`);
  }
};
