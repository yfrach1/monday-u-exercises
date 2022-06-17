class HtmlManager {
  emptyTasks = true;
  clear_all_button;
  sortDirection = "up";

  img_src = "./images/delete_icon.svg";
  li_class = "list-item";
  img_class = "list-item-delete-button";
  sortArrow;
  ul;
  constructor(_itemManager) {
    this.itemManager = _itemManager;
    this.initElement();
  }

  getInputFromUser() {
    const input = document.getElementById("list-item-input");
    const inputValue = input.value;
    input.value = "";
    return inputValue;
  }
  setDisplayEmptyTasks() {
    this.changeDIsplayOfElement("none", "buttom_bar_container");
    this.changeDIsplayOfElement("none", "sort");
    this.emptyTasks = true;
  }

  setLiTag(li, text, id) {
    li.id = id;
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
      this.itemManager.handleRemovePokemonIdFromStorage(li.id);
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

  addNewTaskOnHtml(obj) {
    const text = obj.text;
    const id = obj.id;
    let li = document.createElement("li");

    this.setLiTag(li, text, id);

    let img = document.createElement("img");
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
    ToDo.forEach((obj) => {
      this.addNewTaskOnHtml(obj);
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
    //console.log(this.sortDirection);
    if (this.sortDirection === "up") {
      this.applySortDirection(this.sortDirection);
      this.itemManager.sortTasks(this.sortDirection);
    } else {
      this.applySortDirection(this.sortDirection);
      this.itemManager.sortTasks(this.sortDirection);
    }
    this.renderTasksToHtml();
  }
  initElement() {
    this.sortArrow = document.getElementById("sort_arrow");
    this.ul = document.getElementById("list");
  }
  init() {
    this.clear_all_button = document.getElementById("clear_all_button");
    this.clear_all_button.addEventListener("click", () => {
      this.handleClearAllHtml();
    });
  }
}
