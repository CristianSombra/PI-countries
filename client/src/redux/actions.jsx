import axios from "axios";

export const ERROR = "ERROR"
export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_COUNTRY_BY_NAME = "GET_COUNTRY_BY_NAME";
export const GET_DETAIL_BY_ID = "GET_DETAIL_BY_ID"
export const GET_BY_ALFABETIC_ORDER = "GET_BY_ALFABETIC_ORDER";
export const GET_BY_POPULATION_ORDER = "GET_BY_POPULATION_ORDER";
export const GET_BY_CONTINENT_ORDER = "GET_BY_CONTINENT_ORDER"
export const GET_BY_ACTIVITY_ORDER = "GET_BY_ACTIVITY_ORDER";
export const CREATE_ACTIVITY_SUCCESS = "CREATE_ACTIVITY_SUCCESS";


export const getCountries = () => {
    return async function (dispatch) {
    let errorMessage = '';
    
    try {
      const apiData = await axios.get("http://localhost:3001");
      const countries = apiData.data;
      dispatch({type: GET_COUNTRIES, payload: countries})
    } catch (error) {
      errorMessage = 'Error al obtener la información';
      dispatch({ type: ERROR, payload: errorMessage });
    }

    return errorMessage;
  };
};


export const searchCountryByName = (name) => {
    return async function (dispatch) {
      const apiData = await axios.get(`http://localhost:3001/country?name=${name}`);
      const countries = apiData.data;
      dispatch({ type:  GET_COUNTRY_BY_NAME, payload: countries });
    }
};


export const getDetail = (id) => {
  return async function (dispatch) {
    let errorMessage = '';

    try {
      dispatch({ type: LOADING });
      const res = await axios.get(`http://localhost:3001/country/${id}`);
      dispatch({ type: GET_DETAIL_BY_ID, payload: res.data });
    } catch (error) {
      errorMessage = 'Error al obtener la información';
      dispatch({ type: ERROR, payload: errorMessage });
    }

    return errorMessage;
  };
};

  export const createActivity = (payload) => {
    return async (dispatch) => {
      try {
        await axios.post('http://localhost:3001/activities', payload);
        dispatch({ type: CREATE_ACTIVITY_SUCCESS });
      } catch (error) {
        const errorMessage = 'Error al crear la actividad';
        dispatch({ type: ERROR, payload: errorMessage });
      }
    };
  };
  

export function byAlfabeticOrder(payload) {
    return { type: GET_BY_ALFABETIC_ORDER, payload }
};

export function byPopulationOrder(payload) {
    return { type: GET_BY_POPULATION_ORDER, payload }
};

export function byContinentOrder(payload) {
    return { type: GET_BY_CONTINENT_ORDER, payload }
};


export const byActivityOrder = (activityName, order) => {
    return { type: GET_BY_ACTIVITY_ORDER, payload: { activityName, order },
    };
};