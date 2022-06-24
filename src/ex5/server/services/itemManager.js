const { getTasksFromInput } = require("./input");
const { capitalizeFirstLetter, combineTwoArrays } = require("../utils/utils");
const { Items, sequelize } = require("../db/models");
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

getSortOrder = (direction) => {
  let order;
  if (direction === "down") {
    order = {
      order: [["itemName", "DESC"]],
    };
  } else {
    order = {
      order: [["itemName", "ASC"]],
    };
  }
  return order;
};

async function getTasksFromDB(direction = null) {
  let order = {};
  if (direction !== null) {
    order = getSortOrder(direction);
  }
  try {
    const allItems = await Items.findAll(order);
    return allItems;
  } catch (error) {
    throw new Error("Read data from DB Failed.");
  }
}

async function addNewTasksToDB(newTasks) {
  const newTasksRow = newTasks.map((task) => {
    return {
      itemName: capitalizeFirstLetter(task),
      status: false,
    };
  });

  const t = sequelize.transaction();

  try {
    const newItems = await Items.bulkCreate(newTasksRow, { t });
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

  const newTasks = combineTwoArrays(newPokemonTasks, normalTasks);

  const data = await getTasksFromDB();

  const tasksList = data.map((item) => item.itemName);

  const newTasksToAdd = newTasks.filter(
    (task) => !checkIfTaskExist(task, tasksList)
  );

  const newItems = await addNewTasksToDB(newTasksToAdd);
  const dataAfterAddNewItems = [...data, ...newItems];

  return dataAfterAddNewItems;
}

async function deleteTaskById(id) {
  try {
    await Items.destroy({ where: { id } });
  } catch (error) {
    throw new Error("Error while trying to delete an item");
  }
  const data = await getTasksFromDB();
  return data;
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

async function sortTasksHandler(sortDirection) {
  const data = await getTasksFromDB(sortDirection);
  return data;
}

flipTaskStatus = async (id) => {
  const item = await Items.findOne({ where: { id } });
  const currentStatus = item.status;
  return await item.update({
    status: !currentStatus,
    doneAt: new Date(),
    updateAt: new Date(),
  });
};
flipTaskStatusHandler = async (id) => {
  const item = await flipTaskStatus(id);
  await getTasksFromDB();
  return item;
};

updateItemTextHandler = async (id, text) => {
  const item = await Items.findOne({ where: { id } });
  await item.update({
    itemName: text,
    updateAt: new Date(),
  });
};
module.exports = {
  getAllTasksHandler,
  newInputHandler,
  deleteTaskByIdHandler,
  deleteAllTaskHandler,
  sortTasksHandler,
  flipTaskStatusHandler,
  updateItemTextHandler,
};
