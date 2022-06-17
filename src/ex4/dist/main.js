class Main {
  constructor() {
    this.itemClient = new ItemClient();
    this.htmlManager = new HtmlManager(this.itemClient);
  }

  init = async () => {
    const addItemButton = document.getElementById("list-item-submit");
    addItemButton.addEventListener("click", () => {
      this.handleNewInput();
    });
    const inputButton = document.getElementById("list-item-input");
    inputButton.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        this.handleNewInput();
      }
    });
    const data = await this.itemClient.getAllTasks();

    await this.htmlManager.renderTasksToHtml(data);
  };

  handleNewInput = async () => {
    const inputValue = this.htmlManager.getInputFromUser();
    if (!inputValue) {
      alert("Empty task is for lazy :)");
      return;
    }

    const data = await this.itemClient.handleNewItem(inputValue);
    await this.htmlManager.renderTasksToHtml(data);
  };
}

const main = new Main();

document.addEventListener("DOMContentLoaded", function () {
  main.init();
});
