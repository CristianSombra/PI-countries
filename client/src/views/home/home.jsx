import React, { useEffect, useState } from "react";
import Card from "../../components/card/card";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCountries } from "../../redux/actions";
import Paginator from "../../components/paginator/paginator";
import styles from "./home.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  function handlerClick(e) {
    e.preventDefault();
    dispatch(getCountries());
  }

  const countriesPerPage = 10;
  const totalPages = Math.ceil(allCountries.length / countriesPerPage);
  const startIndex = (currentPage - 1) * countriesPerPage;
  const endIndex = startIndex + countriesPerPage;

  return (
    <div>
      <Link to="/create">Crear actividad turística</Link>
      <h1>Esta es la vista de HOME</h1>
      <button onClick={(e) => handlerClick(e)}>Volver a cargar todos los paises</button>

      <div>
        <select>
          <option value="asc">Ascendente por Nombre</option>
          <option value="desc">Descendente por Nombre</option>
        </select>
        <select>
          <option value="asc">Ascendente por cantidad de población</option>
          <option value="desc">Descendente por cantidad de población</option>
        </select>
        <select>
          <option value="cont">Filtrar por continente</option>
          <option value="act">Filtrar por actividad turística</option>
        </select>
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
