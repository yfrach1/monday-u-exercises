export const initResult = (result, data) => {
  const res = {
    result,
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
