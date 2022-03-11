const fs = require('fs/promises');
const { asyncWrapper } = require('../utils/asyncErrorCatcher');

//Read and parse the json file
const readFile = asyncWrapper(async (path) => {
  const data = await fs.readFile(path);
  return JSON.parse(data);
});

//Write new videolist into json file
const saveData = asyncWrapper(async (path, data) => {
  await fs.writeFile(path, JSON.stringify(data));
});

module.exports = {
  readFile,
  saveData,
};
