const itemManager = require("../services/item_manager");

async function createNewItem(req, res) {
  console.log("req body: ", req.body);
}

async function getAllTasksFromFile(req, res) {
  const data = await itemManager.readFromJsonFile();
  console.log("123");
  return {};
  return res.status(200).send(data);
}

module.exports = {
  createNewItem,
  getAllTasksFromFile,
};
