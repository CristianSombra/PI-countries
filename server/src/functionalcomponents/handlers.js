


const getAllHandler = (req, res) => {
    res.status(200).send("Estoy en la ruta GET que trae todos los paises con su respectiva info")
};
const getByIdHandler = (req, res) => {
    res.status(200).send("Estoy en la ruta GET que trae un país por ID (params) con su respectiva info")
};

const getByNameHandler = (req, res) => {
    res.status(200).send("Estoy en la ruta GET que trae un país por name (query) con su respectiva info")
};

const postActivitiesHandler = (req, res) => {
    res.status(200).send("Estoy en la ruta POST que crea una actividad turística y la relaciona con los países solicitados")
};

const getActivitiesHandler =(req, res) => {
    res.status(200).send("Estoy en la ruta GET que trae todas las actividades")
};

module.exports = {
    getAllHandler,
    getByIdHandler,
    getByNameHandler,
    postActivitiesHandler,
    getActivitiesHandler
}