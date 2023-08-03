import {
  GET_COUNTRIES,
  GET_BY_ALFABETIC_ORDER,
  GET_BY_POPULATION_ORDER,
  GET_BY_CONTINENT_ORDER,
  GET_BY_ACTIVITY_ORDER,
} from "./actions";

const initialState = {
  countries: [],
  allContinents: [],
  allActivities: [], // Agrega la propiedad allActivities al estado inicial
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COUNTRIES:
      // console.log("All activities:", getAllActivities(action.payload));
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
        if (action.payload === 'All') {
          return {
            ...state,
            countries: state.allContinents,
          };
        }
      
        const allActivities = state.allActivities;
        const activityFilter = allActivities.filter((activity) => {
          if (activity && activity.activities) { // Agregamos esta verificación aquí
            const foundActivity = activity.activities.find((a) => a.name && a.name.toLowerCase() === action.payload);
            return foundActivity;
          }
          return false;
        });
      
        const filteredCountriesByActivity = action.order.filter((country) => {
          return activityFilter.some((activity) => {
            if (country && country.activities) { // Y también aquí
              const foundActivity = country.activities.find((a) => a.name && a.name.toLowerCase() === activity.name.toLowerCase());
              return foundActivity;
            }
            return false;
          });
        });
      
        return {
          ...state,
          countries: filteredCountriesByActivity,
        };
      
    
      default:
        return state;
    }
  };
  

// Función auxiliar para obtener todas las actividades únicas de los países
const getAllActivities = (countries) => {
  const allActivitiesSet = new Set();
  countries.forEach((country) => {
    country.activities.forEach((activity) => {
      allActivitiesSet.add(activity.name);
    });
  });
  const allActivitiesArray = Array.from(allActivitiesSet);
  // console.log("All activities array:", allActivitiesArray);
  return allActivitiesArray;
};



export default rootReducer;
