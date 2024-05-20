import React, { useEffect, useState } from 'react'
import { Exercici } from './Exercici';
import { Global } from '../../../helpers/Global';

export const SelectorExercisis = ({ids}) => {
  
  const [llistat, setLlistat] = useState([]);
  const [selected, setSelected] = useState({});

  useEffect(() => {
    getExercisis(ids);
  }, [ids]);

  const getExercisis = async (ids) =>{
    try {
      const opcions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token")
        }
      }

      let url = Global.url + "ex/exercisis?ids="+JSON.stringify(ids);

      const peticio = await fetch(url, opcions);
      const dades = await peticio.json();

      if (dades.status != "error") {
        setLlistat(dades.exercisis);
        setSelected(dades.exercisis[0]);
      }

    } catch (error) {
      console.error(error);
    }
  }

  const handleSelect = (ex) => {
    setSelected(ex);
  }

  const handleOnDrag = (e, exercici) => {
    e.dataTransfer.setData("exercici", exercici)
}

  return (
    <div>
      {selected ? <Exercici exercici={selected}/> : ""}
      <section id="secondary-right" className="secondary-sidebar secondary-has-right-sidebar">
        <ul className='llistatExercisis'>
          {llistat.map((exercici) => {
            return <li  key={exercici._id} 
                        className={exercici._id == selected._id ? 'active' : ""} 
                        onClick={() => handleSelect(exercici)}
                        onDragStart={(e) => handleOnDrag(e, JSON.stringify(exercici))}
                        draggable
                        >
                          {exercici.titol}
                    </li>
          })}
        </ul>
      </section>
    </div>
  )
}
