import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom"; // Importamos useParams

const Detail = () => {
  const { id } = useParams(); // Obtenemos el parámetro 'id' de la URL
  const country = useSelector((state) =>
    state.countries.find((country) => country.id === id)
  );

  if (!country) {
    return <p>No se encontró información para el país seleccionado.</p>;
  }

  return (
    <div>
      <h2>Detalle del país: {country.name}</h2>
      <p>Continente: {country.continent}</p>
      <p>Población: {country.population}</p>
      <p>Capital: {country.capital}</p>

      <h3>Actividades Turísticas:</h3>
      {country.activities.map((activity) => (
        <div key={activity.id}>
          <p>Nombre: {activity.name}</p>
          <p>Dificultad: {activity.difficulty}</p>
          <p>Duración: {activity.duration}</p>
        </div>
      ))}

      <Link to="/Home">Volver a Home</Link> {/* Cambiamos el enlace a "/Home" */}
    </div>
  );
};

export default Detail;
