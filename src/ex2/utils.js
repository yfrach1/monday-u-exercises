export function removeDuplicate(array) {
  const newArr = [...new Set(array)];
  return newArr;
}

export function combineTwoArrays(arr1, arr2) {
  return [...arr1, ...arr2];
}

export function isTextContainOnlyNumbersAndSpaces(str) {
  return /^(?=.*\d)[\d ]+$/.test(str);
}

export function clearSpacesFromNumber(number) {
  return number.replace(/\s+/g, "");
}

export function removeExtraSpaceFromTask(task) {
  return task
    .split(" ")
    .filter((item) => {
      return item !== "";
    })
    .join(" ");
}

export function removeAllExceptNumbers(str) {
  return str.replace(/[^\d.]/g, "");
}

export function differenceOfTwoArray(arr1, arr2) {
  return arr1.filter((item) => {
    return !arr2.includes(item);
  });
}
export function convertTextToLowerCase(arr) {
  return arr.map((text) => {
    return text.toLowerCase();
  });
}

export function capitalizeFirstLetter(text) {
  const capitalized = text.charAt(0).toUpperCase() + text.slice(1);
  return capitalized;
}

export function removeItemFromArray(array, item) {
  const myIndex = array.indexOf(item);
  array.splice(myIndex, 1);
}
