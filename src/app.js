const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  
  return response.json(repositories);

});

app.post("/repositories", (request, response) => {
  
  const { title, url, techs } = request.body;

  const repo = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repo);

  return response.status(201).json(repo);

});

app.put("/repositories/:id", (request, response) => {
  
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repoId = repositories.findIndex( (repo) => repo.id === id );

  if (repoId < 0)
    return response.status(400).send();

  const repo = Object.assign(repositories[repoId], { title, url, techs });
  
  repositories[repoId] = repo;
  
  return response.status(200).json(repo);

});

app.delete("/repositories/:id", (request, response) => {
  
  const { id } = request.params;
  const repoId = repositories.findIndex( (repo) => repo.id === id );

  if (repoId < 0)
    return response.status(400).send();

  repositories.splice(repoId, 1);

  return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  
  const { id } = request.params;
  const repoId = repositories.findIndex( (repo) => repo.id === id );

  if (repoId < 0)
    return response.status(400).send();

  repositories[repoId].likes++;

  return response.status(200).json(repositories[repoId]);

});

module.exports = app;
