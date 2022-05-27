// import {
//   capitalizeFirstLetter,
//   differenceOfTwoArray,
//   removeItemFromArray,
//   convertTextToLowerCase,
// } from "./utils.js";

class ItemManager {
  constructor() {
    this.toDoList = [];
    this.taskAmount = 0;
    this.ul = document.getElementById("list");
  }

  getTaskAmount() {
    return this.taskAmount;
  }
  handleNewNormalTasks(newNormalTasks) {
    let tasksToBeAdd = newNormalTasks.map(capitalizeFirstLetter);
    if (this.toDoList) {
      tasksToBeAdd = differenceOfTwoArray(tasksToBeAdd, this.toDoList);
      return tasksToBeAdd;
    }
    return newNormalTasks;
  }
  updateTasksAmount(action, amount) {
    let newAmount = amount;
    switch (action) {
      case "+": {
        newAmount += this.taskAmount;
        break;
      }
      case "-": {
        newAmount = this.taskAmount - newAmount;
        break;
      }
    }
    return newAmount;
  }
  setTaskAmount(action, amount) {
    this.taskAmount = this.updateTasksAmount(action, amount);
  }

  addNewTasksToToDoList(newTasks) {
    const newTasksToBeadd = newTasks.map(capitalizeFirstLetter);
    this.taskAmount = this.updateTasksAmount("+", newTasks.length);
    this.toDoList = [...this.toDoList, ...newTasksToBeadd];
  }

  getToDoList() {
    return this.toDoList;
  }
  sortTasks(direction) {
    this.toDoList.sort();
    if (direction === "up") {
      this.toDoList.reverse();
    }
  }

  removeTaskFromToDoArray(task) {
    removeItemFromArray(this.toDoList, task);
  }

  resetData() {
    this.toDoList = [];
    this.taskAmount = 0;
  }
}

// export default ItemManager;
