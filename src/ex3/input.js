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
}

export default Input;
