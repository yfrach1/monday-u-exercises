import { initResult } from "../../utils/utils";
import resultsType from "../actions/constants/Results";
import messageType from "../actions/constants/Message";
const axios = require("axios");
const url = "http://localhost:8000/";

export const getAllTasks = async () => {
  try {
    const response = await axios.get(`${url}items`);
    if (response.data.length === 0) {
      return initResult(resultsType.EMPTY, messageType.GET_ALL_EMPTY, []);
    }
    return initResult(
      resultsType.SUCCESS,
      messageType.GET_ALL_SUCCESSED,
      response.data
    );
  } catch (error) {
    return initResult(resultsType.FAILED, messageType.GET_ALL_FAILED, null);
  }
};

export const handleNewItem = async (userInput) => {
  const newItem = {
    input: userInput,
  };
  try {
    const response = await axios.post(`${url}item`, newItem);
    if (response.data.length === 0) {
      return initResult(
        resultsType.ALREADY_HAVE,
        messageType.ADD_ITEM_ALREADY_HAVE,
        []
      );
    }
    return initResult(
      resultsType.SUCCESS,
      messageType.ADD_ITEM_SUCCESSED,
      response.data
    );
  } catch (error) {
    return initResult(resultsType.FAILED, messageType.ADD_ITEM_FAILED, null);
  }
};

export const deleteTaskById = async (id) => {
  const deleteByIdUrl = `${url}item/${id}`;
  try {
    const response = await axios.delete(deleteByIdUrl);
    return initResult(
      resultsType.SUCCESS,
      messageType.DELETE_ITEM_SUCCESSED,
      response.data
    );
  } catch (error) {
    return initResult(resultsType.FAILED, messageType.DELETE_ITEM_FAILED, null);
  }
};

export const clearAllItems = async () => {
  const deleteAllUrl = `${url}items`;

  try {
    await axios.delete(deleteAllUrl);
    return initResult(
      resultsType.SUCCESS,
      messageType.CLEAR_ITEMS_SUCCESSED,
      null
    );
  } catch (error) {
    return initResult(resultsType.FAILED, messageType.CLEAR_ITEMS_FAILED, null);
  }
};

export const toggleStatus = async (id) => {
  const updateStatusUrl = `${url}item/status/${id}`;
  try {
    const response = await axios.patch(updateStatusUrl);
    const message = response.data.newValue
      ? messageType.TOGGLE_STATUS_CHECKED_SUCCESSED
      : messageType.TOGGLE_STATUS_UNCHECKED_SUCCESSED;
    return initResult(resultsType.SUCCESS, message, response.data);
  } catch (error) {
    return initResult(
      resultsType.FAILED,
      messageType.TOGGLE_STATUS_FAILED,
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
        ? messageType.EDIT_ITEM_SUCCESSED
        : messageType.EDIT_ITEM_ALREADY_HAVE;

    return initResult(resultsType.SUCCESS, message, response.data);
    //return initResult(response.data.updateResult, message, response.data);
  } catch (error) {
    return initResult(resultsType.FAILED, messageType.EDIT_ITEM_FAILED, null);
  }
};
