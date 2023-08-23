import {
  ERROR,
  GET_COUNTRIES,
  GET_BY_ALFABETIC_ORDER,
  GET_BY_POPULATION_ORDER,
  GET_BY_CONTINENT_ORDER,
  GET_BY_ACTIVITY_ORDER,
  GET_COUNTRY_BY_NAME,
  GET_DETAIL_BY_ID,
  CREATE_ACTIVITY,
} from "./actions";

         
const initialState = {
            countries: [],
            allContinents: [],
            allActivities: [],
            filteredCountries: [],
            selectedCountry: null,
          };


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
              case ERROR:
                return {
                  ...state,
                  error: action.payload,
                }; 

              case GET_COUNTRIES:
                return {
                  ...state,
                  countries: action.payload,
                  allContinents: action.payload,
                  allActivities: getAllActivities(action.payload),
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
                    countries: state.allContinents,
                  };
                }

                const filteredCountriesByContinent = state.allContinents.filter((country) => country.continent === action.payload);
                return {
                  ...state,
                  countries: filteredCountriesByContinent,
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
                  countries: action.payload,
                };

              case GET_DETAIL_BY_ID:
                return {
                    ...state,
                    details: action.payload,
                    loading: false
                  };

                case CREATE_ACTIVITY:
                  return {
                  ...state,
                    creatingActivity: false,
                    createActivityError: null,
                      };
                
                    default:
                      return state;
              }
            };
  


export default rootReducer;
