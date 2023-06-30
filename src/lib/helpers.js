export const exiting = () => {
  console.log("Thank you for using the File Manager");
  process.exit();
};

export const handleError = (error) => {
  console.log("Operation failed");
  console.log(error.message);
  return;
};
