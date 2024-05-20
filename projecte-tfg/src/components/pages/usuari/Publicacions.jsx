import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { Global } from '../../../helpers/Global';
import { LlistatPublicacions } from '../forum/Llistat-publicacions';
import ContextAutentificador from '../../../context/Autentificador';
export const Publicacions = ({ nick, id }) => {

    const [llistat, setLlistat] = useState([]);
    const [contador, setContador] = useState(0);
    const [pagina, setPagina] = useState(1);
    const [mostrarVeuremes, setMostrarVeuremes] = useState(true);
    const { auth } = useContext(ContextAutentificador);

    useEffect(() => {
        setMostrarVeuremes(true);
        getPublicacions(1);
    }, [id])

    const getPublicacions = async (pg) => {
        try {
            const opcions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token")
                }
            }

            let idUsuari = auth._id;
            if (id && id != 1) idUsuari = id;
            const peticio = await fetch(Global.url + "publi/user/" + idUsuari + "/"+pg, opcions);
            const dades = await peticio.json();

            if (dades.status != "error") {
                setContador(dades.total);
                if (pg >= dades.pages) {
                    setMostrarVeuremes(false);
                }else{
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
            <h2 className='aligncenter'>{nick} ha penjat {contador} publicacions</h2>
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
