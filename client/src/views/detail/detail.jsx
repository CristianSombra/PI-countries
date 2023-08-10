import React from "react";
import styles from "./detail.module.css"
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();
  const country = useSelector((state) =>
    state.countries.find((country) => country.id === id)
  );

  if (!country) {
    return <p>No se encontró información para el país seleccionado.</p>;
  }

  return (
    <div className={styles.card}>
      <h1>Detalle del país</h1>
      <img src={country.image} className={styles.flagImage} />
      <p>ID: {country.id}</p>
      <p>Nombre: {country.name}</p>
      <p>Capital: {country.capital}</p>
      <p>Continente: {country.continent}</p>
      <p>Subregion: {country.subregion}</p>
      <p>Area: {country.area}</p>
      <p>Población: {country.population}</p>

      <h3>Actividades Turísticas:</h3>
      {country.activities.map((activity) => (
        <div key={activity.id}>
          <p>Nombre: {activity.name}</p>
          <p>Dificultad: {activity.difficulty}</p>
          <p>Duración: {activity.duration}</p>
          <p>Estación: {activity.season}</p>
        </div>
      ))}

      {/* Botón "Volver a Home" fuera del contenedor de la tarjeta */}
      <div className={styles.goHome}>
        <Link to="/Home">Volver a Home</Link>
      </div>
    </div>
  );
};

export default Detail;
