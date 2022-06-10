import inquirer from "inquirer";
import { description } from "./UI.js";
import {
  saveTasks,
  loadTasks,
  deleteTasks,
  showPokemonFromToDO,
} from "./actions.js";

inquirer
  .prompt([
    {
      type: "rawlist",
      name: "ToDo menu",
      message:
        "Welcome to HexDex ToDo :)\n If this is your first time, Help option will be usefull!\n\n What is your choice?",
      choices: [
        "Add new Task.",
        "Get all tasks.",
        "Delete one or more tasks.",
        "Show one of our favorite pokemon.",
        "Help.",
      ],
    },
    {
      type: "input",
      name: "new task input",
      message: "Please enter your task: ",
      when: function (answers) {
        return answers["ToDo menu"] === "Add new Task.";
      },
    },

    {
      type: "list",
      name: "Delete type",
      message: "What would you like to delete?",
      choices: ["All tasks", "By index"],
      when: function (answers) {
        return answers["ToDo menu"] === "Delete one or more tasks.";
      },
    },
    {
      type: "input",
      name: "index to delete",
      message: "Which index you like to delete?",
      when: function (answers) {
        return answers["Delete type"] === "By index";
      },
    },
    {
      type: "list",
      name: "pokemon to display",
      message: "Please choose one pokemon.",
      choices: ["bulbasaur", "charmander", "squirtle", "pikachu"],
      when: function (answers) {
        return answers["ToDo menu"] === "Show one of our favorite pokemon.";
      },
    },
    {
      type: "list",
      name: "Help",
      message: "Please choose one option to be explained in more details.",
      choices: [
        "Add new Task.",
        "Get all tasks.",
        "Delete one or more tasks.",
        "Show pokemon from your ToDo.",
      ],
      when: function (answers) {
        return answers["ToDo menu"] === "Help.";
      },
    },
  ])
  .then(async (choices) => {
    switch (choices["ToDo menu"]) {
      case "Add new Task.": {
        const text = choices["new task input"];
        await saveTasks(text);
        break;
      }
      case "Get all tasks.": {
        await loadTasks();
        break;
      }
      case "Delete one or more tasks.": {
        const deleteType = choices["Delete type"];
        const index = choices["index to delete"];
        await deleteTasks(deleteType, index);
        break;
      }
      case "Show one of our favorite pokemon.": {
        // const pokemonName = choices["pokemon to display"];
        // await displaypokemonHandler(pokemonName);
        // break;

        showPokemonFromToDO();
        break;
      }
    }
    switch (choices.Help) {
      case "Add new Task.": {
        console.info(description.add[0]);
        console.info(description.add[1]);
        break;
      }
      case "Get all tasks.": {
        console.info(description.get);
        break;
      }
      case "Delete one or more tasks.": {
        console.info(description.delete);
        break;
      }
      case "Show pokemon from your ToDo.": {
        console.info(description["show pokemon"]);
        break;
      }
    }
  });
