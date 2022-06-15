// Create an ItemClient class here. This is what makes requests to your express server (your own custom API!)

class ItemClient {
  constructor() {
    this.url = "lic";
  }

  async getAllTasks() {
    let res;
    try {
      res = await axios.get("http://localhost:8080/tasks/");
    } catch (e) {
      console.log(e);
    }
    return res.data;
  }

  async handleNewItem(newItem) {
    const newPost = {
      userId: 1,
      title: "A new post",
      body: "This is the body of the new post",
    };
  }
}
