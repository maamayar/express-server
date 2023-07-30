const express = require("express");
const router = express.Router();
const {tasks, Task, addTask, repeateTask, deleteTask, completeTask} = require("./objects")

// Agregar una tarea nueva (id y descripción se envían en el cuerpo de la solicitud)
router.post("/", (req, res) => {
   const {id, description} = req.body;

    if (!id || isNaN(id) || !description) {
        return res.status(400).json({ error: "Inválido. Debe proporcionar un id que no exista o agregar una descripción, de lo contrario la tarea no será agregada. Intentelo nuevamente." });
    }

    if (repeateTask(id)) {
        return res.status(400).json({ error: "Identificacor numérico inválido, no puedes utilizar un número para el id que ya exista. Intentelo nuevamente." });
    }

    const task = new Task(id, description, false) 
    addTask(task)

    res.json({ mensaje: "Tarea agregada correctamente" });
});

// Eliminar tarea por id
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
        res.status(400).json({ error: "La tarea ya ha sido eliminada o no existe" });
    } else {
        tasks.splice(taskIndex, 1);
        res.json({ mensaje: "Tarea eliminada exitosamente" });
    }
});


// Completar tarea por id
router.put("/:id", (req, res) => {
    const id = req.params.id;
    const task = tasks.find((task) => task.id === id);
    if (task) {
        completeTask(task.id); 
        return res.json({ mensaje: "Tarea completada correctamente" });
    }
    res.status(404).json({ error: "No es posible completar la tarea, ya que ninguna tarea coincide con  el identificar númerico  suministrado. Intentelo nuevamente." });
});

module.exports = router;