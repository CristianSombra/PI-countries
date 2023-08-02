import axios from "axios";


//Después modularizar las constantes de a continuación:
export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_BY_ALFABETIC_ORDER = "GET_BY_ALFABETIC_ORDER";




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