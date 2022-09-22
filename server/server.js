import express from "express";
import { personsRouter } from "./controllers/PersonController.js";
import { tasksRouter } from "./controllers/TaskController.js";
import cors from "cors";

const server = express();

server.get("/", (req, res) => {
   res.send("<h1>Welcome to my server!</h1>");
});

server.use(
   cors({
      origin: "http://localhost:3000"
   })
);

server.use("/persons", personsRouter);
server.use("/tasks", tasksRouter);

export default server;
