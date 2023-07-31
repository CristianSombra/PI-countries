import React from "react";
import style from "./card.module.css";

const Card = (props) => {
  // Asegurarnos de que props.activities sea un array válido, incluso si está undefined
  const activities = props.activities || [];

  return (
    <div className={style.card}>
      <img src={props.image} alt={props.name} className={style.flagImage} />
      <div className={style.cardContent}>
        <h2>{props.name}</h2>
        <p>Continent: {props.continent}</p>
        {/* Mostrar detalles solo si showDetails es true */}
        {props.showDetails ? (
          <>
            <p>Capital: {props.capital}</p>
            <p>Subregion: {props.subregion}</p>
            <p>Area: {props.area}</p>
            <p>Population: {props.population}</p>
            {activities.length > 0 ? (
              <div className={style.activities}>
                <h4>Activities:</h4>
                <ul>
                  {activities.map((activity) => (
                    <li key={activity.id}>
                      Name: {activity.name}, Difficulty: {activity.difficulty}, Duration: {activity.duration}, Season: {activity.season}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>No hay Actividades registradas</p>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Card;