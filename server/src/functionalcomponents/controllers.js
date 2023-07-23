const { Country, Activity } = require("../db");
const { Op } = require("sequelize");
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

  if (isDataInDb) { // Si hay datos en la base de datos, obtenerlos desde allí.
    const countriesFromDB = await Country.findAll();
    return countriesFromDB;
  } else { // Si no hay datos en la base de datos, obtenerlos desde la API.
    const apiUrl = "http://localhost:5000/countries";
    const response = await axios.get(apiUrl);

    
    const formattedData = response.data.map(formatCountryData); // Formatear los datos de los países.

    await Country.bulkCreate(formattedData); // Almacenar los países en la base de datos.

    return formattedData;
  }
};


const getCountryByIdFromDb = async (id) => {

  const upperCaseId = id.toUpperCase(); // Convertir el ID a mayúsculas

  // Buscar el país por su ID en la base de datos (insensible a mayúsculas o minúsculas)
  const country = await Country.findOne({
    where: { id: upperCaseId },
  });

  return country; // Retornar el país encontrado o null si no se encuentra
};


const searchCountryByName = async (name) => {
  // Buscar países en la base de datos que coincidan con el nombre proporcionado, de forma insensible a mayúsculas o minúsculas
  const countries = await Country.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
  });

  return countries;
};


const createActivity = async (name, difficulty, duration, season, countries) => {
  // Crear la actividad turística en la base de datos
  let activity = await Activity.create({ name, difficulty, duration, season });

  // Relacionar la actividad con los países indicados
  if (countries && countries.length > 0) {
    await activity.setCountries(countries);
  }

  return activity;
};





module.exports = { getAllInfo, getCountryByIdFromDb, searchCountryByName, createActivity };