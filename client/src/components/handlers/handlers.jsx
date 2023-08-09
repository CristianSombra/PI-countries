import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountries, byAlfabeticOrder, byPopulationOrder, byContinentOrder, byActivityOrder } from "../../redux/actions";

export function useReloadCountriesHandler() {
  const dispatch = useDispatch();

  function handlerClick(e) {
    e.preventDefault();
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

  function handlerContinentOrder(value) {
    dispatch(byContinentOrder(value));
  }

  return {
    handlerContinentOrder,
  };
}

export function useActivityHandler() {
  const dispatch = useDispatch();
  const [order, setOrder] = useState("All");

  function handleActivityChange(selectedActivity) {
    setOrder(selectedActivity);
    dispatch(byActivityOrder(selectedActivity)); // No es necesario pasar 'asc' como segundo argumento
  }

  return {
    order,
    handleActivityChange,
  };
}