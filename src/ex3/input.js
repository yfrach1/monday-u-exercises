import { isTextContainOnlyNumbersAndSpaces, removeDuplicate } from "./utils.js";

class Input {
  inputButton = null;

  checkInputType(input) {
    let PokemonsIdArr = [];
    let NormalTasks = [];
    if (isTextContainOnlyNumbersAndSpaces(input)) {
      PokemonsIdArr.push(input);
    } else if (input.includes(",")) {
      let arr = input.split(",");
      PokemonsIdArr = arr.filter(isTextContainOnlyNumbersAndSpaces);

      NormalTasks = arr.filter((text) => {
        return !isTextContainOnlyNumbersAndSpaces(text);
      });
    } else {
      NormalTasks.push(input);
    }
    PokemonsIdArr = removeDuplicate(PokemonsIdArr);
    NormalTasks = removeDuplicate(NormalTasks);
    const results = { PokemonsIdArr, NormalTasks };
    return results;
  }

  // getInputFromUser() {
  //   const text = this.inputButton.value;
  //   this.inputButton.value = "";
  //   if (!text) {
  //     return null;
  //   }
  //   return text;
  // }

  // handleAndValidateInput() {
  //   let text = this.getInputFromUser();
  //   if (!text) {
  //     return null;
  //   }

  //   let { newPokemonsIdArr, newNormalTasks } = this.checkInputType(text);

  //   newPokemonsIdArr = newPokemonsIdArr.map(clearSpacesFromNumber);

  //   newNormalTasks = newNormalTasks.map(removeExtraSpaceFromTask);

  //   newPokemonsIdArr = removeDuplicate(newPokemonsIdArr);
  //   newNormalTasks = removeDuplicate(newNormalTasks);

  //   return { newPokemonsIdArr, newNormalTasks };
  // }
}

export default Input;
