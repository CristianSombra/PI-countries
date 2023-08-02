import axios from "axios";


//Después modularizar las constantes de a continuación:
export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_BY_ALFABETIC_ORDER = "GET_BY_ALFABETIC_ORDER";
export const GET_BY_POPULATION_ORDER = "GET_BY_POPULATION_ORDER";
export const GET_BY_CONTINENT_ORDER = "GET_BY_CONTINENT_ORDER"
export const GET_BY_ACTIVITY_ORDER = "GET_BY_ACTIVITY_ORDER"



export const getCountries = () => {
    return async function (dispatch) {
        const apiData = await axios.get(
            "http://localhost:3001"
        );
    const countries = apiData.data;
    dispatch({type: GET_COUNTRIES, payload: countries})
    }; 
};

// export const getCountry = (id) => {
//     return async function (dispatch) {
//         const apiData = await axios.get(
//             `http://localhost:3001/countries/${id}`
//         );

//         const country = apiData.data;
//         dispatch({type: GET_COUNTRY, payload: country})
//     };
// };


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

export function byActivityOrder(payload) {
    return {
        type: GET_BY_ACTIVITY_ORDER,
        payload
    }
};