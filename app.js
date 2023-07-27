const express = require("express")
const app = express();
const port = 3030;
const listViewRouter = require("./list-view-router");
const listEditRouter = require("./list-edit-router");

// solicitudes - json
app.use(express.json());

// Registrar módulos de enrutamiento
app.use("/tasks", listViewRouter);
app.use("/tasks", listEditRouter);

app.listen(port, () => {
    console.log("Servidor corriendo en puerto", `${port}`)
})




