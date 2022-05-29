class ItemManager {
  toDoList = [];
  taskAmount = 0;

  ul = document.getElementById("list");
  constructor(_pokemonClient) {
    this.pokemonClient = _pokemonClient;
  }

  handleRemovePokemonIdFromStorage(pokemonId) {
    this.pokemonClient.removePokemonIdFromStorage(pokemonId);
  }
  HandleGetPokemonIdByName(text) {
    return this.pokemonClient.getPokemonIdByName(text);
  }
  getTaskAmount() {
    return this.taskAmount;
  }
  handleNewNormalTasks(newNormalTasks) {
    let tasksToBeAdd = newNormalTasks.map(capitalizeFirstLetter);

    if (this.toDoList) {
      const tasksText = this.toDoList.map((obj) => {
        return obj.text;
      });
      tasksToBeAdd = differenceOfTwoArray(tasksToBeAdd, tasksText);
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
    const newTasksToBeadd = newTasks.map((item) => {
      if (typeof item === "string") {
        return { id: "text", text: item };
      } else {
        return item;
      }
    });

    this.taskAmount = this.updateTasksAmount("+", newTasks.length);
    this.toDoList = [...this.toDoList, ...newTasksToBeadd];
  }

  getToDoList() {
    return this.toDoList;
  }
  compare(a, b) {
    if (a.text < b.text) {
      return -1;
    }
    if (a.text > b.text) {
      return 1;
    }
    return 0;
  }

  sortTasks(direction) {
    this.toDoList.sort(this.compare);
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
    this.pokemonClient.resetData();
  }

  async handleNewTasks(newPokemonsIdArr, newNormalTasks) {
    let normalTasksToBeAdd = this.handleNewNormalTasks(newNormalTasks);

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

    this.addNewTasksToToDoList(newTasksToBeadd);
  }
}
