// Create an ItemClient class here. This is what makes requests to your express server (your own custom API!)

class ItemClient {
  constructor() {
    this.url = "http://localhost:3042/";
    this.tasksAmount;
  }
  async getAllTasks() {
    try {
      const response = await axios.get("http://localhost:3042/items");
      return response.data;
    } catch (e) {
      const status = error.response.status;
      const errorMessage = `Request failed with status code ${status}
${error.response.data}`;
      alert(errorMessage);
      return [];
    }
  }

  async handleNewItem(userInput) {
    const newItem = {
      input: userInput,
    };

    try {
      const response = await axios.post(`${this.url}item`, newItem);
      return response.data;
    } catch (error) {
      const status = error.response.status;
      const errorMessage = `Request failed with status code ${status}
${error.response.data}`;
      alert(errorMessage);
      return [];
    }
  }

  async deleteTaskById(item) {
    const id = item.id;
    const deleteByIdUrl = `${this.url}item/${id}`;
    try {
      const response = await axios.delete(deleteByIdUrl);
      return response.data;
    } catch (error) {
      const status = error.response.status;
      const errorMessage = `Request failed with status code ${status}
${error.response.data}`;
      alert(errorMessage);
      return [];
    }
  }

  async deleteAllTasks() {
    const deleteAllUrl = `${this.url}items`;

    try {
      await axios.delete(deleteAllUrl);
    } catch (error) {
      const status = error.response.status;
      const errorMessage = `Request failed with status code ${status}
${error.response.data}`;
      alert(errorMessage);
    }
  }

  async sortTasks(sortDirection) {
    const sortPath = `http://localhost:3042/items/sort/${sortDirection}`;
    try {
      const response = await axios.get(sortPath);
      return response.data;
    } catch (error) {
      const status = error.response.status;
      const errorMessage = `Request failed with status code ${status}
${error.response.data}`;
      alert(errorMessage);
      return [];
    }
  }

  async flipStatus(item) {
    const id = item.id;
    const updateStatusUrl = `${this.url}item/status/${id}`;
    try {
      const response = await axios.patch(updateStatusUrl);
      return response.data;
    } catch (error) {
      const status = error.response.status;
      const errorMessage = `Request failed with status code ${status}
${error.response.data}`;
      alert(errorMessage);
    }
  }

  async updateTaskText(id, text) {
    const updateTaskTextUrl = `${this.url}item/text/${id}/${text}`;
    try {
      const response = await axios.patch(updateTaskTextUrl);
      //return response.data;
    } catch (error) {
      const status = error.response.status;
      const errorMessage = `Request failed with status code ${status}
${error.response.data}`;
      alert(errorMessage);
    }
  }
}
