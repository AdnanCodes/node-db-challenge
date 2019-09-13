const router = require("express").Router();
const Projects = require("./project_model");

router.get("/", (req, res) => {
  Projects.getProjects()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(() => res.status(500).json({ error: "DB not working" }));
});
router.post("/", (req, res) => {
  Projects.addProject(req.body)
    .then(user => res.status(201).json(user))
    .catch(() => res.status(500).json({ error: "DB not working" }));
});

router.get("/tasks", (req, res) => {
  Projects.getTasks()
    .then(tasks => {
      res.status(200).json(tasks);
    })
    .catch(error => res.status(500).json({ error: error }));
});

router.post("/:id/tasks", (req, res) => {
  Projects.addTask(req.body, req.params.id)
    .then(tasks => {
      res.status(201).json(tasks);
    })
    .catch(error => res.status(500).json(error));
});

module.exports = router;
