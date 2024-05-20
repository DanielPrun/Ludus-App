import React from 'react'
import { UsuarisSeguint } from './UsuarisSeguint'
import { UsuarisSeguidors } from './UsuarisSeguidors'
import { useState, useEffect } from 'react';
import { Global } from '../../../helpers/Global';

export const Informacio = ({id}) => {

  const [usuarisSeguint, setUsuarisSeguint] = useState([]);

  useEffect(() => {
    conseguirUsuaris();
  }, [id])

  const conseguirUsuaris = async () => {
    try{

        const opcions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        }
        const peticio = await fetch(Global.url+"user/llista/1", opcions);
        const dades = await peticio.json();
        if (dades.status != "error"){
            setUsuarisSeguint(dades.seguint);        
        }
    } catch (error) {
        console.error(error);
    }
}

  return (
    <div className='tabInformacio'>
        <UsuarisSeguint 
            id={id} 
            usuarisSeguint={usuarisSeguint}
            setUsuarisSeguint={setUsuarisSeguint}
        />
        <UsuarisSeguidors 
            id={id} 
            usuarisSeguint={usuarisSeguint}
            setUsuarisSeguint={setUsuarisSeguint}
        />
    </div>
  )
}
 