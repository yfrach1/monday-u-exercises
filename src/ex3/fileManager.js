import fs from "fs";
import Input from "./input.js";
import PokemonClient from "./pokemonClient.js";
import { pokemonTypeColor } from "./UI.js";

const jsonFilePath = "./output.json";

class FileManager {
  pokemonClient = new PokemonClient();
  inputTool = new Input();

  async writeToJsonFile(tasksArray) {
    let jsonContent = JSON.stringify(tasksArray);
    fs.writeFile(this.jsonFilePath, jsonContent, "utf8", function (err) {
      if (err) {
        console.log(err);
        return "write error";
      }
    });

    return "add task seccessed";
  }

  checkIfTaskExist(text, tasks) {
    let result = false;
    for (let i = 0; i < tasks.length; i++) {
      if (text === tasks[i].text) {
        result = true;
        break;
      }
    }
    return result;
  }

  newNormalTaskHandler(data, newNormalTasks) {
    let tasks = data.tasks;
    const normalTasksToBeAdd = newNormalTasks
      .filter((text) => {
        return !this.checkIfTaskExist(text, tasks);
      })
      .map((text) => {
        return { id: "text", text };
      });
    if (!normalTasksToBeAdd.length) {
      return "normal tasks exist";
    }
    normalTasksToBeAdd.forEach((task) => {
      tasks.push(task);
    });

    let newData = data;
    newData.tasks = tasks;
    return data;
  }
  initAddingTasksResults(PokemonsIdArr, NormalTasks) {
    let newTasksAddingResults = {
      pokemonFetch: PokemonsIdArr.length ? "succcessed" : null,
      normalTasks: NormalTasks.length ? "succcessed" : null,
    };
    return newTasksAddingResults;
  }

  async getNewTasksArray(PokemonsIdArr, NormalTasks, data) {
    let newData = data;

    let newTasksAddingResults = this.initAddingTasksResults(
      PokemonsIdArr,
      NormalTasks
    );

    if (PokemonsIdArr.length) {
      newData = await this.pokemonClient.newPokemonesIdHandler(
        data,
        PokemonsIdArr
      );
    }

    if (newData === "pokemon id exist") {
      newTasksAddingResults.pokemonFetch = "all already exists";
      newData = data;
    }

    if (NormalTasks.length) {
      newData = this.newNormalTaskHandler(newData, NormalTasks);
    }
    if (newData === "normal tasks exist") {
      newTasksAddingResults.normalTasks = "all already exists";
      newData = data;
    }
    //console.log(newTasksAddingResults);
    return { newData, newTasksAddingResults };
  }

  checkIfThereIsNewDataToWrite(newTasksAddingResults) {
    let result = false;
    const { pokemonFetch, normalTasks } = newTasksAddingResults;

    if (pokemonFetch === "succcessed" || normalTasks === "succcessed") {
      result = true;
    }
    return result;
  }

  async newTaskHandler(text) {
    let writeToFileResult = "No added";
    const data = this.readFromJsonFile();

    const { PokemonsIdArr, NormalTasks } = this.inputTool.checkInputType(text);

    const { newData, newTasksAddingResults } = await this.getNewTasksArray(
      PokemonsIdArr,
      NormalTasks,
      data
    );

    if (this.checkIfThereIsNewDataToWrite(newTasksAddingResults)) {
      writeToFileResult = await this.writeToJsonFile(newData);
    }

    return writeToFileResult;
  }

  initTasksArray() {
    const tasksArray = {
      tasks: [],
      fetchedPokemon: [],
    };

    return tasksArray;
  }

  readFromJsonFile() {
    let data;
    let tasksArray;
    try {
      data = fs.readFileSync(this.jsonFilePath);
    } catch (e) {
      return "An error occured while reading JSON File.";
    }
    if (!data.length) {
      tasksArray = this.initTasksArray();
    } else {
      tasksArray = JSON.parse(data);
    }

    return tasksArray;
  }

  printPokemon(types, text) {
    const typesColored = types
      .split("/")
      .map((type) => {
        return pokemonTypeColor[type](type);
      })
      .join("/");
    console.log(text, "the", typesColored, "type pokemon");
  }

  printData(data) {
    console.log("\nTasks List:");
    data.forEach((obj) => {
      console.log(obj.text);
    });
  }

  async renderTasks() {
    let result = "load successed";
    const data = await this.readFromJsonFile();
    if (typeof data === "string") {
      return data;
    } else if (data.tasks == false) {
      result = "get empty array";
    } else {
      const tasks = data.tasks;
      this.printData(tasks);
    }

    return result;
  }

  async deleteTaskHandler(index) {
    const data = await this.readFromJsonFile();
    const tasks = data.tasks;
    let result = "delete successed";
    if (tasks == false) {
      result = "delete empty array";
    } else if (index >= tasks.length) {
      result = "index out of range";
    } else {
      const id = tasks[index].id;
      tasks.splice(index, 1);
      const idToBERemove = id.split(",");

      const newFetchedPokemon = data.fetchedPokemon.filter((id) => {
        return !idToBERemove.includes(id);
      });

      data.fetchedPokemon = newFetchedPokemon;
      await this.writeToJsonFile(data);
    }
    return result;
  }
}

export default FileManager;
