import {
  GET_COUNTRIES,
  GET_BY_ALFABETIC_ORDER,
  GET_BY_POPULATION_ORDER,
  GET_BY_CONTINENT_ORDER,
  GET_BY_ACTIVITY_ORDER,
  GET_COUNTRY_BY_NAME,
  GET_DETAIL_BY_ID,
  SET_CONTINENT,
} from "./actions";

const initialState = {
  countries: [],
  allContinents: [],
  allActivities: [], // Agrega la propiedad allActivities al estado inicial
  filteredCountries: [], // Nuevo campo para almacenar los países filtrados
  selectedCountry: null, // Nuevo campo para almacenar el país seleccionado por su nombre
};

// // Función auxiliar para obtener todas las actividades únicas de los países
const getAllActivities = (countries) => {
  const allActivitiesSet = new Set();
  countries.forEach((country) => {
    country.activities.forEach((activity) => {
      allActivitiesSet.add(activity.name);
    });
  });
  const allActivitiesArray = Array.from(allActivitiesSet);
  return allActivitiesArray;
};



const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        allContinents: action.payload,
        allActivities: getAllActivities(action.payload), // Actualiza allActivities con todas las actividades
      };

    case GET_BY_ALFABETIC_ORDER:
      const orderCountries = action.payload === "asc"
        ? [...state.countries].sort((a, b) => a.name.localeCompare(b.name))
        : [...state.countries].sort((a, b) => b.name.localeCompare(a.name));

      return {
        ...state,
        countries: orderCountries,
      };

    case GET_BY_POPULATION_ORDER:
      const orderPopulation = action.payload === 'asc'
        ? [...state.countries].sort((a, b) => a.population - b.population)
        : [...state.countries].sort((a, b) => b.population - a.population);

      return {
        ...state,
        countries: orderPopulation,
      };

    case GET_BY_CONTINENT_ORDER:
      if (action.payload === 'All') {
        return {
          ...state,
          countries: state.allContinents, // Muestra todos los países almacenados en allContinents
        };
      }

      const filteredCountriesByContinent = state.allContinents.filter((country) => country.continent === action.payload);
      return {
        ...state,
        countries: filteredCountriesByContinent, // Muestra los países filtrados por continente
      };

      case GET_BY_ACTIVITY_ORDER:
        const { activityName, order } = action.payload;
      
        if (activityName === "All") {
          return {
            ...state,
            countries: state.allContinents,
          };
        }
      
        const filteredCountriesByActivity = state.allContinents.filter((country) => {
          const activities = country.activities || [];
          return activities.some((activity) =>
            activity.name.toLowerCase() === activityName.toLowerCase()
          );
        });
      
        // Aplicar orden si está definido
        const orderedCountries = order === "asc"
          ? filteredCountriesByActivity.sort((a, b) => a.name.localeCompare(b.name))
          : filteredCountriesByActivity.sort((a, b) => b.name.localeCompare(a.name));
      
        return {
          ...state,
          countries: orderedCountries,
        };
      

  
        case GET_COUNTRY_BY_NAME:
          return {
            ...state,
            countries: action.payload, // Actualizamos los países con la respuesta de la búsqueda
          };

          case GET_DETAIL_BY_ID:
            return {
              ...state,
              details: action.payload,
              loading: false
            };
          case SET_CONTINENT:
            return {
              ...state,
              continent: action.payload
              }
          
        default:
          return state;
      }
    };
  


export default rootReducer;
