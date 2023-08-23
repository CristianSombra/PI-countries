const { Country, Activity } = require("../db");
const { Op } = require("sequelize");
const axios = require("axios");


const checkDbCountries = async () => {
  const countries = await Country.findAll();
  return countries.length > 0;
};


const formatCountryData = (data) => {
  return {
    id: data.cca3,
    name: data.name.common,
    image: data.flags.png,
    continent: data.region,
    capital: data.capital != null ? data.capital[0] : "No data", 
    subregion: data.subregion,
    area: data.area,
    population: data.population,
  };
};


const getAllInfo = async () => {
  const isDataInDb = await checkDbCountries();

  if (isDataInDb) {
    const countriesFromDB = await Country.findAll({
      include: {
        model: Activity,
        through: { attributes: [] }
      }
    });
    return countriesFromDB;
  } else {
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
  const activity = await Activity.create({ name, difficulty, duration, season });

  if (countries && countries.length > 0) {
    const validCountryIds = countries.map(countryId => countryId.toUpperCase()); 
    const countriesFound = await Country.findAll({
      where: { id: validCountryIds },
    });

    await activity.setCountries(countriesFound); 
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