import axios from "axios";


//Después modularizar las constantes de a continuación:
export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_COUNTRY_BY_NAME = "GET_COUNTRY_BY_NAME";
export const GET_BY_ALFABETIC_ORDER = "GET_BY_ALFABETIC_ORDER";
export const GET_BY_POPULATION_ORDER = "GET_BY_POPULATION_ORDER";
export const GET_BY_CONTINENT_ORDER = "GET_BY_CONTINENT_ORDER"
export const GET_BY_ACTIVITY_ORDER = "GET_BY_ACTIVITY_ORDER";



export const getCountries = () => {
    return async function (dispatch) {
        const apiData = await axios.get(
            "http://localhost:3001"
        );
    const countries = apiData.data;
    dispatch({type: GET_COUNTRIES, payload: countries})
    }; 
};



export const searchCountryByName = (name) => {
    return async function (dispatch) {
        const apiData = await axios.get(
            `http://localhost:3001/country?name=${name}`
        );

        const countries = apiData.data;
        dispatch({ type:  GET_COUNTRY_BY_NAME, payload: countries });
    };
};


export function byAlfabeticOrder(payload) {
    return {
        type: GET_BY_ALFABETIC_ORDER,
        payload
    }
};

export function byPopulationOrder(payload) {
    return {
        type: GET_BY_POPULATION_ORDER,
        payload
    }
};

export function byContinentOrder(payload) {
    return {
        type: GET_BY_CONTINENT_ORDER,
        payload
    }
};

export const byActivityOrder = (activityName) => ({
    type: GET_BY_ACTIVITY_ORDER,
    payload: activityName,
  });