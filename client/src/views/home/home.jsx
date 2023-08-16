import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCountriesHandler, useAlfabeticOrderHandlers, usePopulationOrderHandlers, useContinentOrderHandlers, useActivityHandler } from "../../components/handlers/handlers";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageHeader from "../../assets/img-header/img";
import SearchBar from "../../components/searchbar/searchbar";
import Card from "../../components/card/card";
import styles from "./home.module.css";


export default function Home() {
  
  const allCountries = useSelector((state) => state.countries);
  const allActivities = useSelector((state) => state.allActivities);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [orderName] = useState("asc");
  const [orderPopulation, setOrderPopulation] = useState("asc");
  const [selectedContinent, setSelectedContinent] = useState("All");
  const [selectedActivity, setSelectedActivity] = useState("All");

  const getCountriesData = getCountriesHandler();
  const { handlerAlfabeticOrderAsc, handlerAlfabeticOrderDesc } = useAlfabeticOrderHandlers();
  const { handlerPopulationOrderAsc, handlerPopulationOrderDesc } = usePopulationOrderHandlers();
  const { handlerContinentOrder } = useContinentOrderHandlers();
  const { order, handlerActivityChange } = useActivityHandler();
  
  const countriesPerPage = 10;
  const totalPages = Math.ceil(allCountries.length / countriesPerPage);
  const startIndex = (currentPage - 1) * countriesPerPage;
  const endIndex = startIndex + countriesPerPage;

  const PageChangeHandler = (page) => { setCurrentPage(page)};

  useEffect(() => {
    (getCountriesData());
  },[]);
  
  useEffect(() => {
    (handlerActivityChange(order, setCurrentPage));
    setCurrentPage(1);
  }, [order]);

  
  return (
    <div className={styles.homeContainer}>
             <ImageHeader />
      <SearchBar className={styles.searchBar} onPageChange={PageChangeHandler}/>
      <div className={styles.filterButtonsContainer}>
        <div className={styles.filterContainer}>
          <div className={styles.filterOptions}>
            <select
              value={selectedContinent}
              onChange={(e) => {
                handlerContinentOrder(e.target.value, setCurrentPage);
                setSelectedContinent('All');
              }}
            >
              <option value='All'>Filtrar por continente</option>
              <option value='Africa'>Africa</option>
              <option value='Antarctic'>Antarctica</option>
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
                    value={selectedActivity} onChange={(e) => { handlerActivityChange(e.target.value, setCurrentPage);
                      setSelectedActivity('All');
                    }}>
                      <option value="All">Filtrar por actividad turística</option>
                      {allActivities.map((activity) => (
                      <option value={activity} key={activity}>{activity}</option>
                    ))}
                  </select>
                </div>
           </div>
        </div>
      
        <div className={styles.buttonsContainer}>
        <button onClick={handlerAlfabeticOrderAsc} 
            className={ `${orderName === "asc" ? styles.activeButton : ""} ${styles.orderButton}`}
                > Ascendente por Nombre </button>
        
        <button onClick={handlerAlfabeticOrderDesc}
            className={`${orderName === "desc" ? styles.activeButton : ""} ${styles.orderButton}`}
                > Descendente por Nombre </button>
        
        <button onClick={() => {handlerPopulationOrderAsc();
            setOrderPopulation("asc");
          }}
          className={`${orderPopulation === "asc" ? styles.activeButton : ""} ${styles.orderButton}`}
                > Ascendente por cantidad de población </button>
        
        <button onClick={() => {handlerPopulationOrderDesc();
            setOrderPopulation("desc");
          }}
          className={`${orderPopulation === "desc" ? styles.activeButton : ""} ${styles.orderButton}`}
                > Descendente por cantidad de población </button>
      </div>
      
      <div className={styles.cardsContainer}>
        {allCountries && allCountries
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
                  <button className={styles.anterior}
                        onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1} >
    
                         <FontAwesomeIcon icon={faArrowLeft} />
                  </button>
           </div>

            <div className={styles.paginationInfo}>
                    {currentPage} de {totalPages}
            </div>

            <div className={styles.paginationButton}>
                   <button className={styles.siguiente}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
  >
                          <FontAwesomeIcon icon={faArrowRight} />
  
                  </button>
           </div>

        </div>
      </div>
    </div>
  );  
};  