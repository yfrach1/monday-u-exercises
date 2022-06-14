import { isTextContainOnlyNumbersAndSpaces, removeDuplicate } from "./utils.js";

export function getTasksFromInput(input) {
  let PokemonsIdArr = [];
  let NormalTasks = [];
  if (isTextContainOnlyNumbersAndSpaces(input)) {
    PokemonsIdArr.push(input);
  } else if (input.includes(",")) {
    let splittedInputArr = input.split(",");
    PokemonsIdArr = splittedInputArr.filter(isTextContainOnlyNumbersAndSpaces);

    NormalTasks = splittedInputArr.filter((text) => {
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
