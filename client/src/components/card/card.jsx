import React from "react";
import style from "./card.module.css";

const Card = (props) => {
  return (
    <div className={style.card}>
      <p>Id: {props.id}</p>
      <p>Name: {props.name}</p>
      <img src={props.image} alt={props.name} />
      <p>Continent: {props.continent}</p>
      <p>Capital: {props.capital}</p>
      <p>Subregion: {props.subregion}</p>
      <p>Area: {props.area}</p>
      <p>Population: {props.population}</p>
      {props.activities.length > 0 ? (
        <div>
          <h4>Activities:</h4>
          <ul>
            {props.activities.map((activity) => (
              <li key={activity.id}>
                Name: {activity.name}, Difficulty: {activity.difficulty}, Duration: {activity.duration}, Season: {activity.season}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No hay Actividades registradas</p>
      )}
    </div>
  );
};

export default Card;