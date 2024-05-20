import React from 'react';
import { useContext } from 'react';
import avatar from '../../../assets/user.png';
import { Global } from '../../../helpers/Global';
import ContextAutentificador from '../../../context/Autentificador';
import { useNavigate } from 'react-router-dom';

export const LlistatPersones = ({ following, setFollowing, cerca, llistatUsuaris, usuarisSeguint, segPagina, mostrarVeuremes, setUsuarisSeguint }) => {

    const { auth } = useContext(ContextAutentificador);

    let navegar = useNavigate();


    const goPerfil = (e, id) => {
        e.preventDefault();

        navegar("/privat/perfil/" + id);
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
                setUsuarisSeguint([...usuarisSeguint, id]);
                setFollowing(following + 1);
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
                let filtrats = usuarisSeguint.filter(idUsuariSeguint => id !== idUsuariSeguint);
                setUsuarisSeguint(filtrats);
                setFollowing(following - 1);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <form action="#" id="formcerca" className="form-cerca-usuaris" method="get" onSubmit={cerca}>
                <input type="text" name="nick" placeholder="Cerca usuaris" />
                <button type="submit"><i className="fa-solid fa-magnifying-glass"></i> </button>
            </form>
            {llistatUsuaris.length > 0 ?
            <ul className='llista-persones'>
                {llistatUsuaris.map((usuari) => {
                    return (
                        <li key={usuari._id}>
                            <div className="perfil_info_avatar" >

                                <div className="perfil_avatar" onClick={(e) => goPerfil(e, usuari._id)}>
                                    {usuari.img != "default.png" && <img src={Global.url + "user/avatar/" + usuari.img} />}
                                    {usuari.img == "default.png" && <img src={avatar} />}
                                </div>

                                <div className='perfil_info_nom' onClick={(e) => goPerfil(e, usuari._id)}>
                                    <a href="#" className="perfil_nom">{usuari.nom} {usuari.cognom}</a>
                                    <p className="perfil_nick">{usuari.nick}</p>
                                </div>
                                {usuari._id != auth._id ?
                                    <div className='perfil_button'>
                                        {usuarisSeguint.includes(usuari._id) ?
                                            <button className='red_button' onClick={() => deseguirUsuari(usuari._id)}>deseguir</button>
                                            :
                                            <button onClick={() => seguirUsuari(usuari._id)}>seguir</button>
                                        }

                                    </div>
                                    :
                                    <div className='perfil_button' />
                                }
                            </div>
                        </li>
                    )
                })
                }
                {mostrarVeuremes ?
                    <li key="1"><button className='mesPersones' onClick={segPagina}>veure més</button></li>
                    :
                    ""
                }
            </ul>
            :
                <h3 className='aligncenter'>No s'han trobat usuaris</h3>
            }
        </>
    )
}
