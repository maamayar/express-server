const express = require("express");
const app = express();
const port = 3030;
// Modulos de enrutamiento 
const listViewRouter = require("./list-view-router");
const listEditRouter = require("./list-edit-router");
// Importar dotenv
require("dotenv").config();

//Importar libreria jwt
const jwt = require("jsonwebtoken");

// Importar variable de entorno secreto
const secretKey = process.env.JWT_SECRET;

// Usuarios predefinidos (solo como ejemplo, usa una base de datos en producción)
const users = [
    { id: 1, username: "user1", password: "pass1" },
    { id: 2, username: "user2", password: "pass2" },
  ];

// Solicitudes - JSON
app.use(express.json());

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

//Middleware para validar el token
const authToken = (req, res, next) => {
    const headerToken = req.headers.authorization;

    // Verficiar que la solicitud tenga token
    if(!headerToken) {
        return res.status(401).json({error: "No se proporcionó ningún token"});
    }

    /**Utilizar el método jwt.verify para verificar la validez del token utilizando el secreto.
     * Si el token es válido, el ID del usuario se agrega al objeto "req" para poder ser utilizado en las rutas protegidas
     */
    jwt.verify(headerToken, secretKey, (error, decoded) => {
        if (error) {
            return res.status(403).json({error: "Token inválido o faltante. Intentalo nuevamente"});
        }

        // El id del usuario se agrega al objeto "req" para poder ser utilizado en las rutas protegidas
        req.userId = decoded.id;
        next();
    });
}
// Crear Ruta de inición de sesión con POST login
app.post("/login", (req, res) => {
    const {username, password} = req.body;

    // Verificar si el usuario existe y si las credenciales son correctas
    const user = users.find(
        (user) => user.username === username && user.password === password
    );

    if (!user) {
        return res.status(401).json({ error: "Credenciales inválida, asegurate que sea la correcta. Intentalo nuevamente"});
    }

    // Crear el token JWT con la información del usuario
    const token = jwt.sign({ id: user.id }, secretKey);

    // Devolver el token en la respuesta
    res.json({ token });
});

// Ruta protegida
app.get("/protected", authToken, (req, res) => {
    // Obtener el id del usuario desde el token verificado
    const userId = req.userId;

    // Realizar alguna operación protegida 
    res.json({message: "Ruta protegida alcanzada", userId});
});



// Usar  el middleware de validación de métodos HTTP en todas las rutas
app.use(validateHTTPMethod);

// Registrar módulos de enrutamiento
app.use("/tasks", listViewRouter);
app.use("/tasks", listEditRouter);

// Aplicar middleware de manejo global de errores a todas las rutas
app.use(errorHandler);


app.listen(port, () => {
    console.log("Servidor corriendo en puerto 3030", `${port}`);
});
