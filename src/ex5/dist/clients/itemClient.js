// Create an ItemClient class here. This is what makes requests to your express server (your own custom API!)

class ItemClient {
  constructor() {
    this.url = "http://localhost:3042/";
    this.tasksAmount;
  }
  async getAllTasks() {
    let response;

    try {
      response = await axios.get("http://localhost:3042/items");
    } catch (e) {
      alert(`An error occured while reading JSON File,
         Tasks not loaded from file`);
      return null;
    }

    const data = response.data;
    return data;
  }

  async handleNewItem(userInput) {
    let response;
    const newItem = {
      title: "A new input from user",
      body: userInput,
    };

    try {
      response = await axios.post(`${this.url}item`, newItem);
    } catch (e) {
      alert(e);
    }
    const data = response.data;
    return data;
  }

  async deleteTaskById(item) {
    let response;
    const id = item.id;
    const deleteByIdUrl = `${this.url}item/${id}`;
    try {
      response = await axios.delete(deleteByIdUrl);
    } catch (e) {
      alert(`An error occured while delete task by index,
         Task not deleted`);
      return null;
    }
    const data = response.data;
    return data;
  }

  async deleteAllTasks() {
    let response;
    const deleteAllUrl = `${this.url}items`;

    try {
      response = await axios.delete(deleteAllUrl);
    } catch (e) {
      alert(`An error occured while delete all tasks,
         Tasks not deleted`);
      return null;
    }

    const data = response.data;
    return data;
  }

  async sortTasks(sortDirection) {
    let response;
    const sortPath = `http://localhost:8080/tasks/sort/${sortDirection}`;
    try {
      response = await axios.get(sortPath);
    } catch (e) {
      alert(`An error occured while trying to sort the Tasks`);
      return null;
    }

    const data = response.data;
    return data;
  }
}
