const { getAllInfo, getCountryByIdFromDb, searchCountryByName, createActivity, getAllActivities  } = require("./controllers");


const getAllCountriesHandler = async (req, res) => {
  try {
    const allCountries = await getAllInfo();
    res.status(200).send(allCountries);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const getByIdHandler = async (req, res) => {
  const { id } = req.params;
    try {
      const country = await getCountryByIdFromDb(id);
      if (!country) { 
        return res.status(404).json({ error: "País no encontrado" });
      }
        res.status(200).json(country);
    } catch (error) { 
      res.status(500).json({ error: "Error al obtener el país por ID desde la base de datos" });
    }
};


const getByNameHandler = async (req, res) => {
  const { name } = req.query;

  try {
    const countries = await searchCountryByName(name);
    if (countries.length === 0) {
      return res.status(404).json({ error: "No se encontraron países con ese nombre" });
    }
    res.status(200).json(countries);
  } catch (error) {
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


const getActivitiesHandler = async (req, res) => {
  try {
    const activities = await getAllActivities();
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las actividades desde la base de datos" });
  }
};


module.exports = {
    getAllCountriesHandler,
    getByIdHandler,
    getByNameHandler,
    postActivitiesHandler,
    getActivitiesHandler
}