const itemManager = require("../services/itemManager");

async function addNewInputHandler(req, res) {
  const input = req.body.input;
  if (!input) {
    return res.status(404).send("empty string is for lazy pepol");
  }
  try {
    const data = await itemManager.newInputHandler(input);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function getAllTasksHandler(req, res) {
  try {
    const data = await itemManager.getAllTasksHandler();
    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function deleteTaskHandler(req, res) {
  try {
    const id = req.params.id;
    const data = await itemManager.deleteTaskByIdHandler(id);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function deleteAllTaskHandler(req, res) {
  try {
    await itemManager.deleteAllTaskHandler();
    return res.status(200).send();
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function sortTasksHandler(req, res) {
  const sortDirection = req.params.direction;
  try {
    const data = await itemManager.sortTasksHandler(sortDirection);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function flipStatusHandler(req, res) {
  try {
    const id = req.params.id;
    const item = await itemManager.flipTaskStatusHandler(id);

    return res.status(200).send(item);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function updateTaskTextHandler(req, res) {
  try {
    const id = req.params.id;
    const text = req.params.text;
    await itemManager.updateItemTextHandler(id, text);
    return res.status(200).send();
  } catch (error) {
    return res.status(500).send(error.message);
  }
}
module.exports = {
  addNewInputHandler,
  getAllTasksHandler,
  deleteTaskHandler,
  deleteAllTaskHandler,
  sortTasksHandler,
  flipStatusHandler,
  updateTaskTextHandler,
};
