import FileManager from "./fileManager.js";
import { messageToUser, pokemonImageUrl } from "./UI.js";

import asciify from "asciify-image";

const options = {
  fit: "box",
  width: 50,
  height: 50,
};

const fileManager = new FileManager();

export async function saveTasks(text) {
  const result = await fileManager.newTaskHandler(text);
  printMessageToUser(result);
}

export async function loadTasks() {
  const result = await fileManager.renderTasks();
  printMessageToUser(result);
}

export async function deleteTaskByIndex(index) {
  const result = await fileManager.deleteTaskHandler(index);
  console.log(messageToUser[result]);
}
export async function deleteAllTasks() {
  const emptyTasksArray = fileManager.initTasksArray();
  fileManager.writeToJsonFile(emptyTasksArray);
  const result = "delete all successed";
  console.log(messageToUser[result]);
}

function printMessageToUser(result) {
  console.log(messageToUser[result]);
}

export async function deleteTasks(deleteType, index) {
  switch (deleteType) {
    case "All tasks": {
      await deleteAllTasks();
      break;
    }
    case "By index": {
      await deleteTaskByIndex(index);
      break;
    }
  }
}

async function displayPokemon(url) {
  asciify(url, options)
    .then(function (asciified) {
      console.log(asciified);
    })
    .catch(function (err) {
      console.error(err);
    });
}
export async function displaypokemonHandler(pokemonName) {
  const result = "show pokemon seccessed";

  switch (pokemonName) {
    case "bulbasaur": {
      await displayPokemon(pokemonImageUrl["bulbasaur"]);
      break;
    }
    case "charmander": {
      await displayPokemon(pokemonImageUrl["charmander"]);
      break;
    }
    case "squirtle": {
      await displayPokemon(pokemonImageUrl["squirtle"]);
      break;
    }
    case "pikachu": {
      await displayPokemon(pokemonImageUrl["pikachu"]);
      break;
    }
  }
  console.log(messageToUser[result]);
}
