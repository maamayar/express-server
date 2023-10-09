const express = require("express");
const router = express.Router();
const { tasks, Task, addTask, findTaskById, deleteTask, completeTask } = require("./objects");

// Obtener todas las tareas
router.get("/", (req, res) => {
  res.json(tasks);
});

// Crear una nueva tarea
router.post("/", (req, res) => {
  const { id, description } = req.body;

  if (!id || isNaN(id) || !description) {
    return res.status(400).json({ error: "Solicitud inválida. Debe proporcionar un id que no exista o agregar una descripción." });
  }

  if (findTaskById(id)) {
    return res.status(400).json({ error: "Identificador numérico inválido. No puedes utilizar un número para el id que ya exista." });
  }

  const task = new Task(id, description, false);
  addTask(task);

  res.status(201).json({ mensaje: "Tarea agregada correctamente", tarea: task });
});

// Actualizar una tarea por id
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const task = findTaskById(id);

  if (!task) {
    return res.status(404).json({ error: "No se puede encontrar la tarea. El identificador numérico proporcionado no coincide con ninguna tarea existente." });
  }

  task.description = req.body.description || task.description;
  task.completed = req.body.completed || task.completed;

  res.json({ mensaje: "Tarea actualizada correctamente", tarea: task });
});

// Eliminar una tarea por id
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const task = findTaskById(id);

  if (!task) {
    return res.status(404).json({ error: "No se puede encontrar la tarea. El identificador numérico proporcionado no coincide con ninguna tarea existente." });
  }

  deleteTask(id);
  res.json({ mensaje: "Tarea eliminada exitosamente" });
});

module.exports = router;
