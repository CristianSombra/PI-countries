import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, byActivityOrder } from "../../redux/actions";
import { useAlfabeticOrderHandlers, usePopulationOrderHandlers, useContinentOrderHandlers, useActivityHandler } from "../../components/handlers/handlers";

import SearchBar from "../../components/searchbar/searchbar"; // Importa la SearchBar
import Card from "../../components/card/card";
import styles from "./home.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);
  const allActivities = useSelector((state) => state.allActivities);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [orderName, setOrderName] = useState("asc");
  const [orderPopulation, setOrderPopulation] = useState("asc");
  const [selectedContinent, setSelectedContinent] = useState("All"); // Agrega este estado
  const [selectedActivity, setSelectedActivity] = useState("All"); // Agrega este estado

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  const { handlerAlfabeticOrderAsc, handlerAlfabeticOrderDesc } = useAlfabeticOrderHandlers();
  const { handlerPopulationOrderAsc, handlerPopulationOrderDesc } = usePopulationOrderHandlers();
  const { handlerContinentOrder } = useContinentOrderHandlers();
  const { order, handleActivityChange } = useActivityHandler();
  
  const countriesPerPage = 10;
  const totalPages = Math.ceil(allCountries.length / countriesPerPage);
  const startIndex = (currentPage - 1) * countriesPerPage;
  const endIndex = startIndex + countriesPerPage;
  
  useEffect(() => {
    dispatch(byActivityOrder(order));
  }, [dispatch, order]);

  
  return (
    <div className={styles.homeContainer}>
      <SearchBar className={styles.searchBar} />
      <div className={styles.filterButtonsContainer}>
        <div className={styles.filterContainer}>
          <div className={styles.filterOptions}>
            <select
              value={selectedContinent} // Usa el valor del estado para establecer la selección
              onChange={(e) => {
                handlerContinentOrder(e.target.value);
                setSelectedContinent('All'); // Restablece el valor a la opción predeterminada
              }}
            >
              <option value='All'>Filtrar por continente</option>
              <option value='Africa'>Africa</option>
              <option value='Antarctic'>Antarctic</option>
              <option value='Asia'>Asia</option>
              <option value='Europe'>Europa</option>
              <option value='Americas'>America</option>
              <option value='Oceania'>Oceania</option>
            </select>
          </div>
        </div>
        <div className={styles.filterContainer}>
          <div className={styles.filterOptions}>
            <select
              value={selectedActivity} // Usa el valor del estado para establecer la selección
              onChange={(e) => {
                handleActivityChange(e.target.value);
                setSelectedActivity('All'); // Restablece el valor a la opción predeterminada
              }}
            >
              <option value="All">Filtrar por actividad turística</option>
              {allActivities.map((activity) => (
                <option value={activity} key={activity}>
                  {activity}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className={styles.buttonsContainer}>
        <button
          onClick={handlerAlfabeticOrderAsc}
          className={`${orderName === "asc" ? styles.activeButton : ""} ${styles.orderButton}`}
        >
          Ascendente por Nombre
        </button>
        <button
          onClick={handlerAlfabeticOrderDesc}
          className={`${orderName === "desc" ? styles.activeButton : ""} ${styles.orderButton}`}
        >
          Descendente por Nombre
        </button>
        <button
          onClick={() => {
            handlerPopulationOrderAsc();
            setOrderPopulation("asc");
          }}
          className={`${orderPopulation === "asc" ? styles.activeButton : ""} ${styles.orderButton}`}
        >
          Ascendente por cantidad de población
        </button>
        <button
          onClick={() => {
            handlerPopulationOrderDesc();
            setOrderPopulation("desc");
          }}
          className={`${orderPopulation === "desc" ? styles.activeButton : ""} ${styles.orderButton}`}
        >
          Descendente por cantidad de población
        </button>
      </div>
      <div className={styles.cardsContainer}>
        {allCountries &&
          allCountries
            .slice(startIndex, endIndex)
            .map((country) => (
              <Card
                key={country.id}
                id={country.id}
                name={country.name}
                image={country.image}
                continent={country.continent}
                showDetails={false}
              />
            ))}
      </div>
      <div className={styles.paginatorContainer}>
        <div className={styles.pagination}>
          <div className={styles.paginationButton}>
            <button
              className={`${styles.button} ${styles.anterior}`}
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
          </div>
          <div className={styles.paginationInfo}>
            Página {currentPage} de {totalPages}
          </div>
          <div className={styles.paginationButton}>
            <button
              className={`${styles.button} ${styles.siguiente}`}
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  );  
};  