const { getAllInfo, getCountryByIdFromDb, searchCountryByName, createActivity } = require("./controllers");


const getAllCountriesHandler = async (req, res) => {
  try {
    const allCountries = await getAllInfo();
    res.status(200).send(allCountries);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};


const getByIdHandler = async (req, res) => {
  const { id } = req.params;

  try { // Llamamos a la función para obtener el país por ID desde la base de datos
    const country = await getCountryByIdFromDb(id);

    if (!country) { 
      return res.status(404).json({ error: "País no encontrado" }); // Si no se encontró el país con el ID dado, devolvemos un mensaje de error
    }
      res.status(200).json(country); // Si se encontró el país, lo enviamos en la respuesta
  } catch (error) {
    // Si ocurre un error, lo manejamos y enviamos un mensaje de error en la respuesta
    console.error(error); // Muestra el error en la consola para fines de depuración
    res.status(500).json({ error: "Error al obtener el país por ID desde la base de datos" });
  }
};


const getByNameHandler = async (req, res) => {
  const { name } = req.query;

  try {
    // Llamamos a la función para buscar países por nombre
    const countries = await searchCountryByName(name);

    if (countries.length === 0) {
      return res.status(404).json({ error: "No se encontraron países con ese nombre" });
    }

    // Si se encontraron países, los enviamos en la respuesta
    res.status(200).json(countries);
  } catch (error) {
    console.error("Error al buscar países por nombre:", error);
    res.status(500).json({ error: "Ocurrió un error al buscar países por nombre" });
  }
};



const postActivitiesHandler = async (req, res) => {
  const { name, difficulty, duration, season, countries } = req.body;

  try {
    const newActivity = await createActivity(name, difficulty, duration, season, countries);
    res.status(200).json(newActivity);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getActivitiesHandler =(req, res) => {
    res.status(200).send("Estoy en la ruta GET que trae todas las actividades")
};


module.exports = {
    getAllCountriesHandler,
    getByIdHandler,
    getByNameHandler,
    postActivitiesHandler,
    getActivitiesHandler
}