import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchCountryByName, getCountries } from "../../redux/actions"; // Importa la acción getCountries
import styles from "./searchbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faRedo } from "@fortawesome/free-solid-svg-icons";
import { useReloadCountriesHandler } from "../handlers/handlers";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const dispatch = useDispatch();
  const handlerClick = useReloadCountriesHandler(); // Agrega el handler para recargar países

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    // Realizamos la búsqueda de países por nombre
    try {
      const apiData = await dispatch(searchCountryByName(searchQuery));

      // Verificamos si se encontraron resultados o no
      if (apiData && apiData.data && apiData.data.length === 0) {
        setNoResults(true); // Si no hay resultados, establecemos el estado 'noResults' a true
      } else {
        setNoResults(false); // Si hay resultados, establecemos el estado 'noResults' a false
      }
    } catch (error) {
      // Manejamos el error de la solicitud a la API
      console.log("Error al buscar país por nombre:", error);
      setNoResults(true); // Si ocurre un error, también establecemos 'noResults' a true
    }
  };

  const handleReloadCountries = async () => {
    // Realizar la lógica para recargar todos los países aquí
    // Por ejemplo, puedes llamar a la acción getCountries
    try {
      await dispatch(getCountries());
      handlerClick(); // Ejecuta el handler de recarga de países desde el contexto
      setNoResults(false); // Restablece el estado de noResults
    } catch (error) {
      console.log("Error al recargar países:", error);
    }
  };

  return (
    <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
      <div className={styles.searchBar}>
      <input
    className={styles.searchInput}
    type="text"
    placeholder="Buscar país por nombre..."
    value={searchQuery}
    onChange={handleInputChange}
  />


<div className={styles.searchButtonsContainer}>
    <button type="submit" className={styles.searchButton}>
      <FontAwesomeIcon icon={faSearch} />
    </button>
    <button type="button" onClick={handleReloadCountries} className={styles.reloadButton}>
      <FontAwesomeIcon icon={faRedo} />
    </button>
  </div>
</div>

      {noResults && <p>No se encontraron resultados de la búsqueda</p>}
    </form>
  );
};

export default SearchBar;
