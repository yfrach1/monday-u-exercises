import { initResult } from "../utils/utils";
const axios = require("axios");
const url = "http://localhost:8000/";

export const getAllTasks = async () => {
  try {
    const response = await axios.get("http://localhost:8000/items");
    if (response.data.length === 0) {
      return initResult("empty", []);
    }
    return initResult("success", response.data);
  } catch (error) {
    const status = error.response.status;
    const errorMessage = `Request failed with status code: ${status},
error: ${error.response.data}`;
    return initResult("failed", errorMessage);
  }
};

export const handleNewItem = async (userInput) => {
  const newItem = {
    input: userInput,
  };

  try {
    const response = await axios.post(`${url}item`, newItem);
    return initResult("success", response.data);
  } catch (error) {
    const status = error.response.status;
    const errorMessage = `Request failed with status code: ${status},
error: ${error.response.data}`;
    return initResult("failed", errorMessage);
  }
};

export const deleteTaskById = async (id) => {
  const deleteByIdUrl = `${url}item/${id}`;
  try {
    const response = await axios.delete(deleteByIdUrl);
    return initResult("success", response.data);
  } catch (error) {
    const status = error.response.status;
    const errorMessage = `Request failed with status code: ${status},
error: ${error.response.data}`;

    return initResult("failed", errorMessage);
  }
};

export const deleteAllTasks = async () => {
  const deleteAllUrl = `${url}items`;

  try {
    await axios.delete(deleteAllUrl);
    return initResult("success", null);
  } catch (error) {
    const status = error.response.status;
    const errorMessage = `Request failed with status code: ${status},
error: ${error.response.data}`;

    return initResult("failed", errorMessage);
  }
};

export const sortTasks = async (sortDirection) => {
  const sortPath = `${url}items/sort/${sortDirection}`;
  try {
    const response = await axios.get(sortPath);
    if (!response.data.length) {
      return initResult("empty", []);
    }
    return initResult("success", response.data);
  } catch (error) {
    const status = error.response.status;
    const errorMessage = `Request failed with status code: ${status},
error: ${error.response.data}`;

    return initResult("failed", errorMessage);
  }
};
export const flipStatus = async (id) => {
  const updateStatusUrl = `${url}item/status/${id}`;
  try {
    const response = await axios.patch(updateStatusUrl);
    return initResult("success", response.data);
  } catch (error) {
    const status = error.response.status;
    const errorMessage = `Request failed with status code: ${status},
error: ${error.response.data}`;

    return initResult("failed", errorMessage);
  }
};

export const updateTaskText = async (id, text) => {
  const updateTaskTextUrl = `${url}item/text/${id}/${text}`;
  try {
    const response = await axios.patch(updateTaskTextUrl);
    return initResult("success", response.data);
  } catch (error) {
    const status = error.response.status;
    const errorMessage = `Request failed with status code: ${status},
error: ${error.response.data}`;
    alert(errorMessage);
    return initResult("failed", errorMessage);
  }
};
