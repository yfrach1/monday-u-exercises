export const checkIfInputIsNotValid = (input) => {
  if (!input || !input.trim().replaceAll(",", "").length) {
    return true;
  } else {
    return false;
  }
};
