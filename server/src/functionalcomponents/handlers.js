


const getAllHandler = (req, res) => {
    res.status(200).send("Estoy en la ruta GET que trae todos los paises con su respectiva info")
};
const getByIdHandler = (req, res) => {
    const { id } = req.params;
    console.log(id)
    res.send(`Esta ruta trae la info de id: ${id}`)
};

const getByNameHandler = (req, res) => {
    const { name } = req.query;
    console.log(name)
    res.send(`Esta ruta trae la info de Persona: ${name}`)
};

const postActivitiesHandler = (req, res) => {
    const {pais, clima, economia} = req.body;
    res.send(`Estos son los datos a subir:
        pais:${pais},
        clima:${clima},
        economia:${economia}
    `)
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