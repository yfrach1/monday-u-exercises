const itemManager = require("../services/itemManager");

async function addNewInputHandler(req, res) {
  const input = req.body.body;
  try {
    const result = await itemManager.newInputHandler(input);
    return res.status(result.status).send(result.data);
  } catch (e) {
    return res.status(400).send(e);
  }
}

async function getAllTasksHandler(req, res) {
  const result = await itemManager.getAllTasksHandler();
  return res.status(result.status).send(result.data);
}

async function deleteTaskHandler(req, res) {
  console.log("inside delete by id: ", req.params);
  const id = req.params.id;
  const result = await itemManager.deleteTaskByIdHandler(id);
  return res.status(result.status).send(result.data);
}

async function deleteAllTaskHandler(req, res) {
  const result = await itemManager.deleteAllTaskHandler();
  return res.status(result.status).send(result.data);
}

async function sortTasksHandler(req, res) {
  const sortDirection = req.params.direction;
  const result = await itemManager.sortTasksHandler(sortDirection);
  return res.status(result.status).send(result.data);
}

module.exports = {
  addNewInputHandler,
  getAllTasksHandler,
  deleteTaskHandler,
  deleteAllTaskHandler,
  sortTasksHandler,
};
