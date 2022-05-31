#!/usr/bin/env node
import { Command } from "commander";
import FileManager from "./fileManager.js";
import chalk from "chalk";
import { description, messageToUser } from "./UI.js";
function getColorByType(type) {
  if (type === "poison") {
    return chalk.hex("#A040A0");
  } else if (type === "grass") {
    return chalk.hex("#78C850");
  } else if (type === "electric") {
    return chalk.hex("#F8D030");
  } else if (type === "fire") {
    return chalk.hex("#F08030");
  } else if (type === "water") {
    return chalk.hex("#6890F0");
  } else if (type === "fly") {
    return chalk.hex("#A890F0");
  } else if (type === "normal") {
    return chalk.hex("#A8A878");
  } else if (type === "ground") {
    return chalk.hex("#E0C068");
  } else if (type === "fighting") {
    return chalk.hex("#C03028");
  } else if (type === "rock") {
    return chalk.hex("#B8A038");
  } else if (type === "bug") {
    return chalk.hex("#A8B820");
  } else if (type === "ghost") {
    return chalk.hex("#705898");
  } else if (type === "steel") {
    return chalk.hex("#B8B8D0");
  } else if (type === "psychic") {
    return chalk.hex("#F85888");
  } else if (type === "ice") {
    return chalk.hex("#98D8D8");
  } else if (type === "dragon") {
    return chalk.hex("#7038F8");
  } else if (type === "dark") {
    return chalk.hex("#705848");
  } else if (type === "fairy") {
    return chalk.hex("#EE99AC");
  } else if (type === "unknown") {
    return chalk.hex("#68A090");
  }
}

const path = "./myFile.txt";
const fileManager = new FileManager();
const progrem = new Command();

async function saveTasks(text) {
  return await fileManager.newTaskHandler(text);
}

async function loadTasks() {
  return await fileManager.showTasksToUser();
}

async function deleteTask(index) {
  return await fileManager.deleteTaskHandler(index);
}
function printMessageToUser(result) {
  console.log(messageToUser[result]);
}

progrem
  .description("Cli for ToDo list")
  .name("ToDO")
  .version("1.0.0")
  .option("-h, --help", "This is the help detailed")
  .usage("<command>");

progrem
  .command("add")
  .description(description.add)
  .argument("<string>", "text with tasks or/and pokemon id.")
  .action(async (text) => {
    const result = await saveTasks(text);
    printMessageToUser(result);
  });

progrem
  .command("get")
  .description(description.get)
  .action(async () => {
    const result = await loadTasks();
    printMessageToUser(result);
  });
progrem
  .command("delete")
  .description(description.delete)
  .argument("<string>", "index in the list")
  .action(async (index) => {
    const result = await deleteTask(index);
    printMessageToUser(result);
  });

progrem
  .command("delete-all")
  .description(description.delete)
  .argument("<string>", "index in the list")
  .action(async (index) => {
    const result = await deleteTask(index);
    printMessageToUser(result);
  });

progrem.parse(process.argv);
