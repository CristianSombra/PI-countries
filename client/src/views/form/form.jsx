import { useState } from "react";



const Form = () => {


    const [form, setForm] = useState({
        name:"",
        difficulty:"",
        duration:"",
        season: ""
    });

    const [errors, setErrors] = useState({
        name:"",
        difficulty:"",
        duration:"",
        season: ""
    })

    const changeHandler = (event) => {
            console.log("Estoy queriendo hacer un cambio")
            const property = event.target.name;
            const value = event.target.value;


            setForm({...form, [property]:value})

    }



    return(
        <form>
            <div>
                <label>Nombre de la Actividad: </label>
                <input type = "text" value={form.name} onChange={changeHandler} name="name"/>
            </div>
        
            <div>
                <label>Dificultad: </label>
                <input type = "text" value={form.difficulty} onChange={changeHandler} name="difficulty"/>
            </div>
        
            <div>
                <label>Duración: </label>
                <input type = "text" value={form.duration} onChange={changeHandler} name="duration"/>
            </div>
            <div>
                <label>Temporada: </label>
                <input type = "text" value={form.season} onChange={changeHandler} name="season"/>
            </div>


{/* Boton para crear la actividad turística */}

        </form>
    )
};


export default Form;