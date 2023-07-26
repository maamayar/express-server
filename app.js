const express = require("express")
const app = express();
const port = 4000;

// array - almacenará tareas
const tasks = []; 

// solicitudes - json
app.use(express.json());

// Muestra la lista de tareas 
app.get("/tasks", (req, res) => {
    res.json(tasks);
})

// Mostrar una tarea con  params 
app.get("/tasks/:id/:description/:completed", (req, res) => {
    const id = req.params.id;
    const description = req.params.description;
    const completed = req.params.completed;

    res.json({id, description, completed})
})
    
// Agregar una tarea nueva: id y descripción 
app.post("/tasks", (req, res) => {
    const id = req.body.id;
    const description = req.body.description;

    if (!id || isNaN(id) || !description) {
        return res.status(400).json({ error: "Debe digitar un identificador numérico y una descripción válidos" });
    }

    const invalidTask = tasks.find((task) => task.id === id);
    if (invalidTask) {
        return res.status(404).json({ error: "Identificador numérico repetido" });
    }

    const task = {
        id,
        description,
        completed: false
    };
    tasks.push(task);

    res.json({ mensaje: "Tarea agregada exitosamente" });
});

app.delete("/tasks/:id", (req, res) => {
    const id = req.params.id;
    const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex != -1) {
        tasks.splice(taskIndex, 1);
        return res.json({mensaje: "Tarea eliminada correctamente"});
    }
    res.status(404).json({ error: "No es posible eliminar la tarea, ya que no existen tareas que coincidan con el identificador numérico suministrado.Intentelo nuevamente."});

});

app.put("/tasks/:id", (req, res) => {
    const id = req.params.id;
    const task = tasks.find((task) => task.id === id);
    if (task) {
        task.completed = true;
        return res.json({mensaje: "Tarea completada "});
    }
    res.status(404).json({error: "No es posible completar la tareas, ya que ninguna tarea coincide con el identificador númerico  suministrado. Intentelo nuevamente."})
})

app.listen(port, () => {
    console.log("Servidor corriendo en puerto", `${port}`)
})




