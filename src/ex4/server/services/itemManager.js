const { getTasksFromInput } = require("./input");
const { generateUniqeId, capitalizeFirstLetter } = require("../utils/utils");
const fileManager = require("./fileManager");
const pokemonClient = require("../clients/pokemonClient");
const fs = require("fs");

function getTasksTextList() {
  return tasksTextList;
}

async function getTasks() {
  return fileManager.readFromJsonFile();
}

function checkIfTaskExist(text, tasks) {
  let result = false;
  for (let i = 0; i < tasks.length; i++) {
    if (capitalizeFirstLetter(text) === tasks[i].text) {
      result = true;
      break;
    }
  }
  return result;
}

function newNormalTaskHandler(data, newNormalTasks) {
  let tasks = data.tasks;
  const normalTasksToBeAdd = newNormalTasks
    .filter((text) => {
      return !checkIfTaskExist(text, tasks);
    })
    .map((text) => {
      return { itemId: generateUniqeId(), text, type: "normal tasks" };
    });

  normalTasksToBeAdd.forEach((task) => {
    task.text = capitalizeFirstLetter(task.text);
    tasks.push(task);
  });

  let newData = data;
  newData.tasks = tasks;
  return data;
}

function initAddingTasksResults(PokemonsIdArr, NormalTasks) {
  let newTasksAddingResults = {
    pokemonFetch: PokemonsIdArr.length ? "succcessed" : null,
    normalTasks: NormalTasks.length ? "succcessed" : null,
  };
  return newTasksAddingResults;
}

async function getNewTasksArray(PokemonsIdArr, NormalTasks, data) {
  let newData = data;
  let newTasksAddingResults = initAddingTasksResults(
    PokemonsIdArr,
    NormalTasks
  );

  if (PokemonsIdArr.length) {
    newData = await pokemonClient.newPokemonesIdHandler(data, PokemonsIdArr);
  }
  if (NormalTasks.length) {
    newData = newNormalTaskHandler(newData, NormalTasks);
  }

  return { newData, newTasksAddingResults };
}

function checkIfThereIsNewDataToWrite(newTasksAddingResults) {
  let result = false;
  const { pokemonFetch, normalTasks } = newTasksAddingResults;

  if (pokemonFetch === "succcessed" || normalTasks === "succcessed") {
    result = true;
  }
  return result;
}

async function newInputHandler(input) {
  const readResponse = await fileManager.readFromJsonFile();
  if (readResponse.status != 200) {
    return readResponse;
  }

  const data = readResponse.data;

  const { pokemonsIdArr, normalTasks } = getTasksFromInput(input);

  const { newData, newTasksAddingResults } = await getNewTasksArray(
    pokemonsIdArr,
    normalTasks,
    data
  );
  let writeToFileResult = {
    status: 200,
    message: "not write new tasks to file",
    data: data,
  };
  if (checkIfThereIsNewDataToWrite(newTasksAddingResults)) {
    writeToFileResult = await fileManager.writeToJsonFile(newData);
  }

  return writeToFileResult;
}

function initActionResult(status, message, data) {
  const result = {
    status,
    message,
    data,
  };
  return result;
}

function removePokemonIdFromFetchedIds(pokemonsIdAlreadyFetched, pokemonId) {
  const idToBERemove = pokemonId.split(",");
  const PokemonsIdAlreadyFetchedAfterDelete = pokemonsIdAlreadyFetched.filter(
    (id) => {
      return !idToBERemove.includes(id);
    }
  );
  return PokemonsIdAlreadyFetchedAfterDelete;
}

async function deleteTaskById(id) {
  let response;
  let readResult;
  response = await getTasks();
  if (response.status != 200) {
    readResult = initActionResult(
      response.status,
      "Failed to get all tasks from file",
      null
    );
    return readResult;
  }

  const data = response.data;
  const tasksList = data.tasks;
  const taskToRemove = tasksList.find((task) => {
    return task.itemId === id;
  });
  const tasksListAfterDelete = tasksList.filter((task) => {
    return task.itemId !== id;
  });
  let newData = {
    tasks: tasksListAfterDelete,
    fetchedPokemon: data.fetchedPokemon,
  };

  if (taskToRemove.type === "pokemon") {
    const pokemonsIdAlreadyFetchedAfterDelete = removePokemonIdFromFetchedIds(
      data.fetchedPokemon,
      taskToRemove.pokemonId
    );
    newData.fetchedPokemon = pokemonsIdAlreadyFetchedAfterDelete;
  }
  deleteResult = initActionResult(200, "Delete by index successed", newData);

  return deleteResult;
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
  const deleteAllResult = await fileManager.initEmptyFile();
  return deleteAllResult;
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
  getTasksTextList,
  getNewTasksArray,
  getTasks,
  newInputHandler,
  deleteTaskByIdHandler,
  deleteAllTaskHandler,
  sortTasksHandler,
};
