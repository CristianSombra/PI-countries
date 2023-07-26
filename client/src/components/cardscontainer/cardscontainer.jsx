import Card from "../card/card"
import style from "./cardscontainer.module.css";


const CardsContainer = () => {
    const countries = [
    {
        "id": "CAN",
        "name": "Canada",
            "image": "https://flagcdn.com/w320/ca.png",
            "continent": "Americas",
            "capital": "Ottawa",
            "subregion": "North America",
            "area": 9984670,
            "population": 38005238,
            "createdInDb": true,
            "activities": [
                {
                    "id": "73ba25da-c293-45bd-a51a-a9144782c432",
                    "name": "Sky",
                    "difficulty": "4",
                    "duration": "1",
                    "season": "Winter"
                }
            ]
        },
        {
            "id": "ARG",
            "name": "Argentina",
            "image": "https://flagcdn.com/w320/ar.png",
            "continent": "Americas",
            "capital": "Buenos Aires",
            "subregion": "South America",
            "area": 2780400,
            "population": 45376763,
            "createdInDb": true,
            "activities": [
                {
                    "id": "73ba25da-c293-45bd-a51a-a9144782c432",
                    "name": "Sky",
                    "difficulty": "4",
                    "duration": "1",
                    "season": "Winter"
                }
            ]
        },
        {
            "id": "KEN",
            "name": "Kenya",
            "image": "https://flagcdn.com/w320/ke.png",
            "continent": "Africa",
            "capital": "Nairobi",
            "subregion": "Eastern Africa",
            "area": 580367,
            "population": 53771300,
            "createdInDb": true,
            "activities": [
                {
                    "id": "f9baa48f-3c22-42a7-8a04-5aacdafc5497",
                    "name": "Run",
                    "difficulty": "2",
                    "duration": "1",
                    "season": "Summer"
                }
            ]
        },
        {
            "id": "ALA",
            "name": "Åland Islands",
            "image": "https://flagcdn.com/w320/ax.png",
            "continent": "Europe",
            "capital": "Mariehamn",
            "subregion": "Northern Europe",
            "area": 1580,
            "population": 29458,
            "createdInDb": true,
            "activities": [
                {
                    "id": "f9baa48f-3c22-42a7-8a04-5aacdafc5497",
                    "name": "Run",
                    "difficulty": "2",
                    "duration": "1",
                    "season": "Summer"
                }
            ]
        },
        {
            "id": "BRA",
            "name": "Brazil",
            "image": "https://flagcdn.com/w320/br.png",
            "continent": "Americas",
            "capital": "Brasília",
            "subregion": "South America",
            "area": 8515767,
            "population": 212559409,
            "createdInDb": true,
            "activities": [
                {
                    "id": "f9baa48f-3c22-42a7-8a04-5aacdafc5497",
                    "name": "Run",
                    "difficulty": "2",
                    "duration": "1",
                    "season": "Summer"
                }
            ]
        },
        {
            "id": "ROU",
            "name": "Romania",
            "image": "https://flagcdn.com/w320/ro.png",
            "continent": "Europe",
            "capital": "Bucharest",
            "subregion": "Southeast Europe",
            "area": 238391,
            "population": 19286123,
            "createdInDb": true,
            "activities": [
                {
                    "id": "f9baa48f-3c22-42a7-8a04-5aacdafc5497",
                    "name": "Run",
                    "difficulty": "2",
                    "duration": "1",
                    "season": "Summer"
                }
            ]
        },
        {
            "id": "ATF",
            "name": "French Southern and Antarctic Lands",
            "image": "https://flagcdn.com/w320/tf.png",
            "continent": "Antarctic",
            "capital": "Port-aux-Français",
            "subregion": null,
            "area": 7747,
            "population": 400,
            "createdInDb": true,
            "activities": []
        },
        {
            "id": "COL",
            "name": "Colombia",
            "image": "https://flagcdn.com/w320/co.png",
            "continent": "Americas",
            "capital": "Bogotá",
            "subregion": "South America",
            "area": 1141748,
            "population": 50882884,
            "createdInDb": true,
            "activities": []
        },
        {
            "id": "VEN",
            "name": "Venezuela",
            "image": "https://flagcdn.com/w320/ve.png",
            "continent": "Americas",
            "capital": "Caracas",
            "subregion": "South America",
            "area": 916445,
            "population": 28435943,
            "createdInDb": true,
            "activities": []
        },
        {
            "id": "TJK",
            "name": "Tajikistan",
            "image": "https://flagcdn.com/w320/tj.png",
            "continent": "Asia",
            "capital": "Dushanbe",
            "subregion": "Central Asia",
            "area": 143100,
            "population": 9537642,
            "createdInDb": true,
            "activities": []
        },
        {
            "id": "IRQ",
            "name": "Iraq",
            "image": "https://flagcdn.com/w320/iq.png",
            "continent": "Asia",
            "capital": "Baghdad",
            "subregion": "Western Asia",
            "area": 438317,
            "population": 40222503,
            "createdInDb": true,
            "activities": []
        }
    ]
    
    
    return (
        <div className={style.container}>
          {countries.map((country) => (
            <Card
              key={country.id} // Agrega una clave única para cada elemento
              id={country.id}
              name={country.name}
              image={country.image}
              continent={country.continent}
              capital={country.capital}
              subregion={country.subregion}
              area={country.area}
              population={country.population}
              activities={country.activities}
            />
          ))}
        </div>
      );
};


export default CardsContainer;