const express = require("express");
const app = express();
const session = require("express-session");
const cors = require("cors");

app.use(express.json());

// Conectar con el frontend
app.use(
  cors({
    origin: ["http://localhost:5173"], //puerto en donde react se aloja
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// abrir el servidor
app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});

module.exports = app;