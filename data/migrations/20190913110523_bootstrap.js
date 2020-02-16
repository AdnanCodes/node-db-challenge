exports.up = function(knex) {
  return knex.schema
    .createTable("projects", tbl => {
      tbl.increments();
      tbl.string("name").notNullable();
      tbl.string("description");
      tbl.boolean("completed").defaultTo(false);
    })
    .createTable("tasks", tbl => {
      tbl.increments();
      tbl.string("description").notNullable();
      tbl.string("notes");
      tbl.boolean("completed").defaultTo(false);
    })
    .createTable("resources", tbl => {
      tbl.increments();
      tbl.string("name").notNullable();
      tbl.string("description");
    })
    .createTable("tasks_list", tbl => {
      tbl.increments();
      tbl
        .integer("task_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("tasks");
      tbl
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("projects");
      tbl.unique(["task_id", "project_id"]); //Only one task can belong to a Project
    })
    .createTable("resources_list", tbl => {
      tbl.increments();
      tbl
        .integer("resource_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("resources");
      tbl
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("projects");
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("resources_list")
    .dropTableIfExists("tasks_list")
    .dropTableIfExists("resources")
    .dropTableIfExists("tasks")
    .dropTableIfExists("projects");
};
