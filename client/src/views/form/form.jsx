import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountriesHandler, InputChangeHandler, CreateActivityHandler } from '../../components/handlers/handlers';
import styles from './form.module.css';


function CreateActivity() {
  const dispatch = useDispatch();
  const [error, setError] = useState('Completa los datos');
  const [success, setSuccess] = useState('');
  const [activity, setInputActivity] = useState({
    idCountries: [],
    name: '',
    difficulty: '',
    duration: '',
    season: [],
  });
  
  
  const getCountriesData = getCountriesHandler();
  const createActivity = CreateActivityHandler()
  const [selectedSeason, setSelectedSeason] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');

  const countries = useSelector(state => state.countries).sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });


  useEffect(() => {
    getCountriesData(dispatch);
    setInputActivity({
      idCountries: [],
      name: '',
      difficulty: '',
      duration: '',
      season: '',
    });
  }, [dispatch]);

  useEffect(() => {
    if (activity.idCountries.length > 0 && activity.name !== '' && activity.difficulty !== '' && activity.duration !== '' && activity.season !== '') {
      setError('');
    }
  }, [activity, error]);

  useEffect(() => { }, [activity]);

  
  function OnChange(e) {
    InputChangeHandler(e, activity, setInputActivity);
  }


  function pushSeason(e) {
    const value = e.target.value;
    if (!activity.season.includes(value)) {
      setInputActivity({
        ...activity,
        season: [...activity.season, value]
      });
      setSelectedSeason('');
    }
  }

  function eliminateSeason(e) {
    let EliminateSeason = e.target.value;
    let aux = activity.season.filter(s => s !== EliminateSeason);
    setInputActivity({
      ...activity,
      season: aux
    });
  }
  
  function pushCountry(e) {
    const value = e.target.value;
    if (!activity.idCountries.includes(value)) {
      setInputActivity({
        ...activity,
        idCountries: [...activity.idCountries, value]
      });
      setSelectedCountry('');
    }
  }

  function eliminateCountry(e) {
    let Eliminateid = e.target.value;
    let aux = activity.idCountries.filter(id => id !== Eliminateid)
    setInputActivity({
      ...activity,
      idCountries: aux
    });
  };

  async function handlerSubmit(e) {
    e.preventDefault();

    if (activity.idCountries.length === 0) {
      setError('Selecciona al menos un país.');
      return;
    }

    if (!activity.name.trim()) {
      setError('El nombre de la actividad no puede estar vacío.');
      return;
    }

    setError('');

    const payload = {
      name: activity.name,
      difficulty: activity.difficulty,
      duration: activity.duration,
      season: activity.season,
      countries: activity.idCountries,
    };


  try {
    await (createActivity(payload));
    setInputActivity({
      idCountries: [],
      name: '',
      difficulty: '',
      duration: '',
      season: '',
    });
    setSuccess('Actividad creada con éxito');

    setTimeout(() => {
      setError('');
      setSuccess('');
    }, 3000);
  } catch (error) {
    setError('Error al crear la actividad');
  }
}
  
  
  const season = ['Winter', 'Spring', 'Autumn', 'Summer'];
  const difficulty = ['1', '2', '3', '4', '5']; 
  const duration = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12','13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'
  ];


  return (
    <div className={styles.container}>
      <h1>Puedes crear una actividad</h1>
  
      <form onSubmit={handlerSubmit} className={styles.formulario}>
        <label>Nombre</label>
        <input
          type="text"
          placeholder="Nombre de la actividad"
          name="name"
          onChange={OnChange}
          value={activity.name}
        />
  
        <label>Dificultad</label>
        <select name="difficulty" onChange={OnChange} value={activity.difficulty}>
          <option value="">Elige una dificultad</option>
          {difficulty.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
  
        <label>Duracion</label>
        <select name="duration" onChange={OnChange} value={activity.duration}>
          <option value="">Elige una duración</option>
          {duration.map((hours) => (
            <option key={hours} value={hours}>{hours} horas</option>
          ))}
        </select>
  
        <label>Estación</label>
        <select
          name="season"
          onChange={(e) => {
            pushSeason(e);
            setSelectedSeason('');
          }}
          value={selectedSeason}
        >
          <option value="">Elige una temporada</option>
          {season.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
  
        <div className={styles.seleccionadosEst}>
          <h3>Estaciones Seleccionadas</h3>
          <div className={styles.seleccionados}>
            {activity.season.length > 0 ? activity.season.map((s) => (
              <div key={s} className={styles.seleccionado}>
                <p>{s}</p>
                <button value={s} onClick={eliminateSeason}>x</button>
              </div>
            )) : null}
          </div>
        </div>
  
        <label>Pais</label>
        <select
          name="idCountries"
          onChange={(e) => {
            pushCountry(e);
            setSelectedCountry('');
          }}
          value={selectedCountry}
        >
          <option value="">Selecciona un pais</option>
          {countries.map((country) => (
            <option key={country.id} value={country.id}>{country.name}</option>
          ))}
        </select>
  
        <div className={styles.seleccionadosDiv}>
          <h3>Países Seleccionados</h3>
          <div className={styles.seleccionados}>
            {activity.idCountries.length > 0 ? countries.map((country) => {
              if (activity.idCountries.includes((country.id).toString())) {
                return (
                  <div key={country.id} className={styles.seleccionado}>
                    <p>{country.name}</p>
                    <button value={country.id} onClick={eliminateCountry}>x</button>
                  </div>
                )
              } else {
                return null;
              }
            }) : []}
          </div>
        </div>
        {error ? <div className={styles.divError}><p>{error}</p></div> : <input type="submit" value="Registrar actividad" className={styles.submit} />}
      </form>
  
      
      {success && <div className={`${styles.divSuccess} ${styles.message}`}>{success}</div>}

      <Link to="/home" className={styles.linkButton} >Volver a Inicio</Link>
    </div>
  );
  
}

export default CreateActivity;