class Input {
  inputButton = null;

  checkInputType(input) {
    let newPokemonsIdArr = [];
    let newNormalTasks = [];
    if (isTextContainOnlyNumbersAndSpaces(input)) {
      newPokemonsIdArr.push(input);
    } else if (input.includes(",")) {
      let arr = input.split(",");
      newPokemonsIdArr = arr.filter(isTextContainOnlyNumbersAndSpaces);

      newNormalTasks = arr.filter((text) => {
        return !isTextContainOnlyNumbersAndSpaces(text);
      });
    } else {
      newNormalTasks.push(input);
    }

    return { newPokemonsIdArr, newNormalTasks };
  }

  getInputFromUser() {
    const text = this.inputButton.value;
    this.inputButton.value = "";
    if (!text) {
      return null;
    }
    return text;
  }

  handleAndValidateInput() {
    let text = this.getInputFromUser();
    if (!text) {
      return null;
    }

    let { newPokemonsIdArr, newNormalTasks } = this.checkInputType(text);

    newPokemonsIdArr = newPokemonsIdArr.map(clearSpacesFromNumber);

    newNormalTasks = newNormalTasks.map(removeExtraSpaceFromTask);

    newPokemonsIdArr = removeDuplicate(newPokemonsIdArr);
    newNormalTasks = removeDuplicate(newNormalTasks);

    return { newPokemonsIdArr, newNormalTasks };
  }
}
