class Main {
  pokemonClient = new PokemonClient();
  itemManager = new ItemManager(this.pokemonClient);
  inputHandler = new Input();
  htmlEditor = new HtmlEditor(this.itemManager);
  addButten;
  sortButton;
  input;

  constructor() {}

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

    await this.itemManager.handleNewTasks(newPokemonsIdArr, newNormalTasks);

    this.htmlEditor.HandleNewTasksToHtml();
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
  main.init();
});
