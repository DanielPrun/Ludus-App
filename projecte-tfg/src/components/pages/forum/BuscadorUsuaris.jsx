import React from 'react'
import { useContext, useState, useEffect } from 'react';
import { LlistatPersones } from '../usuari/Llistat-persones';
import { Global } from '../../../helpers/Global';


export const BuscadorUsuaris = ({setFollowing, following, animacio}) => {
  
    const [llistatUsuaris, setLlistatUsuaris] = useState([]);
    const [usuarisSeguint, setUsuarisSeguint] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [mostrarVeuremes, setMostrarVeuremes] = useState(true);

    useEffect(() => {
        conseguirUsuaris(1);
    }, [])

    const conseguirUsuaris = async (pg) => {
        try{

            const opcions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token")
                }
            }
            const peticio = await fetch(Global.url+"user/llista/"+pg, opcions);
            const dades = await peticio.json();
            if (dades.status != "error"){
                setUsuarisSeguint(dades.seguint);

                if(pg == 1){
                    setLlistatUsuaris(dades.users);
                }
                else{
                    setLlistatUsuaris([...llistatUsuaris, ...dades.users]);
                    if(llistatUsuaris.length >= (dades.total - dades.users.length)){
                        setMostrarVeuremes(false);
                    }
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
                const peticio = await fetch(Global.url+"user/cerca?nick="+e.target.nick.value, opcions);
                const dades = await peticio.json();
                if (dades.status != "error"){
                    setLlistatUsuaris(dades.usuaris);
                }
            } catch (error) {
                console.error(error);
            }
            setMostrarVeuremes(false);
        }
        else{
            setPagina(1);
            setLlistatUsuaris([])
            setMostrarVeuremes(true);
            conseguirUsuaris(1);
        }
    }

    const segPagina = () => {
        setPagina(pagina + 1);
        conseguirUsuaris(pagina + 1);
    }

    return (
    <section className="lateral-persones" style={{ animation: animacio }}>
        <LlistatPersones
            setFollowing={setFollowing}
            following={following}
            cerca={cerca}
            llistatUsuaris={llistatUsuaris}
            usuarisSeguint={usuarisSeguint}
            segPagina={segPagina}
            mostrarVeuremes={mostrarVeuremes}
            setUsuarisSeguint={setUsuarisSeguint}
        />
    </section>
  )
}
