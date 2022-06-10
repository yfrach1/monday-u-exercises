#!/usr/bin/env node
import { Command } from "commander";

import { description } from "./UI.js";
import { saveTasks, loadTasks, deleteTaskByIndex } from "./actions.js";

const progrem = new Command();

progrem
  .description("Cli for ToDo list")
  .name("ToDO")
  .version("1.0.0")
  .option("-h, --help", "This is the help detailed")
  .usage("<command>");

progrem
  .command("add")
  .description(description.add[0])
  .argument("<string>", "text with tasks or/and pokemon id.")
  .action(async (text) => {
    await saveTasks(text);
  });

progrem
  .command("get")
  .description(description.get)
  .action(async () => {
    await loadTasks();
  });
progrem
  .command("delete")
  .description(description.delete)
  .argument("<string>", "index in the list")
  .action(async (index) => {
    await deleteTaskByIndex(index);
  });

progrem
  .command("show-pokemon")
  .description(description["show pokemon"])
  .action(async () => {
    await deleteTask(index);
  });

progrem
  .command("delete-all")
  .description(description.delete)
  .argument("<string>", "index in the list")
  .action(async (index) => {
    await deleteTask(index);
  });

progrem.parse(process.argv);
