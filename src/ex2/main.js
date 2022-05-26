import ItemManager from "./itemManager.js";
import PokemonClient from "./pokemonClient.js";
import Input from "./input.js";
import HtmlEditor from "./htmlEditor.js";
import { differenceOfTwoArray, combineTwoArrays } from "./utils.js";
// Implement the `Main` class here

class Main {
  constructor() {
    this.addButten = null;
    this.sortButton = null;
    this.input - null;
    this.itemManager = new ItemManager();
    this.pokemonClient = new PokemonClient();
    this.inputHandler = new Input();
    this.htmlEditor = new HtmlEditor(this.itemManager, this.pokemonClient);
  }

  async handleNewInput() {
    let answer = this.inputHandler.handleAndValidateInput();
    if (!answer) {
      alert("An empty task is for lazy pepole ;)");
      return;
    }
    let { newPokemonsIdArr, newNormalTasks } = answer;
    this.inputHandler.handleAndValidateInput();
    if (newPokemonsIdArr === undefined || newNormalTasks === undefined) {
      return;
    }
    let normalTasksToBeAdd =
      this.itemManager.handleNewNormalTasks(newNormalTasks);

    let pokemonsNameToBeFetch =
      this.pokemonClient.checkForPokemonInNoramlTasks(normalTasksToBeAdd);

    if (pokemonsNameToBeFetch.length) {
      normalTasksToBeAdd = differenceOfTwoArray(
        normalTasksToBeAdd,
        pokemonsNameToBeFetch
      );
      newPokemonsIdArr = combineTwoArrays(
        newPokemonsIdArr,
        pokemonsNameToBeFetch
      );
    }

    let pokemonTasksToBeAdd = await this.pokemonClient.handleNewPokemonesId(
      newPokemonsIdArr
    );

    let newTasksToBeadd = [...pokemonTasksToBeAdd, ...normalTasksToBeAdd];

    this.itemManager.addNewTasksToToDoList(newTasksToBeadd);
    this.htmlEditor.HandleNewTasksToHtml();
  }

  async isPokemonIdExist(text) {
    let x = await this.pokemonClient.fetchPokemon(text);
    this.addNewTaskOnHtml(x);
  }

  async fetchData(input) {
    let task = await this.pokemonClient.fetchPokemon(input);
    this.itemManager.addTaskToArray(task);
    //console.log(task);
  }

  handleOnClickSort() {
    this.htmlEditor.changeDisplayWhenSort();
  }

  init() {
    this.htmlEditor.init();
    this.addButten = document.getElementById("list-item-submit");
    this.addButten.addEventListener("click", () => {
      this.handleNewInput();
    });

    this.inputHandler.inputButton = document.getElementById("list-item-input");
    this.inputHandler.inputButton.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        this.handleNewInput();
      }
    });

    this.sortButton = document.getElementById("sort");
    this.sortButton.addEventListener("click", () => {
      this.handleOnClickSort();
    });
  }
}

const main = new Main();

document.addEventListener("DOMContentLoaded", function () {
  // you should create an `init` method in your class
  // the method should add the event listener to your "add" button

  main.init();
});
