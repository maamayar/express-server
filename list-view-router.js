const express = require("express");
const router = express.Router();
const {listTask, tasks} = require("./objects")


// Middleware para validar el parámetro 'completed'
function validateCompletedParam(req, res, next) {
    const isCompleted = req.query.completed;

    if (isCompleted !== "true" && isCompleted !== "false") {
        return res.status(400).json({ error: "El parámetro 'completed' debe ser 'true' o 'false'" });
    }

    next();
}
// Muestra - tareas existentes en la ruta- GET
router.get("/", (req, res) => {
    res.json(listTask());
})

// Ruta - Filtrar lista de tareas por estado (completadas o incompletas)
router.get("/status",validateCompletedParam, (req, res) => {
    const isCompleted = req.query.completed; // El valor de 'completed' se recibe como un parámetro de consulta

    if (isCompleted === "true") {
        const completedTasks = tasks.filter((task) => task.completed);
        if (completedTasks.length === 0) {
            res.status(404).json({ error: "Por el momento, ninguna tarea está completa" });
        } else {
            res.json(completedTasks);
        }
    } else if (isCompleted === "false") {
        const incompleteTasks = tasks.filter((task) => !task.completed);
        if (incompleteTasks.length === 0) {
            res.status(404).json({ error: "Todas las tareas están completadas" });
        } else {
            res.json(incompleteTasks);
        }
    } 
});
module.exports = router;