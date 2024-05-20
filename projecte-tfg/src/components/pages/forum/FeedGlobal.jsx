import React from 'react'
import { useEffect, useState } from 'react'
import { LlistatPublicacions } from './Llistat-publicacions';
import { Global } from '../../../helpers/Global';

export const FeedGlobal = () => {

    const [llistat, setLlistat] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [mostrarVeuremes, setMostrarVeuremes] = useState(true);

    useEffect(() => {
        getPublicacions(1);
    }, [])

    const getPublicacions = async (pg, showNews = false) => {
        
        if(showNews){
            setLlistat([]);
            setPagina(1);
            pg=1;
        }
        
        try {
            const opcions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }

            let url = Global.url + "publi/global/" + pg;

            const peticio = await fetch(url, opcions);
            const dades = await peticio.json();

            if (dades.status != "error") {
                if (pg >= dades.pages) {
                    setMostrarVeuremes(false);
                } else {
                    setMostrarVeuremes(true);
                }
                if (pg == 1) {
                    setLlistat(dades.publications);
                }
                else {

                    setLlistat([...llistat, ...dades.publications]);
                }

            }

        } catch (error) {
            console.error(error);
        }
    }

    const segPagina = () => {
        setPagina(pagina + 1);
        getPublicacions(pagina + 1);
    }

    return (
        <div>
            <button className="buttonMostrarNoves aligncenter" onClick={() => {getPublicacions(1, true)}}>Mostrar noves</button>
            <LlistatPublicacions
                llistat={llistat}
                getPublicacions={getPublicacions}
                setPagina={setPagina}
            />
            {mostrarVeuremes ?
                <div className="content__container-btn">
                    <button onClick={segPagina}> Veure mes publicacions </button>
                </div>
                :
                ""
            }
        </div>
    )
}
