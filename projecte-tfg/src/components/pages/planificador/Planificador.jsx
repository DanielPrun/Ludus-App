import React, { useEffect, useState } from 'react'
import { Sessio } from './Sessio'
import { Global } from '../../../helpers/Global';
import { Horari } from './Horari';
import { SelectorExercisis } from './SelectorExercisis';

export const Planificador = () => {

  const [horari, setHorari] = useState({
    "dilluns": [],
    "dimarts": [],
    "dimecres": [],
    "dijous": [],
    "divendres": [],
    "disabte": [],
    "diumenge": []
  });
  const [models, setModels] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [selected, setSelected] = useState(0);
  const [llistatExercisis, setLlistatExercisis] = useState([]);

  useEffect(() => {
    getModels();
  }, []);

  const getSessions = async (ids) => {
    try {
      const opcions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token")
        }
      }

      let url = Global.url + "sessio/sessions?ids="+JSON.stringify(ids);

      const peticio = await fetch(url, opcions);
      const dades = await peticio.json();

      if (dades.status != "error") {
        setLlistatExercisis(dades.sessions[0].aceptades)
        setSessions(dades.sessions);
      }

    } catch (error) {
      console.error(error);
    }
  }

  const getModels = async () => {
    try {
      const opcions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token")
        }
      }

      let url = Global.url + "model/models";

      const peticio = await fetch(url, opcions);
      const dades = await peticio.json();

      if (dades.status != "error") {
        getSessions(dades.models[0]["sessions"])
        setModels(dades.models);
      }

    } catch (error) {
      console.error(error);
    }
  }

  const handleSelectChange = (e) =>{
    const modelId = e.target.value;
    const model = models.find(objeto => objeto._id === modelId);
    const idsSessions = model["sessions"];
    getSessions(idsSessions);
    setHorari({
      "dilluns": [],
      "dimarts": [],
      "dimecres": [],
      "dijous": [],
      "divendres": [],
      "disabte": [],
      "diumenge": []
    });
  }

  return (
    <div className='container Planificador'>
      <select onChange={handleSelectChange} >
        {models.map((model, index) => {
          return <option key={model._id} value={model._id}>{model.Titol}</option>
        })}
      </select>
      <SelectorExercisis ids={llistatExercisis}/>
      <ul className='sessions'>
        {sessions.map((sessio, index) => {
          return <Sessio  key={sessio._id} 
                          sessio={sessio} 
                          selected={selected == index ? true : false} 
                          setSelected={setSelected}
                          index={index}
                          setLlistatExercisis={setLlistatExercisis}
                          />
        })}
      </ul>

      <Horari horari={horari} setHorari={setHorari}/>
    </div>
  )
}
