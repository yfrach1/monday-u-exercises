// Express boilerplate, hosting the `dist` file, connecting to the rout
const express = require("express");
// require("express-async-errors");
const taskRouter = require("./server/routes/itemRouter");
const port = 8080;
const app = express();

app.use([express.json(), express.static("dist")]);

app.use("/tasks", taskRouter);

process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled Rejection", reason.message);
  throw reason;
});

process.on("uncaughtException", (error) => {
  console.log("Uncaught Exception", error.message);
  process.exit(1);
});

app.listen(port, () => {
  console.log("Server started on port", port);
});
