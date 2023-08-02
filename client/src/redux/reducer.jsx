import { GET_COUNTRIES, GET_BY_ALFABETIC_ORDER, GET_BY_POPULATION_ORDER, GET_BY_CONTINENT_ORDER, GET_BY_ACTIVITY_ORDER } from "./actions";

const initialState = {
  countries: [],
  allContinents: [],
  allActivities: [], // Agrega la propiedad allActivities al estado inicial
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COUNTRIES:
      return { ...state, countries: action.payload, allContinents: action.payload, allActivities: action.payload }; // Actualiza allContinents y allActivities al obtener todos los países

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
    
      const filteredCountries = state.allContinents.filter((country) => country.continent === action.payload);
      return {
        ...state,
        countries: filteredCountries, // Muestra los países filtrados por continente
      };

    case GET_BY_ACTIVITY_ORDER:
      const allActivities = state.allActivities;
      const activityFilter = action.payload === 'All' ? allActivities.filter(e => e.activities.length > 0) :
          allActivities.filter(c => c.activities.find((element) => element.name.toLowerCase() === action.payload))
      return {
          ...state,
          countries: activityFilter
      };

    default:
      return state;
  }
};

export default rootReducer;
