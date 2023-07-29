import axios from "axios";

export const GET_COUNTRIES = "GET_COUNTRIES"

export const getCountries = () => {
    return async function (dispatch) {
        const apiData = await axios.get("http://localhost:3001");

    const countries = apiData.data;
    dispatch({type: GET_COUNTRIES, payload: countries})
    }; 
};
