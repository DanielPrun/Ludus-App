import React from 'react'
import { useEffect, useContext, useState } from 'react'
import avatar from '../../../assets/user.png';
import ContextAutentificador from '../../../context/Autentificador';
import { Global } from '../../../helpers/Global';
import { Publicacions } from './Publicacions';
import { Config } from './Config';
import { Planificador } from '../planificador/Planificador';
import { useParams } from 'react-router-dom';
import { Informacio } from './Informacio';
import { Horari } from '../planificador/Horari';

export const Perfil = () => {
    
    const [horari, setHorari] = useState({
        "dilluns": [],
        "dimarts": [],
        "dimecres": [],
        "dijous": [],
        "divendres": [],
        "disabte": [],
        "diumenge": []
      });
    const {auth, contadors} = useContext(ContextAutentificador);
    const [tabPerfil, setTabPerfil] = useState(false);
    const [tabPlanificador, setTabPlanificador] = useState(true);
    const [tabPubli, setTabPubli] = useState(false);
    const [tabInfo, setTabInfo] = useState(false);
    const [ifollow, setifollow] = useState(false);
    const [usuari, setUsuari] = useState({});
    const { id } = useParams();

    useEffect(() => {
        if(id && id != 1 ){
            getUsuari(id);
            getHorari(id);
        }
        else{
            setUsuari(auth);
            getHorari(auth._id);
        }
    }, [id])

    const getHorari = async(id) => {
        const peticio = await fetch(Global.url + "horari/get/" + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        });
        const dades = await peticio.json();
        setHorari(JSON.parse(dades.horari[0].horari));
    }

    const getUsuari = async (id) => {
        const peticio = await fetch(Global.url + "user/perfil/" + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        });

        const dades = await peticio.json();
        setUsuari(dades.user); 

        if(dades.seguint.includes(id))setifollow(true);
        else setifollow(false);
    }

    
    const seguirUsuari = async (id) => {
        try {

            const opcions = {
                method: "POST",
                body: JSON.stringify({ followed: id }),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token")
                }
            }
            const peticio = await fetch(Global.url + "follow/seguir", opcions);
            const dades = await peticio.json();

            if (dades.status != "error") {
                setifollow(true);
            }
        } catch (error) {
            console.error(error);
        }

    }

    const deseguirUsuari = async (id) => {
        try {

            const opcions = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token")
                }
            }
            const peticio = await fetch(Global.url + "follow/deseguir/" + id, opcions);
            const dades = await peticio.json();

            if (dades.status != "error") {
                setifollow(false);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const canviarTab = (setTab) => {
        setTabPerfil(false);
        setTabPlanificador(false);
        setTabPubli(false);
        setTabInfo(false);

        setTab(true);
    }
  
  return (
    <section className='perfil-section' >
        {usuari.img != "default.png" && <img src={Global.url + "user/avatar/" + usuari.img} className='avatarPrincipal'/>}
        {usuari.img == "default.png" && <img src={avatar} className='avatarPrincipal'/>}
        <div className="container perfil-container">
            <h3 className="border-title aligncenter nickPerfil">  {usuari.nick} </h3>
            {!id || id == 1 || id == auth._id ? "" :
            <div className='followButtonPerfil' >
                {  !ifollow   ?
                <button className='noseguint aligncenter' onClick={() => seguirUsuari(id)}>
                    seguir  
                    &nbsp;
                    <i className="fa-solid fa-plus" />
                </button>
                :
                <button className='seguint aligncenter' onClick={() => deseguirUsuari(id)}>
                    deseguir  
                    &nbsp;
                    <i className="fa-solid fa-minus" />
                </button>
                }
            </div>
            }
            <p className='perfil-bio aligncenter'>{usuari.bio}</p> 

            <ul className='perfil-tabs'>
                <li className={tabPlanificador ? 'active': ''} onClick={() => {canviarTab(setTabPlanificador)}}>Horari</li>
                <li className={tabPubli ? 'active': ''} onClick={() => {canviarTab(setTabPubli)}}>Publicacions</li>
                <li className={tabInfo ? 'active': ''} onClick={() => {canviarTab(setTabInfo)}}>Informació</li>
                {!id || id == 1 || id == auth._id  ?
                    <li className={tabPerfil ? 'active': ''} onClick={() => {canviarTab(setTabPerfil)}}>Configuració</li> : ""
                }
            </ul>
            <div className='perfil-tab-content'>
            {tabPerfil ? <Config /> : '' }
            {tabPlanificador ? <Horari horari={horari} setHorari={setHorari} horariPerfil/> : '' }
            {tabPubli ? <Publicacions nick={usuari.nick} id={id} /> : '' }
            {tabInfo ? <Informacio id={id} /> : '' }
            </div>
        </div>
    </section>
  )
}
