const { getTasksFromInput } = require("./input");
const {
  capitalizeFirstLetter,
  combineTwoArrays,
  removeExtraSpaceFromTask,
} = require("../utils/utils");
const { Items } = require("../db/models");
const pokemonClient = require("../clients/pokemonClient");

async function getAllTasksHandler() {
  return await getTasksFromDB();
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
  try {
    const allItems = await Items.findAll();
    return allItems;
  } catch (error) {
    throw new Error("Read data from DB Failed.");
  }
}

async function addNewTasksToDB(newTasks) {
  const newTasksRow = newTasks.map((task) => {
    const itemName = capitalizeFirstLetter(removeExtraSpaceFromTask(task));
    return {
      itemName,
      status: false,
    };
  });

  try {
    const newItems = await Items.bulkCreate(newTasksRow);
    return newItems;
  } catch (error) {
    throw new Error("Write new data to DB Failed.");
  }
}

pokemonFetchedResultHandler = (pokemonFetchedResult) => {
  const succssesResultsData = pokemonFetchedResult
    .filter((result) => {
      return result.getRequestResult === "success";
    })
    .map((result) => result.data);

  const failedResultsId = pokemonFetchedResult
    .filter((result) => {
      return result.getRequestResult === "failed";
    })
    .map((result) => result.id);

  const results = { succssesResultsData, failedResultsId };
  return results;
};

failedRequestHandler = (failedResultsId) => {
  let text = [];
  if (failedResultsId.length === 1) {
    const id = failedResultsId[0];
    text = [`Pokemon with ID ${id} was not found`];
  } else if (failedResultsId.length > 1) {
    const failedIds = failedResultsId.join(",");
    text = [`Failed to fetch pokemon with this input: ${failedIds}`];
  }

  return text;
};

function createPokemonTask(data) {
  return `Catch ${data.name}`;
}

successRequestHandler = (succssesResultsData) => {
  const pokemonsSuccessTask = succssesResultsData.map((pokemonData) => {
    return createPokemonTask(pokemonData);
  });
  return pokemonsSuccessTask;
};

newPokemonsIdHandler = async (pokemonsIdArr) => {
  const pokemonFetchedResult = await pokemonClient.fetchePokemonsIdHandler(
    pokemonsIdArr
  );

  const { succssesResultsData, failedResultsId } =
    pokemonFetchedResultHandler(pokemonFetchedResult);
  const failedPokemonTask = failedRequestHandler(failedResultsId);
  const successPokemonsTask = successRequestHandler(succssesResultsData);

  const pokemonTasks = [...successPokemonsTask, ...failedPokemonTask];
  return pokemonTasks;
};

async function newInputHandler(input) {
  let newPokemonTasks = [];

  const { pokemonsIdArr, normalTasks } = getTasksFromInput(input);
  if (pokemonsIdArr.length) {
    newPokemonTasks = await newPokemonsIdHandler(pokemonsIdArr);
  }
  let newTasks = combineTwoArrays(newPokemonTasks, normalTasks);

  const data = await getTasksFromDB();
  const tasksList = data.map((item) => item.itemName);
  const newTasksToAdd = newTasks.filter(
    (task) => !checkIfTaskExist(task, tasksList)
  );

  const newItems = await addNewTasksToDB(newTasksToAdd);

  return newItems;
}

async function deleteTaskById(id) {
  try {
    const result = await Items.destroy({ where: { id } });
    if (result === 1) {
      return id;
    } else if (result === 0) {
      return null;
    }
  } catch (error) {
    throw new Error("Error while trying to delete an item");
  }
}

async function deleteTaskByIdHandler(id) {
  return await deleteTaskById(id);
}

deleteAllTasks = async () => {
  await Items.destroy({
    where: {},
  });
};
async function deleteAllTaskHandler() {
  await deleteAllTasks();
}

toggleStatus = async (id) => {
  const item = await Items.findOne({ where: { id } });
  const newStatus = !item.status;
  let doneAt = null;
  if (newStatus) {
    doneAt = new Date();
  }
  await item.update({
    status: newStatus,
    doneAt,
  });
  return { newValue: newStatus, id, field: "status" };
};
toggleStatusHandler = async (id) => {
  return await toggleStatus(id);
};

checkIfTaskExistInDB = async (text) => {
  const item = await Items.findOne({ where: { itemName: text } });

  if (item === null) {
    return false;
  } else {
    return true;
  }
};

updateItemTextHandler = async (id, text) => {
  const item = await Items.findOne({ where: { id } });
  let result = {
    newValue: capitalizeFirstLetter(text),
    id,
    field: "itemName",
  };
  if (await checkIfTaskExistInDB(text)) {
    result = {
      newValue: false,
    };
  } else {
    await item.update({
      itemName: capitalizeFirstLetter(text),
    });
  }
  return result;
};
module.exports = {
  getAllTasksHandler,
  newInputHandler,
  deleteTaskByIdHandler,
  deleteAllTaskHandler,
  toggleStatusHandler,
  updateItemTextHandler,
};
