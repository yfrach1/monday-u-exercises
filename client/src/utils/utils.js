export const checkIfInputIsNotValid = (input) => {
  if (!input || !input.trim().replaceAll(",", "").length) {
    return true;
  } else {
    return false;
  }
};

export const capitalizeFirstLetter = (text) => {
  const capitalized = text.charAt(0).toUpperCase() + text.slice(1);
  return capitalized;
};
