import express from "express";

const server = express();

server.get("/", (req, res) => {
   res.send("<h1>Welcome to my server!</h1>");
});

export default server;
