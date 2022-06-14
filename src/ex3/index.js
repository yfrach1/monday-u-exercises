#!/usr/bin/env node
import { Command } from "commander";

import { description } from "./UI.js";
import { saveTasks, loadTasks, deleteTaskByIndex } from "./actions.js";

const program = new Command();

program
  .description("Cli for ToDo list")
  .name("ToDO")
  .version("1.0.0")
  .option("-h, --help", "This is the help detailed")
  .usage("<command>");

program
  .command("add")
  .description(description.add[0])
  .argument("<string>", "text with tasks or/and pokemon id.")
  .action(async (text) => {
    await saveTasks(text);
  });

program
  .command("get")
  .description(description.get)
  .action(async () => {
    await loadTasks();
  });
program
  .command("delete")
  .description(description.delete)
  .argument("<string>", "index in the list")
  .action(async (index) => {
    await deleteTaskByIndex(index);
  });

program.parse(process.argv);
