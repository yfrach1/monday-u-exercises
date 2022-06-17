const fs = require("fs");
// export enum HttpStatusCode {
//  OK = 200,
//  BAD_REQUEST = 400,
//  NOT_FOUND = 404,
//  INTERNAL_SERVER = 500,
// }
const jsonFilePath = "server/data/output.json";

async function writeToJsonFile(data) {
  let result;
  let jsonContent = JSON.stringify(data);
  try {
    fs.writeFile(jsonFilePath, jsonContent, "utf8", function (err) {
      if (err) {
        result = initActionOnFileResult(400, err, null);
        return result;
      }
    });
  } catch (e) {
    result = initActionOnFileResult(400, err, null);
    return result;
  }

  result = initActionOnFileResult(200, "add task seccessed", data);
  return result;
}

async function initEmptyFile() {
  const data = {
    tasks: [],
    fetchedPokemon: [],
  };
  const writeResult = await writeToJsonFile(data);
  return writeResult;
}

function initActionOnFileResult(status, message, data) {
  const result = {
    status,
    message,
    data,
  };
  return result;
}

async function readFromJsonFile() {
  let data;
  let tasksArray;
  let result;
  if (!fs.existsSync(jsonFilePath)) {
    result = initActionOnFileResult(
      200,
      "create new file and init with structure",
      initEmptyFile().data
    );
  } else {
    try {
      data = fs.readFileSync(jsonFilePath);
    } catch (e) {
      const result = initActionOnFileResult(
        400,
        `An error occured while reading JSON File,
         Tasks not loaded from file`,
        null
      );
      return result;
    }
    if (!data.length) {
      result = initActionOnFileResult(
        200,
        "init file with structure",
        initEmptyFile().data
      );
    } else {
      tasksArray = JSON.parse(data);
      result = initActionOnFileResult(
        200,
        "read file  successfully",
        tasksArray
      );
    }
  }

  return result;
}

// async function deleteTaskHandler(index) {
//   const data = await this.readFromJsonFile();
//   const tasks = data.tasks;
//   let result = "delete successed";
//   if (tasks == false) {
//     result = "delete empty array";
//   } else if (index >= tasks.length) {
//     result = "index out of range";
//   } else {
//     const id = tasks[index].id;
//     tasks.splice(index, 1);
//     const idToBERemove = id.split(",");

//     const newFetchedPokemon = data.fetchedPokemon.filter((id) => {
//       return !idToBERemove.includes(id);
//     });

//     data.fetchedPokemon = newFetchedPokemon;
//     await this.writeToJsonFile(data);
//   }
//   return result;
// }

module.exports = {
  // deleteTaskHandler,
  readFromJsonFile,
  writeToJsonFile,
  initEmptyFile,
};
