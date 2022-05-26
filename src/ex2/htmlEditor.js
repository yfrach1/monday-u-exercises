class HtmlEditor {
  constructor(_itemManager, _pokemonClient) {
    this.img_src = "./images/delete_icon.svg";
    this.li_class = "list-item";
    this.img_class = "list-item-delete-button";
    this.itemManager = _itemManager;
    this.pokemonClient = _pokemonClient;
    this.ul = document.getElementById("list");
    this.emptyTasks = true;
    this.clear_all_button;
    this.sortArrow = document.getElementById("sort_arrow");
    this.sortDirection = "up";
  }

  setDisplayEmptyTasks() {
    this.changeDIsplayOfElement("none", "buttom_bar_container");
    this.changeDIsplayOfElement("none", "sort");
    this.emptyTasks = true;
  }

  createNewTag(tagName) {
    return document.createElement(tagName);
  }

  setLiTag(li, text) {
    li.id = this.pokemonClient.getPokemonIdByName(text);
    li.className = this.li_class;
    li.textContent = text;
  }

  setImgTag(img) {
    img.src = this.img_src;
    img.className = this.img_class;
  }

  addNewLiToHtml(li) {
    this.ul.appendChild(li);
  }

  updatePendingTask() {
    const span = document.getElementById("amount_of_pending_tasks");
    span.innerText =
      "You have " + this.itemManager.getTaskAmount() + " pending tasks";
  }

  removeTask(li) {
    if (li.id !== "text") {
      this.pokemonClient.removePokemonIdFromStorage(li.id);
    }
    let task = li.textContent;
    this.itemManager.setTaskAmount("-", 1);
    this.updatePendingTask();
    this.itemManager.removeTaskFromToDoArray(task);
    this.removeAllTasksFromHtml();
    let ToDo = this.itemManager.getToDoList();
    if (ToDo.length > 0) {
      this.renderTasksToHtml();
    } else {
      this.setDisplayEmptyTasks();
    }
  }

  addNewTaskOnHtml(text) {
    let li = this.createNewTag("li");

    this.setLiTag(li, text);

    let img = this.createNewTag("img");
    this.setImgTag(img);

    img.addEventListener("click", () => {
      this.removeTask(li);
    });

    li.appendChild(img);
    this.addNewLiToHtml(li);
  }
  removeAllTasksFromHtml() {
    this.ul.innerHTML = "";
  }
  renderTasksToHtml() {
    let ToDo = this.itemManager.getToDoList();
    this.updatePendingTask();
    ToDo.forEach((task) => {
      this.addNewTaskOnHtml(task);
    });
  }
  changeDIsplayOfElement(displayStatus, id) {
    let div = document.getElementById(id);
    div.style.display = displayStatus;
  }

  HandleNewTasksToHtml() {
    if (this.emptyTasks) {
      this.emptyTasks = false;
      this.changeDIsplayOfElement("flex", "buttom_bar_container");
      this.changeDIsplayOfElement("flex", "sort");
    }
    this.removeAllTasksFromHtml();
    this.renderTasksToHtml();
  }

  handleClearAllHtml() {
    this.removeAllTasksFromHtml();
    this.itemManager.resetData();
    this.pokemonClient.resetData();
    this.setDisplayEmptyTasks();
    this.updatePendingTask();
  }
  applySortDirection(direction) {
    if (direction === "down") {
      this.sortDirection = "up";
      this.sortArrow.src = "./images/up_arrow.svg";
    } else {
      this.sortDirection = "down";
      this.sortArrow.src = "./images/down_arrow.svg";
    }
  }
  changeDisplayWhenSort() {
    this.removeAllTasksFromHtml();
    if (this.sortDirection === "up") {
      this.applySortDirection(this.sortDirection);
      this.itemManager.sortTasks(this.sortDirection);
    } else {
      this.applySortDirection(this.sortDirection);
      this.itemManager.sortTasks(this.sortDirection);
    }
    this.renderTasksToHtml();
  }
  init() {
    this.clear_all_button = document.getElementById("clear_all_button");
    this.clear_all_button.addEventListener("click", () => {
      this.handleClearAllHtml();
    });
  }
}

export default HtmlEditor;
