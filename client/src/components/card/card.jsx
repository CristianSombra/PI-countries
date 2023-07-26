import style from "./card.module.css";

const Card = (props) => {
    return (
      <div className={style.card}>
        <p>Id: {props.id}</p>
        <p>Name: {props.name}</p>
        <img src={props.image} alt={props.name} /> {/* Muestra la imagen usando la etiqueta img */}
        <p>Continent: {props.continent}</p>
        <p>Capital: {props.capital}</p>
        <p>Subregion: {props.subregion}</p>
        <p>Area: {props.area}</p>
        <p>Population: {props.population}</p>
        {/* Renderiza las actividades individualmente */}
        <ul>
          {props.activities.map((activity) => (
            <li key={activity.id}>
              {activity.name} - Difficulty: {activity.difficulty}, Duration: {activity.duration}, Season: {activity.season}
            </li>
          ))}
        </ul>
      </div>
    );
  };


export default Card;