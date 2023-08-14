import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'; // Importamos useLocation en lugar de useHistory
import { getCountries, setContinent } from '../../redux/actions'; // Importamos solo la acción postActivity
import s from './form.module.css';
import Swal from 'sweetalert2';



function valida(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Name required";
  }
  // Agregar más validaciones si es necesario
  return errors;
}



function CreateActivity() {
  const [error, setError] = useState('Completa los datos');
  const [activity, setInputActivity] = useState({
    idCountries: [],
    name: '',
    difficulty: '',
    duration: '',
    season: [],
  });
  
  
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

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(getCountries());
    dispatch(setContinent(''));
    setInputActivity({
      idCountries: [],
      name: '',
      difficulty: '',
      duration: '',
      season: '',
    });
  }, []);

  useEffect(() => {
    console.log('Activity state:', activity);
    if (activity.idCountries.length > 0 && activity.name !== '' && activity.difficulty !== '' && activity.duration !== '' && activity.season !== '') {
      setError('');
    }
  }, [activity, error]);

  useEffect(() => { }, [activity]);

  function handlerOnChange(e) {
    console.log('Input change:', e.target.name, e.target.value);
    setInputActivity({
      ...activity,
      [e.target.name]: e.target.name === 'duration' ? e.target.value.toString() : e.target.value,
    });
  }

  function pushSeason(e) {
    const value = e.target.value;
    if (!activity.season.includes(value)) {
      console.log('Selected season:', value);
      setInputActivity({
        ...activity,
        season: [...activity.season, value]
      });
      setSelectedSeason(''); // Mostrar la opción seleccionada
    }
  }

  function eliminarSeason(e) {
    let EliminarSeason = e.target.value;
    let aux = activity.season.filter(s => s !== EliminarSeason);
    setInputActivity({
      ...activity,
      season: aux
    });
  }
  

  function pushPais(e) {
    const value = e.target.value;
    if (!activity.idCountries.includes(value)) {
      console.log('Selected country:', value);
      setInputActivity({
        ...activity,
        idCountries: [...activity.idCountries, value]
      });
      setSelectedCountry(''); // Mostrar la opción seleccionada
    }
  }

  function eliminarCountry(e) {
    let Eliminarid = e.target.value;
    let aux = activity.idCountries.filter(id => id !== Eliminarid)
    setInputActivity({
      ...activity,
      idCountries: aux
    });
  };

  async function handlerSubmit(e) {
    e.preventDefault();
  
    // Validar que al menos un país esté seleccionado
    if (activity.idCountries.length === 0) {
      setError('Selecciona al menos un país.');
      return;
    }
  
    // Restablecer el error en caso de que ahora haya una selección válida
    setError('');
  
    const payload = {
      name: activity.name,
      difficulty: activity.difficulty,
      duration: activity.duration,
      season: activity.season,
      countries: activity.idCountries,
    };
  
    try {
      await axios.post('http://localhost:3001/activities', payload);
      setInputActivity({
        idCountries: [],
        name: '',
        difficulty: '',
        duration: '',
        season: '',
      });
  
      Swal.fire({
        title: 'Actividad Creada con éxito',
        confirmButtonColor: "#34a57f"
      });
  
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: 'Error creating activity',
        text: 'An error occurred while creating the activity. Please try again later.',
        icon: 'error',
        confirmButtonColor: "#34a57f"
      });
    }
  }
  
  

  const season = ['Winter', 'Spring', 'Autumn', 'Summer'];
  const difficulty = ['1', '2', '3', '4', '5']; // Asegurar que sean strings
  const duration = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12','13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'
  ]; // Asegurar que sean strings


  return (
    <div className={s.container}>
      <h1>Puedes crear una actividad</h1>
  
      <form onSubmit={handlerSubmit} className={s.formulario}>
        <label>Nombre</label>
        <input
          type="text"
          placeholder="Nombre de la actividad"
          name="name"
          onChange={handlerOnChange}
          value={activity.name}
        />
  
        <label>Dificultad</label>
        <select name="difficulty" onChange={handlerOnChange} value={activity.difficulty}>
          <option value="">Elige una dificultad</option>
          {difficulty.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
  
        <label>Duracion</label>
        <select name="duration" onChange={handlerOnChange} value={activity.duration}>
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
            setSelectedSeason(''); // Restablecer la selección
          }}
          value={selectedSeason} // Usa el estado para establecer la selección
        >
          <option value="">Elige una temporada</option>
          {season.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
  
        <div className={s.seleccionadosDiv}>
          <h3>Estaciones Seleccionadas</h3>
          <div className={s.seleccionados}>
            {activity.season.length > 0 ? activity.season.map((s) => (
              <div key={s} className={s.seleccionado}>
                <p>{s}</p>
                <button value={s} onClick={eliminarSeason}>x</button>
              </div>
            )) : null}
          </div>
        </div>
  
        <label>Pais</label>
        <select
          name="idCountries"
          onChange={(e) => {
            pushPais(e);
            setSelectedCountry(''); // Restablecer la selección
          }}
          value={selectedCountry} // Usa el estado para establecer la selección
        >
          <option value="">Selecciona un pais</option>
          {countries.map((country) => (
            <option key={country.id} value={country.id}>{country.name}</option>
          ))}
        </select>
  
        <div className={s.seleccionadosDiv}>
          <h3>Países Seleccionados</h3>
          <div className={s.seleccionados}>
            {activity.idCountries.length > 0 ? countries.map((country) => {
              if (activity.idCountries.includes((country.id).toString())) {
                return (
                  <div key={country.id} className={s.seleccionado}>
                    <p>{country.name}</p>
                    <button value={country.id} onClick={eliminarCountry}>x</button>
                  </div>
                )
              } else {
                return null;
              }
            }) : []}
          </div>
        </div>
        {error ? <div className={s.divError}><p>{error}</p></div> : <input type="submit" value="Registrar actividad" className={s.submit} />}
      </form>
  
      <Link to="/home" className={s.linkButton} >Volver a Home</Link>
    </div>
  );
  
}

export default CreateActivity;