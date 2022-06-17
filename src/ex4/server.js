// Express boilerplate, hosting the `dist` file, connecting to the rout
const express = require("express");
const logger = require("./server/middleware/logger");
const taskRouter = require("./server/routes/itemRouter");
const port = 8080;
const app = express();

app.use([logger.logger, express.json(), express.static("dist")]);

app.use("/tasks", taskRouter);

app.listen(port, () => {
  console.log("Server started on port", port);
});
