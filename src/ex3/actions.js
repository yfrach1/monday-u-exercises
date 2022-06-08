import FileManager from "./fileManager.js";
import { messageToUser, pokemonImageUrl } from "./UI.js";
import inquirer from "inquirer";

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
  return result;
}
export async function deleteAllTasks() {
  const emptyTasksArray = fileManager.initTasksArray();
  fileManager.writeToJsonFile(emptyTasksArray);
  const result = "delete all successed";
  return result;
}

function printMessageToUser(result) {
  console.log(messageToUser[result]);
}

export async function deleteTasks(deleteType, index) {
  let result;
  switch (deleteType) {
    case "All tasks": {
      result = await deleteAllTasks();
      break;
    }
    case "By index": {
      result = await deleteTaskByIndex(index);
      break;
    }
  }
  printMessageToUser(result);
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

// function getPokemonsNames(data) {
//   const tasks = data.tasks;
//   const names = tasks.map((task) => {
//     return task.name;
//   });
//   return names;
// }

// async function getPokemonToBeDisplayed(names) {
//   console.log(typeof names);

//   await inquirer
//     .prompt([
//       {
//         type: "rawlist",
//         name: "pokemon to disply",
//         message: "Please choose the pokemon you want to display",
//         choices: names,
//       },
//     ])
//     .then((answer) => {
//       const name = answer["pokemon to disply"];
//       return name;
//     });
// }

// export async function showPokemonFromToDO() {
//   const data = await fileManager.readFromJsonFile();
//   let result = "show pokemon seccessed";
//   if (data.tasks == false) {
//     result = "show pokemon failed";
//   } else {
//     const pokemonsName = await getPokemonsNames(data);
//     const name = getPokemonToBeDisplayed(pokemonsName);
//     console.log("names is :", name);
//   }
// }
