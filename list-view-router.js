const express = require("express");
const router = express.Router();
const {listTask, tasks} = require("./objects")

// Muestra - tareas existentes
router.get("/", (req, res) => {
    res.json(listTask());
})

//Ruta - lista de tareas completas con params
router.get("/completed/:completed", (req, res) => {
    const completed = req.params.completed;
    if (completed === "true") {
        const completedTasks = tasks.filter((task) => task.completed);
        if (completedTasks.length === 0) {
            res.status(404).json({error: "Por momento, ninguna tarea está completa"});
        } else {
            res.json(completedTasks);
        }
    } else {
        res.status(400).json({ error: "La ruta no es válida" });
    }
});

//Ruta - lista de tareas incompletas con Params
router.get("/incompleted/:incompleted", (req, res) => {
    const incompleted = req.params.incompleted;
    if(incompleted === "true") {
        const incompleteTasks = tasks.filter((task) => !task.completed);
        res.json(incompleteTasks);
    } else {
        res.status(400).json({error: "Ruta inválida"})
    }

})
module.exports = router;


