const db = require("../data/db");

function projectToBody(project) {
  const result = {
    ...project,
    completed: intToBoolean(project.completed)
  };

  return result;
}

function intToBoolean(int) {
  return int === 1 ? true : false;
}

function booleanToint(bool) {
  return bool === true ? 1 : 0;
}

function getProjects() {
  return db("projects").map(project => projectToBody(project));
}

function addProject(project) {
  return db("projects")
    .insert(project)
    .then(added => {
      return added[0];
    });
}

function getResources() {
  return db("resources");
}

function addResource(resource) {
  return db("resources")
    .insert(resource)
    .then(added => {
      return added[0];
    });
}

function getTasks() {
  return db("tasks_list")
    .join("tasks", "tasks.id", "tasks_list.task_id")
    .join("projects", "projects.id", "tasks_list.project_id")
    .select(
      "tasks.id as TaskID",
      "tasks.description As Task_Description",
      "projects.name as Project_Name",
      "projects.description as Project_Description",
      "tasks.completed"
    );
}

function addTask(task) {
  return db("tasks")
    .insert(resource)
    .then(added => {
      return added[0];
    });
}

module.exports = {
  getProjects,
  addProject,
  getResources,
  addResource,
  getTasks,
  addTask
};
