import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountries, byAlfabeticOrder, byPopulationOrder, byContinentOrder, byActivityOrder, createActivity } from "../../redux/actions";


//Handlers de Home
export function getCountriesHandler() {
  const dispatch = useDispatch();

  async function getCountriesData() {
    try {
      await dispatch(getCountries());
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  }
  return getCountriesData;
}


export function useReloadCountriesHandler() {
  const dispatch = useDispatch();

  function handlerClick() {
    dispatch(getCountries());
  }
  return handlerClick;
}


export function useAlfabeticOrderHandlers() {
  const dispatch = useDispatch();

  function handlerAlfabeticOrderAsc() {
    dispatch(byAlfabeticOrder("asc"));
  }

  function handlerAlfabeticOrderDesc() {
    dispatch(byAlfabeticOrder("desc"));
  }

  return {
    handlerAlfabeticOrderAsc,
    handlerAlfabeticOrderDesc,
  };
}


export function usePopulationOrderHandlers() {
  const dispatch = useDispatch();

  function handlerPopulationOrderAsc() {
    dispatch(byPopulationOrder("asc"));
  }

  function handlerPopulationOrderDesc() {
    dispatch(byPopulationOrder("desc"));
  }

  return {
    handlerPopulationOrderAsc,
    handlerPopulationOrderDesc,
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




//Handlres de Form:


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