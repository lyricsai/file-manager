import { EOL, cpus as _cpus, homedir, userInfo } from "os";

export const getEOL = () => {
  console.log(`End-of-Line (EOL): ${JSON.stringify(EOL)}`);
};

export const getCPUsInfo = () => {
  const cpus = _cpus();

  console.log(`CPUs: ${cpus.length}`);
  cpus.forEach((cpu, index) => {
    console.log(`CPU ${index + 1}: ${cpu.model} (${cpu.speed} GHz)`);
  });
};

export const getHomeDirectory = () => {
  console.log(`Home directory: ${homedir()}`);
};

export const getCurrentUsername = () => {
  console.log(`Current username: ${userInfo().username}`);
};

export const getCPUArchitecture = () => {
  console.log(`CPU architecture: ${process.arch}`);
};
