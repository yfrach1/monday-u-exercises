// Define your endpoints here (this is your "controller file")
const express = require("express");

const {
  addNewInputHandler,
  getAllTasksHandler,
  deleteTaskHandler,
  deleteAllTaskHandler,
  toggleStatusHandler,
  updateTaskTextHandler,
} = require("../controllers/itemController");
const itemRouter = express.Router();

itemRouter.get("/items", getAllTasksHandler);
itemRouter.delete("/item/:id", deleteTaskHandler);
itemRouter.delete("/items", deleteAllTaskHandler);
itemRouter.post("/item", addNewInputHandler);
itemRouter.patch("/item/status/:id", toggleStatusHandler);
itemRouter.patch("/item/text/:id/:text", updateTaskTextHandler);

module.exports = itemRouter;
