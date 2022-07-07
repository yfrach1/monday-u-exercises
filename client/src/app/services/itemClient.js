import { initResult } from "../../utils/utils";
const axios = require("axios");
const url = "http://localhost:8000/";

export const getAllTasks = async () => {
  // const setLoaderOff = () => {
  //   setTimeout(() => {
  //     console.log("time done");
  //   }, 5000);
  // };
  // setLoaderOff();
  try {
    const response = await axios.get(`${url}items`);
    if (response.data.length === 0) {
      return initResult("empty", "", []);
    }
    return initResult("success", "Successfully get all items", response.data);
  } catch (error) {
    return initResult("failed", "Something failed while get items", null);
  }
};

export const handleNewItem = async (userInput) => {
  const newItem = {
    input: userInput,
  };
  try {
    const response = await axios.post(`${url}item`, newItem);
    return initResult("success", "Successfully add new items", response.data);
  } catch (error) {
    return initResult("failed", "Something failed while add new items", null);
  }
};

export const deleteTaskById = async (id) => {
  const deleteByIdUrl = `${url}item/${id}`;
  try {
    const response = await axios.delete(deleteByIdUrl);
    return initResult("success", "Successfully delete item", response.data);
  } catch (error) {
    return initResult("failed", "Something failed while delete item", null);
  }
};

export const deleteAllItems = async () => {
  const deleteAllUrl = `${url}items`;

  try {
    await axios.delete(deleteAllUrl);
    return initResult("success", "Successfully delete all items", null);
  } catch (error) {
    return initResult(
      "failed",
      "Something failed while delete all items",
      null
    );
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
export const toggleStatus = async (id) => {
  const updateStatusUrl = `${url}item/status/${id}`;
  try {
    const response = await axios.patch(updateStatusUrl);
    const action = response.data.newValue ? "checked" : "unchecked";
    return initResult("success", `Successfully ${action} item`, response.data);
  } catch (error) {
    return initResult(
      "failed",
      "Something failed while toggle item status",
      null
    );
  }
};

export const updateTaskText = async (id, text) => {
  const updateTaskTextUrl = `${url}item/text/${id}/${text}`;
  try {
    const response = await axios.patch(updateTaskTextUrl);
    const message =
      response.data.updateResult === "success"
        ? "Successfully edit & save item"
        : "Already have other task with same text";
    return initResult(response.data.updateResult, message, response.data);
  } catch (error) {
    return initResult(
      "failed",
      "Something failed while updating item text",
      null
    );
  }
};
