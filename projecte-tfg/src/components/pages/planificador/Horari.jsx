import React, { useState } from 'react'
import { Global } from '../../../helpers/Global';

export const Horari = ({ horari, setHorari, horariPerfil = false }) => {


  const handleDragOver = (e) => {
    e.preventDefault();
  }

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.target.style.border = '1px solid black';
  }

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.target.style.border = 'none';
  }

  const handleOnDrop = (e, dia) => {
    const sessio = JSON.parse(e.dataTransfer.getData("sessio"));
    const horariAux = { ...horari };
    const diaRepetit = Object.keys(horariAux).find(dia => horariAux[dia].includes(sessio[3]));
    if (diaRepetit) horariAux[diaRepetit] = [];
    horariAux[dia] = sessio;
    setHorari(horariAux);
    e.target.style.border = 'none';
  }

  const eliminarSessio = (e, dia) => {
    e.preventDefault();
    const horariAux = { ...horari };
    horariAux[dia] = [];
    setHorari(horariAux);
  }

  const guardarHorari = async () => {
    try {
      const opcions = {
        method: "POST",
        body: JSON.stringify(horari),
        headers: {
          "Authorization": localStorage.getItem("token"),
          'Content-Type': 'application/json',
        }
      }
      const peticio = await fetch(Global.url + "horari/guardar", opcions);
      const dades = await peticio.json();

      if (dades.status !== "error") {
        console.log(dades);
      }

    } catch (error) {
     
      console.error(error);
    }
  }
  
  return (
    <div className='horari'>

      {Object.keys(horari).map((dia, index) => (
        <div className='diaSetmana' key={index}>
          <div className='titolDia'> {dia} </div>
          <div className='exercisisDia'
            onDrop={(e) => handleOnDrop(e, dia)}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
          >
            {horari[dia].length > 0 ?
              <div className="sessioDia" style={{ backgroundColor: "rgb(" + horari[dia][1] + " / 50%)" }}>
                {horariPerfil ? "" : <i className="fa-solid fa-circle-xmark" onClick={(e) => eliminarSessio(e, dia)} /> }
                <p className='titolSessio'>{horari[dia][0]}</p>
                <ul>
                  {horari[dia][2].map((exercici, index) => {
                    return <li key={index}>{exercici}</li>
                  })}
                </ul>
              </div>
              : ""}
          </div>
        </div>
      ))}
      {horariPerfil ? "" : <button className=' guardarSessio aligncenter' onClick={guardarHorari}>guardar</button> }
    </div>
  )
}
