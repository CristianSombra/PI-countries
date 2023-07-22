const { getAllInfo, getCountryById, searchCountryByName, createActivity } = require("./controllers");


const getAllCountriesHandler = (req, res) => {
    const allCountries = getAllInfo()
    res.status(200).send(allCountries)
}


const getAllHandler = async (req, res) => {
  const { name } = req.query;
  const results = name ? searchCountryByName(name) : await getAllCountries()
  
    res.status(200).send(results)
};



const getByIdHandler = async (req, res) => {
    const { id } = req.params;
    console.log(id);
  
    try {
      const countryFromDb = await Country.findByPk(id);
      if (countryFromDb) {
        res.status(200).json(countryFromDb);
      } else {
        const countryFromApi = await getCountryById(id, 'api');
        if (countryFromApi) {
          res.status(200).json(countryFromApi);
        } else {
          res.status(404).json({ error: "Country not found" });
        }
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };



const getByNameHandler = (req, res) => {
    const { name } = req.query;
    console.log(name)
    res.send(`Esta ruta trae la info de Persona: ${name}`)
};

const postActivitiesHandler = async (req, res) => {
    const {name, difficulty, duration, season} = req.body;
    try {    
        const newActivity = await createActivity(name, difficulty, duration, season);
        res.status(200).json(newActivity)
    } catch (error) {
        res.status(400).json({error:error.message})
    };
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