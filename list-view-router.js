const express = require("express");
const router = express.Router();
const { listTasks, tasks } = require("./objects");

// Middleware para validar el parámetro 'completed'
function validateCompletedParam(req, res, next) {
  const isCompleted = req.query.completed;

  if (isCompleted !== "true" && isCompleted !== "false") {
    return res.status(400).json({ error: "El parámetro 'completed' debe ser 'true' o 'false'" });
  }

  next();
}

// Listar todas las tareas - Ruta GET
router.get("/", (req, res) => {
  res.json(listTasks());
});

// Listar las tareas completas e incompletas - Ruta GET
router.get("/status", validateCompletedParam, (req, res) => {
  const isCompleted = req.query.completed === "true";

  const filteredTasks = tasks.filter((task) => task.completed === isCompleted);

  if (filteredTasks.length === 0) {
    if (isCompleted) {
      res.status(404).json({ error: "No hay tareas completadas" });
    } else {
      res.status(404).json({ error: "No hay tareas incompletas" });
    }
  } else {
    res.json(filteredTasks);
  }
});

// Obtener una sola tarea por ID - Ruta GET
router.get("/:id", (req, res) => {
  const taskId = req.params.id;
  const task = tasks.find((task) => task.id === taskId);

  if (!task) {
    res.status(404).json({ error: "Tarea no encontrada" });
  } else {
    res.json(task);
  }
});

module.exports = router;
