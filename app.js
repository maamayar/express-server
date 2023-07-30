const express = require("express");
const app = express();
const port = 3030;
const listViewRouter = require("./list-view-router");
const listEditRouter = require("./list-edit-router");

// Middleware para validar los métodos HTTP permitidos
function validateHTTPMethod(req, res, next) {
    const validMethods = ["GET", "POST", "DELETE"];
    const method = req.method.toUpperCase();

    if (!validMethods.includes(method)) {
        return res.status(405).json({ error: "Método HTTP no permitido. Intentelo nuevamente." });
    }

    next();
}

// Middleware para manejo global de errores
const errorHandler = (error, req, res, next) => {
    console.error(error);
    res.status(500).json({ error: "Error desconocido del servidor." });
};

// Solicitudes - JSON
app.use(express.json());

// Usar  el middleware de validación de métodos HTTP en todas las rutas
app.use(validateHTTPMethod);

// Registrar módulos de enrutamiento
app.use("/tasks", listViewRouter);
app.use("/tasks", listEditRouter);

// Aplicar middleware de manejo global de errores a todas las rutas
app.use(errorHandler);


app.listen(port, () => {
    console.log("Servidor corriendo en puerto", `${port}`);
});
