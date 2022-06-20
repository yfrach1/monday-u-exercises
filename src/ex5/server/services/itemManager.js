const { getTasksFromInput } = require("./input");
const {
  generateUniqeId,
  capitalizeFirstLetter,
  combineTwoArrays,
} = require("../utils/utils");
const { Items } = require("../db/models");
const fileManager = require("./fileManager");
const pokemonClient = require("../clients/pokemonClient");
const fs = require("fs");

async function getAllTasksHandler() {
  const data = await getTasksFromDB();
  console.log("data:", data);
  return {
    status: 200,
    message: "successsed to read from DB",
    data,
  };
}

function checkIfTaskExist(newTask, tasksList) {
  let result = false;
  for (let i = 0; i < tasksList.length; i++) {
    if (capitalizeFirstLetter(newTask) === tasksList[i]) {
      result = true;
      break;
    }
  }
  return result;
}

async function getTasksFromDB() {
  const allItems = await Items.findAll();
  return allItems;
}

async function addNewTasksToDB(newTasks) {
  const newTasksRow = newTasks.map((task) => {
    return {
      itemName: capitalizeFirstLetter(task),
      status: false,
    };
  });
  await Items.bulkCreate(newTasksRow);
}

async function newInputHandler(input) {
  let newPokemonTasks = [];

  const { pokemonsIdArr, normalTasks } = getTasksFromInput(input);
  console.log("pokemonsIdArr: ", pokemonsIdArr);
  if (pokemonsIdArr.length) {
    newPokemonTasks = await pokemonClient.newPokemonesIdHandler(pokemonsIdArr);
  }

  const newTasks = combineTwoArrays(newPokemonTasks, normalTasks);

  const data = await getTasksFromDB();
  const tasksList = data.map((item) => item.itemName);
  console.log("tasksList:", tasksList);
  const newTasksToAdd = newTasks.filter(
    (task) => !checkIfTaskExist(task, tasksList)
  );

  const addTasksToDBResult = await addNewTasksToDB(newTasksToAdd);

  const DataAfterAddNewTasks = await getTasksFromDB();

  return {
    status: 200,
    message: "successfully write data to DB",
    data: DataAfterAddNewTasks,
  };
}

function initActionResult(status, message, data) {
  const result = {
    status,
    message,
    data,
  };
  return result;
}

async function deleteTaskById(id) {
  const result = await Items.destroy({ where: { id } });
  console.log("result of delete:", result);

  const data = await Items.findAll();
  return {
    status: 200,
    message: " delete item successed",
    data,
  };
}

async function deleteTaskByIdHandler(id) {
  const deleteResult = await deleteTaskById(id);

  if (deleteResult.status != 200) {
    return deleteResult;
  }

  let data = deleteResult.data;
  const writeResult = await fileManager.writeToJsonFile(data);

  return writeResult;
}

async function deleteAllTaskHandler() {
  const amountOfRowsDeleted = await Items.destroy({
    where: {},
    restartIdentity: true,
  });
  console.log("amountOfRowsDeleted: ", amountOfRowsDeleted);
  return {
    status: 200,
    message: "successfully delete all items",
  };
}

async function sortTasks(data, direction) {
  const tasksList = data.tasks;
  const tasksText = tasksList.map((task) => task.text);
  tasksText.sort();

  let newTasksArray = tasksText.map((text) => {
    const task = tasksList.find((task) => task.text === text);
    return task;
  });

  if (direction === "up") {
    newTasksArray.reverse();
  }

  return newTasksArray;
}

async function sortTasksHandler(sortDirection) {
  let response;
  let readResult;
  response = await getTasks();
  if (response.status != 200) {
    readResult = initActionResult(
      response.status,
      "Failed to sort tasks",
      null
    );
    return readResult;
  }
  const data = response.data;

  const tasksList = await sortTasks(data, sortDirection);
  const dataAfterSort = {
    tasks: tasksList,
    fetchedPokemon: data.fetchedPokemon,
  };
  const writeResult = await fileManager.writeToJsonFile(dataAfterSort);

  return writeResult;
}
module.exports = {
  getAllTasksHandler,
  newInputHandler,
  deleteTaskByIdHandler,
  deleteAllTaskHandler,
  sortTasksHandler,
};
