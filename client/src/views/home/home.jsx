import React, { useEffect, useState } from "react";
import Card from "../../components/card/card";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCountries } from "../../redux/actions";
import { useReloadCountriesHandler, useAlfabeticOrderHandlers, usePopulationOrderHandlers, useContinentOrderHandlers, useActivityHandler } from "../../components/handlers/handlers";
import SearchBar from "../../components/searchbar/searchbar"; // Importa la SearchBar

import styles from "./home.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);
  const allActivities = useSelector((state) => state.allActivities);
  const [currentPage, setCurrentPage] = useState(1);
  const [orderName, setOrderName] = useState("asc");
  const [orderPopulation, setOrderPopulation] = useState("asc");


  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  const handlerClick = useReloadCountriesHandler();
  const { handlerAlfabeticOrderAsc, handlerAlfabeticOrderDesc } = useAlfabeticOrderHandlers();
  const { handlerPopulationOrderAsc, handlerPopulationOrderDesc } = usePopulationOrderHandlers();
  const { handlerContinentOrder } = useContinentOrderHandlers();
  const { order, handleActivityChange } = useActivityHandler();

  const countriesPerPage = 10;
  const totalPages = Math.ceil(allCountries.length / countriesPerPage);
  const startIndex = (currentPage - 1) * countriesPerPage;
  const endIndex = startIndex + countriesPerPage;


  return (
    <div>
      <Link to="/create">Crear actividad turística</Link>
      <h1>Esta es la vista de HOME</h1>
      <SearchBar />

      <button onClick={(e) => handlerClick(e)}>Volver a cargar todos los paises</button>


      <div>
        <button
          onClick={handlerAlfabeticOrderAsc}
          className={orderName === "asc" ? styles.activeButton : ""}
        >
          Ascendente por Nombre
        </button>
        <button
          onClick={handlerAlfabeticOrderDesc}
          className={orderName === "desc" ? styles.activeButton : ""}
        >
          Descendente por Nombre
        </button>
        <button
          onClick={() => {
            handlerPopulationOrderAsc();
            setOrderPopulation("asc");
          }}
          className={orderPopulation === "asc" ? styles.activeButton : ""}
        >
          Ascendente por cantidad de población
        </button>
        <button
          onClick={() => {
            handlerPopulationOrderDesc();
            setOrderPopulation("desc");
          }}
          className={orderPopulation === "desc" ? styles.activeButton : ""}
        >
          Descendente por cantidad de población
        </button>

        <div className={styles.filter}>
          <select onChange={(e) => handlerContinentOrder(e.target.value)}>
            <option value='All' key='All'>All continents</option>
            <option value='Africa' key='Africa'>Africa</option>
            <option value='Antarctic'>Antarctic</option>
            <option value='Asia' key='Asia'>Asia</option>
            <option value='Europe' key='Europe'>Europa</option>
            <option value='Americas' key='Americas'>America</option>
            <option value='Oceania' key='Oceania'>Oceania</option>
          </select>
        </div>

        <div className={styles.filter}>
        <select onChange={(e) => handleActivityChange(e.target.value)}>
          <option value="All">Filtrar por actividad turística</option>
          {allActivities.map((activity) => (
            <option value={activity} key={activity}>
              {activity}
            </option>
          ))}
        </select>
      </div>
      </div>

      <div className={styles.cardsContainer}>
        {allCountries &&
          allCountries
            .slice(startIndex, endIndex)
            .map((country) => (
              <Card
                key={country.id}
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
}

