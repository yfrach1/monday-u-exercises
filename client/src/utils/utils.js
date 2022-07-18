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

export function capitalizeFirstLetter(text) {
  const capitalized = text.charAt(0).toUpperCase() + text.slice(1);
  return capitalized;
}
