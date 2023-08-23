import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountries, byAlfabeticOrder, byPopulationOrder, byContinentOrder, byActivityOrder, createActivity, searchCountryByName } from "../../redux/actions";


//HANDLERS DE SEARCHBAR

export function usehandlerSearchSubmit (setNoResults) {
  const dispatch = useDispatch();

  async function handlerSearchSubmit(e, searchQuery, onPageChange) {
    e.preventDefault();
  try {
    const apiData = await dispatch(searchCountryByName(searchQuery));
 
    if (apiData && apiData.data && apiData.data.length === 0) {
      setNoResults(true);
    } else {
      setNoResults(false);
      onPageChange(1);
    }
  } catch (error) {
   
    console.log("Error al buscar país por nombre:", error);
    setNoResults(true); 
  }
};

  return handlerSearchSubmit;
}

export function useReloadCountriesHandler() {
  const dispatch = useDispatch();

  function handlerClick() {
    dispatch(getCountries());
  }
  return handlerClick;
}



//HANDLERS DE HOME
export function getCountriesHandler() {
  const dispatch = useDispatch();

  async function getCountriesData() {
    try {
      await dispatch(getCountries());
    } catch (error) {
      console.error("Error al recargar países", error);
    }
  }
  return getCountriesData;
}


export function useAlfabeticOrderHandlers() {
  const dispatch = useDispatch();

  function alfabeticOrderAsc() {
    dispatch(byAlfabeticOrder("asc"));
  }

  function alfabeticOrderDesc() {
    dispatch(byAlfabeticOrder("desc"));
  }

  return {
    alfabeticOrderAsc,
    alfabeticOrderDesc,
  };
}


export function usePopulationOrderHandlers() {
  const dispatch = useDispatch();

  function populationOrderAsc() {
    dispatch(byPopulationOrder("asc"));
  }

  function populationOrderDesc() {
    dispatch(byPopulationOrder("desc"));
  }

  return {
    populationOrderAsc,
    populationOrderDesc,
  };
}


export function useContinentOrderHandlers() {
  const dispatch = useDispatch();

  function handlerContinentOrder(value, setCurrentPage) {
    dispatch(byContinentOrder(value));
    setCurrentPage(1)
  }

  return {
    handlerContinentOrder,
  };
}


export function useActivityHandler() {
  const dispatch = useDispatch();
  const [order, setOrder] = useState("All");

  function handlerActivityChange(selectedActivity, setCurrentPage) {
    setOrder(selectedActivity);
    dispatch(byActivityOrder(selectedActivity));
    setCurrentPage(1)
  }

  return {
    order,
    handlerActivityChange,
  };
}




//HANDLERS DE FORM:

export function InputChangeHandler(e, activity, setInputActivity) {
  setInputActivity({
    ...activity,
    [e.target.name]: e.target.name === 'duration' ? e.target.value.toString() : e.target.value,
  });
}


export function CreateActivityHandler() {
  const dispatch = useDispatch();

  async function handlerCreateActivity(payload) {
    try {
      await dispatch(createActivity(payload));
    } catch (error) {
      console.log("Error al crear la actividad:", error);

    }
  }

  return handlerCreateActivity;
}