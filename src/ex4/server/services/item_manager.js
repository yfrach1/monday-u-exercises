// The ItemManager should go here. Remember that you have to export it.
const fs = require("fs");
const tasksTextList = [];
const jsonFilePath = "./server/data/output.json";

async function extractTextFromTasksArray(tasksArray) {
  const tasksTextList = tasksArray.tasks.map((task) => {
    return task.text;
  });
  return tasksTextList;
}

async function readFromJsonFile() {
  let data;
  let tasksArray;
  try {
    data = fs.readFileSync(jsonFilePath);
  } catch (e) {
    return "An error occured while reading JSON File.";
  }
  if (!data.length) {
    tasksArray = this.initTasksArray();
  } else {
    tasksArray = JSON.parse(data);
  }

  return extractTextFromTasksArray(tasksArray);
}

async function writeToJsonFile(tasksArray) {
  let jsonContent = JSON.stringify(tasksArray);
  fs.writeFile(jsonFilePath, jsonContent, "utf8", function (err) {
    if (err) {
      console.log(err);
      return "write error";
    }
  });

  return "add task seccessed";
}

function getTasksTextList() {
  return tasksTextList;
}

module.exports = {
  readFromJsonFile,
  getTasksTextList,
};
