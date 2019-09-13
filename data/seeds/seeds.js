exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("resources_list")
    .truncate()
    .then(() => knex("tasks_list").truncate())
    .then(() => knex("resources").truncate())
    .then(() => knex("tasks").truncate())
    .then(() => knex("projects").truncate())

    .then(() => {
      // Inserts seed entries
      return knex("projects").insert([
        {
          name: "Build A React App",
          description: "Immersive Front End",
          completed: false
        },
        {
          name: "Build SQL Server",
          description: "Powerful Back End",
          completed: false
        }
      ]);
    })
    .then(() => {
      return knex("tasks").insert([
        {
          description: "UseState",
          notes: "Manage your state using UseState",
          completed: false
        },
        {
          description: "UseEffect",
          notes: "Do a API pulls and re-renders using UseEffect",
          completed: false
        },
        {
          description: "SQL Database",
          notes: "Build A database",
          completed: false
        },
        {
          description: "Heroku Deployment",
          notes: "Don't forget to link",
          completed: false
        }
      ]);
    })
    .then(() => {
      return knex("resources").insert([
        { name: "VS Code", description: "IDE for Web Development" },
        { name: "NPM", description: "NPM for node modules" },
        { name: "Terminal", description: "Be a computer whiz" }
      ]);
    })
    .then(() => {
      return knex("tasks_list").insert([
        { task_id: 1, project_id: 1 },
        { task_id: 2, project_id: 1 },
        { task_id: 3, project_id: 2 },
        { task_id: 4, project_id: 2 }
      ]);
    })
    .then(() => {
      return knex("resources_list").insert([
        { resource_id: 1, project_id: 1 },
        { resource_id: 2, project_id: 1 },
        { resource_id: 2, project_id: 2 },
        { resource_id: 3, project_id: 2 }
      ]);
    });
};
