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

// function booleanToint(bool) {
//   return bool === true ? 1 : 0;
// }

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
      return db("resources")
        .where({ id: added[0] })
        .first();
    });
}

function getTasks() {
  return db("tasks_list")
    .join("tasks", "tasks.id", "tasks_list.task_id")
    .join("projects", "projects.id", "tasks_list.project_id")
    .select(
      "tasks.id as TaskID",
      "tasks.description As Task_Description",
      "tasks.notes as Task_Notes",
      "projects.name as Project_Name",
      "projects.description as Project_Description",
      "tasks.completed"
    )
    .map(project => projectToBody(project));
}

function addTask(task, id) {
  return db("tasks")
    .insert(task)
    .then(addedId => {
      return addedId[0];
    })
    .then(task_id =>
      db("tasks_list")
        .insert({ task_id: task_id, project_id: id })
        .then(taskUpdate => {
          return taskUpdate;
        })
    );
}

module.exports = {
  getProjects,
  addProject,
  getResources,
  addResource,
  getTasks,
  addTask
};
