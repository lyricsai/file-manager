export const printHelp = () => {
  console.log("List of available commands:");
  console.log("nwd - Show current working directory");
  console.log("up - Go to the parent directory");
  console.log("mkdir [destination] - Make new dirrectory directory");
  console.log("cd [directory] - Navigate to a specific directory");
  console.log("ls - List files and folders in the current directory");
  console.log("cat [file] - Read and print the content of a file");
  console.log("add [file] - Create an empty file");
  console.log("rn [old_file] [new_file] - Rename a file");
  console.log(
    "cp [source_file] [destination_directory] - Copy a file to a destination directory"
  );
  console.log("mv [file] [new_directory] - Move a file to a new directory");
  console.log("rm [file] - Delete a file");
  console.log("os --EOL - Get the system end-of-line character");
  console.log("os --cpus - Get information about the host machine CPUs");
  console.log("os --homedir - Get the home directory");
  console.log("os --username - Get the current system user name");
  console.log(
    "os --architecture - Get the CPU architecture for which Node.js is compiled"
  );
  console.log("hash [file] - Calculate the hash for a file");
  console.log(
    "compress [file] [destination] - Compress a file using Brotli algorithm"
  );
  console.log(
    "decompress [file] [destination] - Decompress a file previously compressed with Brotli algorithm"
  );
  console.log(".exit - Exit file manager");
  console.log("CTRL+C - Exit file manager");
};
