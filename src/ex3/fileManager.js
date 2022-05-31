import fs from "fs";
import Input from "./input.js";
import PokemonClient from "./pokemonClient.js";
import chalk from "chalk";
import { pokemonTypeColor } from "./UI.js";

class FileManager {
  jsonFilePath = "./output.json";
  pokemonClient = new PokemonClient();
  inputTool = new Input();

  async writeToJsonFile(tasksArray) {
    let jsonContent = JSON.stringify(tasksArray);
    fs.writeFile(this.jsonFilePath, jsonContent, "utf8", function (err) {
      if (err) {
        return "write error";
      }

      return "add task seccessed";
    });
  }

  checkIfTaskExist(text, tasks) {
    //console.log(tasks);
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

    normalTasksToBeAdd.forEach((task) => {
      tasks.push(task);
    });

    let newData = data;
    newData.tasks = tasks;
    return data;
  }

  async getNewTasksArray(PokemonsIdArr, NormalTasks, data) {
    let newDataAfterFetched = await this.pokemonClient.newPokemonesIdHandler(
      data,
      PokemonsIdArr
    );
    const newData = this.newNormalTaskHandler(newDataAfterFetched, NormalTasks);
    return newData;
  }

  async newTaskHandler(text) {
    const data = this.readFromJsonFile();

    const { PokemonsIdArr, NormalTasks } = this.inputTool.checkInputType(text);

    const newData = await this.getNewTasksArray(
      PokemonsIdArr,
      NormalTasks,
      data
    );
    await this.writeToJsonFile(newData);
  }

  readFromJsonFile() {
    let data;
    try {
      data = fs.readFileSync(this.jsonFilePath);
    } catch (e) {
      return "An error occured while reading JSON File.";
    }

    const tasksArray = JSON.parse(data);
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
    data.forEach((obj) => {
      if (obj.id === "text") {
        console.log(obj.text);
      } else {
        this.printPokemon(obj.type, obj.text);
      }
    });
  }
  async showTasksToUser() {
    let result = "load successed";
    const data = await this.readFromJsonFile();
    if (typeof data === "string") {
      return data;
    } else if (data.tasks == false) {
      result = "get empty array";
    }
    const tasks = data.tasks;
    this.printData(tasks);
    return result;
  }

  async deleteTaskHandler(index) {
    const data = await this.readFromJsonFile();
    const tasks = data.tasks;
    let result = "delete success";
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
