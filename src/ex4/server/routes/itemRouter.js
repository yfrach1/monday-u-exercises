// Define your endpoints here (this is your "controller file")
const express = require("express");

const {
  createNewItem,
  getAllTasksFromFile,
} = require("../controllers/itemController");
const itemRouter = express.Router();

itemRouter.get("/", getAllTasksFromFile);
itemRouter.delete("/:id", (req, res) => res.status(200).send("hello world"));
itemRouter.post("/", createNewItem);

module.exports = itemRouter;
