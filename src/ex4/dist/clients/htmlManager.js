class HtmlManager {
  constructor(_itemClient) {
    this.itemClient = _itemClient;
    this.sortDirection = "up";
    this.sortButton = document.getElementById("sort_arrow");
    this.ul = document.getElementById("list");
    this.emptyTasks = true;
    this.clear_all_button;
    this.init();
  }

  async _setDisplayNotEmptyTasks() {
    document.getElementById("buttom_bar_container").style.display = "flex";
    document.getElementById("sort").style.display = "flex";
    this.emptyTasks = false;
  }

  async _setDisplayEmptyTasks() {
    document.getElementById("buttom_bar_container").style.display = "none";
    document.getElementById("sort").style.display = "none";
    this.emptyTasks = true;
  }

  _setLiTag(li, text, id) {
    li.id = id;
    li.classList.add("list-item");
    li.textContent = text;
  }

  _setImgTag(img) {
    img.src = this.img_src;
    img.className = this.img_class;
  }

  _addNewLiToHtml(li) {
    this.ul.appendChild(li);
  }

  _updatePendingTask(tasksAmount) {
    const span = document.getElementById("amount_of_pending_tasks");
    span.innerText = "You have " + tasksAmount + " pending tasks";
  }

  _createDeleteButton = (item) => {
    const button = document.createElement("img");
    button.src = "./images/delete_icon.svg";
    button.classList.add("list-item-delete-button");
    button.addEventListener("click", (_) => this._deleteItem(item));

    return button;
  };

  _createNewLiTag(item) {
    const text = item.text;
    const id = item.itemId;
    let li = document.createElement("li");

    this._setLiTag(li, text, id);
    const liDeleteButton = this._createDeleteButton(item);
    li.appendChild(liDeleteButton);
    return li;
  }

  async _setButtomBarDisplay(tasksAmount) {
    if (tasksAmount) {
      await this._setDisplayNotEmptyTasks();
    } else {
      await this._setDisplayEmptyTasks();
    }
  }

  _removeAllTasksFromHtml() {
    this.ul.innerHTML = "";
  }

  async renderTasksToHtml(data) {
    this._removeAllTasksFromHtml();

    if (data === null) {
      return;
    }
    const tasksList = data.tasks;
    const tasksAmount = tasksList.length;

    this._setButtomBarDisplay(tasksAmount);

    this._updatePendingTask(tasksList.length);
    tasksList.forEach((obj) => {
      const li = this._createNewLiTag(obj);
      this._addNewLiToHtml(li);
    });
  }

  _applySortDirection(direction) {
    if (direction === "down") {
      this.sortDirection = "up";
      this.sortButton.src = "./images/up_arrow.svg";
    } else {
      this.sortDirection = "down";
      this.sortButton.src = "./images/down_arrow.svg";
    }
  }

  getInputFromUser() {
    const input = document.getElementById("list-item-input");
    const inputValue = input.value;
    input.value = "";
    if (!inputValue) {
      return null;
    }
    return inputValue;
  }

  _deleteItem = async (item) => {
    const data = await this.itemClient.deleteTaskById(item);
    await this.renderTasksToHtml(data);
  };

  _handleClearAllTasks() {
    this.itemClient.deleteAllTasks();
    this._removeAllTasksFromHtml();
    this._setDisplayEmptyTasks();
  }

  async _handleSortTasks() {
    this._applySortDirection(this.sortDirection);
    const data = await this.itemClient.sortTasks(this.sortDirection);
    await this.renderTasksToHtml(data);
  }

  init() {
    const clearAllButton = document.getElementById("clear_all_button");

    clearAllButton.addEventListener("click", () => {
      this._handleClearAllTasks();
    });

    this.sortButton.addEventListener("click", () => {
      this._handleSortTasks();
    });
  }
}
