const { Router } = require("express");
const { getAllHandler, getByIdHandler, getByNameHandler, postActivitiesHandler, getActivitiesHandler} = require("../functionalcomponents/handlers");

const routes = Router();


routes.get("/", getAllHandler);

routes.get("/country/:idPais", getByIdHandler);

routes.get("/country", getByNameHandler);

routes.post("/activities", postActivitiesHandler);

routes.get("/activities", getActivitiesHandler);

module.exports = routes;