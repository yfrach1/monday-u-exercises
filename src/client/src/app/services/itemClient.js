const axios = require("axios");
const url = "http://localhost:8000/";

export const getAllTasks = async () => {
  const response = await axios.get(`${url}items`);
  return response.data;
};

export const handleNewItem = async (userInput) => {
  const newItem = {
    input: userInput,
  };

  const response = await axios.post(`${url}item`, newItem);
  return response.data;
};

export const deleteTaskById = async (id) => {
  const deleteByIdUrl = `${url}item/${id}`;

  const response = await axios.delete(deleteByIdUrl);
  return response.data;
};

export const clearAllItems = async () => {
  const deleteAllUrl = `${url}items`;

  await axios.delete(deleteAllUrl);
};

export const toggleStatus = async (id) => {
  const updateStatusUrl = `${url}item/status/${id}`;
  const response = await axios.patch(updateStatusUrl);
  return response.data;
};

export const updateTaskText = async (id, text) => {
  const updateTaskTextUrl = `${url}item/text/${id}/${text}`;
  const response = await axios.patch(updateTaskTextUrl);
  return response.data;
};
