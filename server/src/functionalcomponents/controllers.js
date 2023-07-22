const { Country, Activity } = require("../db");
const axios = require("axios");

const checkDbCountries = async () => {
  const countries = await Country.findAll();
  return countries.length > 0; // Devuelve true si hay países en la base de datos, false si está vacía.
};


// Función auxiliar para formatear los datos del país.
const formatCountryData = (data) => {
  return {
    id: data.cca3,
    name: data.name.common,
    image: data.flags.png,
    continent: data.region,
    capital: data.capital != null ? data.capital[0] : "No data", // Valor predeterminado si no hay capital definida
    subregion: data.subregion,
    area: data.area,
    population: data.population,
  };
};

const getAllInfo = async () => {
  const isDataInDb = await checkDbCountries();

  if (isDataInDb) {
    // Si hay datos en la base de datos, obtenerlos desde allí.
    const countriesFromDB = await Country.findAll();
    return countriesFromDB;
  } else {
    // Si no hay datos en la base de datos, obtenerlos desde la API.
    const apiUrl = "http://localhost:5000/countries";
    const response = await axios.get(apiUrl);

    // Formatear los datos de los países.
    const formattedData = response.data.map(formatCountryData);

    // Almacenar los países en la base de datos.
    await Country.bulkCreate(formattedData);

    return formattedData;
  }
};



const searchCountryByName = () => {}






// const getCountryById = async (id, source) => {
//     const country = source === "api" 
//     ? (await axios.get(`http://localhost:5000/countries/${(id)}`)).data 
//     : await Country.findByPk(id)

//     return country;
// }

  const getCountryByIdFromDatabase = async (id) => {
    return await Country.findByPk(id);
  };
  
  const getCountryById = async (id) => {
    let country = await getCountryByIdFromDatabase(id);
    
    if (!country) {
      country = await getCountryByIdFromApi(id);
    }
    
    return country;
  };


const createActivity = async (name, difficulty, duration, season) => 
    await Activity.create({name, difficulty, duration, season});




module.exports = { getAllInfo, searchCountryByName, getCountryById, createActivity };