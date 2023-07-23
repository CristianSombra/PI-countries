const { Router } = require("express");
const { getAllCountriesHandler, getByIdHandler, getByNameHandler, postActivitiesHandler, getActivitiesHandler} = require("../functionalcomponents/handlers");

const routes = Router();


routes.get("/", getAllCountriesHandler);

routes.get("/country/:id", getByIdHandler);

routes.get("/country", getByNameHandler);

routes.post("/activities", postActivitiesHandler);

routes.get("/activities", getActivitiesHandler);

module.exports = routes;