import React from 'react'
import { LlistatPersones } from './Llistat-persones'
import { useContext, useState, useEffect } from 'react';
import { Global } from '../../../helpers/Global';
import ContextAutentificador from '../../../context/Autentificador';

export const UsuarisSeguint = ({id, usuarisSeguint, setUsuarisSeguint}) => {

  const [llistat, setLlistat] = useState([]);
  const [contador, setContador] = useState(0);
  const [pagina, setPagina] = useState(1);
  const [mostrarVeuremes, setMostrarVeuremes] = useState(true);
  const {auth} = useContext(ContextAutentificador);

  useEffect(() => {
    conseguirUsuaris(1);
  }, [id])
  
  const conseguirUsuaris = async (pg) => {
    try{
  
        const opcions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        }
        let idUsuari = auth._id;
        if(id && id != 1)idUsuari = id;
        const peticio = await fetch(Global.url+"follow/seguint/"+idUsuari+"/"+pg, opcions);
        const dades = await peticio.json();
        if (dades.status != "error"){ 
            setContador(dades.total); 
            if(pg == 1){
              let follows = dades.follows.map(follow => follow.followed);
              setLlistat(follows);
            }
            else{
              let follows = dades.follows.map(follow => follow.followed);
              setLlistat([...llistat, ...follows]);
            }
            if(llistat.length >= (dades.total - dades.follows.length)){
                setMostrarVeuremes(false);
              }
        }
    } catch (error) {
        console.error(error);
    }
  }

  const cerca = async (e) => {
    e.preventDefault();
    if(e.target.nick.value != ""){
        try{

            const opcions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token")
                }
            }
            let idUsuari = auth._id;
            if(id && id != 1)idUsuari = id;
            const peticio = await fetch(Global.url+"follow/cerca/seguint/"+idUsuari+"?nick="+e.target.nick.value, opcions);
            const dades = await peticio.json();
            if (dades.status != "error"){
              let follows = dades.usuaris.map(follow => follow.followed);
              
              setLlistat(follows);
            }
            else{
                setLlistat([]);
            }
        } catch (error) {
            console.error(error);
        }
        setMostrarVeuremes(false);
    }
    else{
        setPagina(1);
        setLlistat([])
        setMostrarVeuremes(true);
        conseguirUsuaris(1);
    }
}

const segPagina = () => {
  setPagina(pagina + 1);
  conseguirUsuaris(pagina + 1);
}

  return (
    <div className='tabInformacioLlistatsUsuaris'>
        <h2 className='aligncenter'>Segueix a {contador} usuaris</h2>   
        <LlistatPersones
            following={contador}
            setFollowing={setContador}
            cerca={cerca}
            llistatUsuaris={llistat}
            usuarisSeguint={usuarisSeguint}
            segPagina={segPagina}
            mostrarVeuremes={mostrarVeuremes}
            setUsuarisSeguint={setUsuarisSeguint}
        />
    </div>
  )
}
