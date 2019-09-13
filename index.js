const express = require("express");
const projectRouter = require("./projects/project-router");

const server = express();

server.use(express.json());

server.use("/projects", projectRouter);

const port = process.env.PORT || 5000;
server.listen(port, console.log(`Server on ${port}`));
