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

  if (isDataInDb) {
    // Si hay datos en la base de datos, obtenerlos desde allí junto con sus actividades asociadas.
    const countriesFromDB = await Country.findAll({
      include: {
        model: Activity,
        through: { attributes: [] } // Excluimos los campos de la tabla de relación
      }
    });
    return countriesFromDB;
  } else {
    // Si no hay datos en la base de datos, obtenerlos desde la API y almacenarlos en la base de datos.
    const apiUrl = "http://localhost:5000/countries";
    const response = await axios.get(apiUrl);

    const formattedData = response.data.map(formatCountryData);
    await Country.bulkCreate(formattedData);

    return formattedData;
  }
};


const getCountryByIdFromDb = async (id) => {
  const upperCaseId = id.toUpperCase();

  const country = await Country.findOne({
    where: { id: upperCaseId },
    include: {
      model: Activity,
      through: { attributes: [] }
    }
  });

  return country;
};


const searchCountryByName = async (name) => {
  const countries = await Country.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
    include: {
      model: Activity,
      through: { attributes: [] }
    }
  });

  return countries;
};


const createActivity = async (name, difficulty, duration, season, countries) => {
  // Crear la actividad turística en la base de datos
  const activity = await Activity.create({ name, difficulty, duration, season });

  // Relacionar la actividad con los países indicados
  if (countries && countries.length > 0) {
    const validCountryIds = countries.map(countryId => countryId.toUpperCase()); // Asegurarnos de que los códigos de país estén en mayúsculas

    const countriesFound = await Country.findAll({
      where: { id: validCountryIds },
    });

    console.log("Valid Country IDs:", validCountryIds);
    console.log("Countries Found:", countriesFound);

    await activity.setCountries(countriesFound); // Relacionar la actividad con los países encontrados en la base de datos
    console.log(countriesFound);
  }

  return activity;
};





const getAllActivities = async () => {
  const activities = await Activity.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  });

  return activities;
};



module.exports = { getAllInfo, getCountryByIdFromDb, searchCountryByName, createActivity, getAllActivities };