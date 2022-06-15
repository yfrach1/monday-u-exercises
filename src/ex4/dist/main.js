class Main {
  constructor() {
    this.itemClient = new ItemClient();
  }

  init = async () => {
    const addItemButton = document.getElementById("list-item-submit");
    addItemButton.addEventListener("click", () => {
      this.handleNewInput();
    });

    await this.renderItems(); // this will make it so that any time you refresh the page you'll see the items already in your todo list
  };

  handleNewInput = async () => {
    // implement
    const input = document.getElementById("list-item-input");
    const inputValue = input.value;
    input.value = "";
    if (!inputValue) {
      alert("Empty task is for lazy :)");
      return;
    }
    this.itemClient.handleNewItem(inputValue);
  };

  deleteItem = async (item) => {
    // implement
  };

  renderItems = async () => {
    const list = document.getElementById("list");
    list.innerHTML = "";

    const items = await this.itemClient.getAllTasks();

    items.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.classList.add("list-item");
      listItem.innerHTML = item;

      const listItemDeleteButton = this._createDeleteButton(item);
      listItem.appendChild(listItemDeleteButton);
      list.appendChild(listItem);
    });
  };

  _createDeleteButton = (item) => {
    const button = document.createElement("img");
    button.src = "./images/delete_icon.svg";
    button.classList.add("list-item-delete-button");
    button.addEventListener("click", (_) => this.deleteItem(item));

    return button;
  };
}

const main = new Main();

document.addEventListener("DOMContentLoaded", function () {
  main.init();
});
