class HtmlManager {
  constructor(_itemClient) {
    this.itemClient = _itemClient;
    this.sortDirection = "down";
    this.sortButton = document.getElementById("sort_arrow");
    this.ul = document.getElementById("list");
    this.emptyTasks = true;
    this.clear_all_button;
    this.init();
  }

  _getDeleteButton = (id) => document.getElementById(`delete_button_${id}`);
  _getEditButton = (id) => document.getElementById(`edit_button_${id}`);
  _getSaveButton = (id) => document.getElementById(`save_button_${id}`);

  _setDisplayNotEmptyTasks() {
    document.getElementById("buttom_bar_container").style.display = "flex";
    document.getElementById("sort").style.display = "flex";
    this.emptyTasks = false;
  }

  _setDisplayEmptyTasks() {
    document.getElementById("buttom_bar_container").style.display = "none";
    document.getElementById("sort").style.display = "none";
    this.emptyTasks = true;
  }

  _createInputTag = (text, id) => {
    const input = document.createElement("input");
    input.classList.add("input-text");
    input.id = `input_${id}`;
    input.type = "text";
    input.readOnly = true;
    input.value = text;
    return input;
  };

  _setLiTag(li, id) {
    li.id = id;
    li.classList.add("list-item");
  }

  _addNewLiToHtml(li) {
    this.ul.appendChild(li);
  }

  _updatePendingTask(tasksAmount) {
    const span = document.getElementById("amount_of_pending_tasks");
    span.innerText = "You have " + tasksAmount + " pending tasks";
  }

  _deleteItem = async (item) => {
    const data = await this.itemClient.deleteTaskById(item);
    await this.renderTasksToHtml(data);
  };

  _createDeleteButton = (item) => {
    const button = document.createElement("img");
    button.id = `delete_button_${item.id}`;
    button.src = "./images/delete_icon.svg";
    button.classList.add("list-item-delete-button");
    button.addEventListener("click", () => this._deleteItem(item));

    return button;
  };

  _setDisplayStatusIsChecked = (editButton, deleteButton) => {
    editButton.style.display = "none";
    deleteButton.style.marginLeft = "auto";
  };

  _setDisplayStatusIsUnChecked = (editButton, deleteButton) => {
    editButton.style.display = "";
    deleteButton.style.marginLeft = "";
  };

  _changeStatusOnClick = async (item) => {
    const itemId = item.id;
    const itemAfterChangeStatus = await this.itemClient.flipStatus(item);
    const newStatus = itemAfterChangeStatus.status;
    const editButton = this._getEditButton(itemId);
    const deleteButton = this._getDeleteButton(itemId);
    if (newStatus) {
      this._setDisplayStatusIsChecked(editButton, deleteButton);
    } else {
      this._setDisplayStatusIsUnChecked(editButton, deleteButton);
    }

    const inputId = `input_${itemId}`;
    const input = document.getElementById(inputId);
    input.classList.toggle("input-text-task-done");
  };

  _createStatusCheckbox = (item) => {
    const input = document.createElement("input");
    input.type = "checkbox";
    if (item.status) {
      input.checked = "true";
    }
    input.addEventListener("change", () => this._changeStatusOnClick(item));
    return input;
  };

  _checkIfStatusIsChecked = (item, span) => {
    if (item.status) {
      span.classList.toggle("input-text-task-done");
    }
  };

  _displaySaveButtonAndHideEditButton = (id) => {
    const editButton = this._getEditButton(id);
    editButton.style.display = "none";
    const saveButton = this._getSaveButton(id);
    saveButton.style.display = "";
  };
  _displayEditButtonAndHideSaveButton = (id) => {
    const editButton = this._getEditButton(id);
    editButton.style.display = "";
    const saveButton = this._getSaveButton(id);
    saveButton.style.display = "none";
  };

  _setEditPropertiesOn = (inputId) => {
    const input = document.getElementById(inputId);
    input.style.border = "2px solid #C0C0C0";
    input.style.borderRadius = "5px";
    input.style.cursor = "text";
    input.readOnly = false;
  };
  _setEditPropertiesOff = (inputId) => {
    const input = document.getElementById(inputId);
    input.style.border = "none";
    input.style.borderRadius = "none";
    input.style.cursor = "pointer";
    input.readOnly = true;
    return input;
  };
  _editTaskText = (id) => {
    this._displaySaveButtonAndHideEditButton(id);
    this._setEditPropertiesOn(`input_${id}`);
  };

  _createEditButton = (item) => {
    const editButton = document.createElement("img");
    editButton.id = `edit_button_${item.id}`;
    editButton.src = "./images/edit_icon.svg";
    editButton.classList.add("list-item-edit-button");
    editButton.addEventListener("click", () => {
      this._editTaskText(item.id);
    });
    return editButton;
  };

  _saveTaskText = async (item) => {
    const inputId = `input_${item.id}`;
    const input = this._setEditPropertiesOff(inputId);
    const newText = input.value;
    await this.itemClient.updateTaskText(item.id, newText);
    this._displayEditButtonAndHideSaveButton(item.id);
  };
  _createSaveButton = (item) => {
    const saveButton = document.createElement("img");
    saveButton.id = `save_button_${item.id}`;
    saveButton.src = "./images/save_icon.svg";
    saveButton.style.display = "none";
    saveButton.classList.add("list-item-edit-button");
    saveButton.addEventListener("click", () => {
      this._saveTaskText(item);
    });
    return saveButton;
  };

  _createNewLiTag(item) {
    const text = item.itemName;
    const id = item.id;
    let li = document.createElement("li");

    const inputCheckbox = this._createStatusCheckbox(item);
    li.appendChild(inputCheckbox);

    const input = this._createInputTag(text, id);
    li.appendChild(input);

    this._setLiTag(li, id);
    this._checkIfStatusIsChecked(item, input);

    const editButton = this._createEditButton(item);
    const saveButton = this._createSaveButton(item);
    li.appendChild(editButton);
    li.appendChild(saveButton);

    const liDeleteButton = this._createDeleteButton(item);
    li.appendChild(liDeleteButton);

    return li;
  }

  async _setButtomBarDisplay(tasksAmount) {
    if (tasksAmount) {
      this._setDisplayNotEmptyTasks();
    } else {
      this._setDisplayEmptyTasks();
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
    const tasksAmount = data.length;
    this._setButtomBarDisplay(tasksAmount);
    this._updatePendingTask(tasksAmount);

    data.forEach((item) => {
      const li = this._createNewLiTag(item);
      this._addNewLiToHtml(li);
    });
  }

  _applySortDirection(direction) {
    if (direction === "down") {
      this.sortDirection = "up";
      this.sortButton.src = "./images/down_arrow.svg";
    } else {
      this.sortDirection = "down";
      this.sortButton.src = "./images/up_arrow.svg";
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
