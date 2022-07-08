const itemManager = require("../services/itemManager");

async function addNewInputHandler(req, res) {
  const input = req.body.input;
  try {
    const result = await itemManager.newInputHandler(input);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function getAllTasksHandler(req, res) {
  try {
    const result = await itemManager.getAllTasksHandler();
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function deleteTaskHandler(req, res) {
  try {
    const id = req.params.id;
    const result = await itemManager.deleteTaskByIdHandler(id);

    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function deleteAllTaskHandler(req, res) {
  try {
    const result = await itemManager.deleteAllTaskHandler();
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function toggleStatusHandler(req, res) {
  try {
    const id = req.params.id;
    const result = await itemManager.toggleStatusHandler(id);

    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function updateTaskTextHandler(req, res) {
  try {
    const id = req.params.id;
    const text = req.params.text;
    const result = await itemManager.updateItemTextHandler(id, text);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}
module.exports = {
  addNewInputHandler,
  getAllTasksHandler,
  deleteTaskHandler,
  deleteAllTaskHandler,
  toggleStatusHandler,
  updateTaskTextHandler,
};
