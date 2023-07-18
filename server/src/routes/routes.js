const { Router } = require("express");

const routes = Router();


routes.get("/", (req, res) => {
    res.status(200).send("Estoy en la ruta GET que trae todos los paises con su respectiva info")
});

routes.get("/country/:idPais", (req, res) => {
    res.status(200).send("Estoy en la ruta GET que trae un país por ID (params) con su respectiva info")
});

routes.get("/country", (req, res) => {
    res.status(200).send("Estoy en la ruta GET que trae un país por name (query) con su respectiva info")
});

routes.post("/activities", (req, res) => {
    res.status(200).send("Estoy en la ruta POST que crea una actividad turística y la relaciona con los países solicitados")
});

routes.get("/activities", (req, res) => {
    res.status(200).send("Estoy en la ruta GET que trae todas las actividades")
});

module.exports = routes;