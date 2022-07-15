export const initResult = (result, message, data) => {
  const res = {
    result,
    message,
    data,
  };
  return res;
};

export const checkIfInputIsNotValid = (input) => {
  if (!input || !input.trim().replaceAll(",", "").length) {
    return true;
  } else {
    return false;
  }
};

export const compareItemName = (a, b) => {
  if (a.itemName < b.itemName) {
    return -1;
  }
  if (a.itemName > b.itemName) {
    return 1;
  }
  return 0;
};

//  function compareItemName(a, b) {
//           if (a.itemName < b.itemName) {
//             return -1;
//           }
//           if (a.itemName > b.itemName) {
//             return 1;
//           }
//           return 0;
//         }
