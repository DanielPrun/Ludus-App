import React from 'react';
import { useContext, useState, useEffect } from 'react';
import avatar from '../../../assets/user.png';
import ContextAutentificador from '../../../context/Autentificador';
import { Global } from '../../../helpers/Global';
import { NavLink } from 'react-router-dom'
import { useForm } from '../../../hooks/useForm';
import { BuscadorUsuaris } from './BuscadorUsuaris';

export const SideForum = () => {

    const { auth, contadors, setTextAlerta } = useContext(ContextAutentificador);
    const [mostrarPersonas, setMostrarPersonas] = useState(false);
    const [following, setFollowing] = useState(0);
    const [followed, setFollowed] = useState(0);
    const [publications, setPublications] = useState(0);
    const [animacio, setAnimacio] = useState("");
    const [errorMissatge, setErrorMissatge] = useState("");
    const { formulari, canviat } = useForm({});


    useEffect(() => {
        setFollowing(contadors.following);
        setFollowed(contadors.followed);
        setPublications(contadors.publications);
    }, [])

    const canviarMostrarPersonas = () => {
        if (mostrarPersonas) {
            setAnimacio("slideoutRight 0.5s forwards");
        }
        else {
            setAnimacio("slideInRight 0.5s forwards");
        }
        setMostrarPersonas(!mostrarPersonas);
    }

    const crearPublicacio = async (e) => {
        e.preventDefault();

        setErrorMissatge("");
        let token = localStorage.getItem("token");
        let newPubli = formulari;
        newPubli.user = auth._id;

        try {
            const opcions = {
                method: "POST",
                body: JSON.stringify(newPubli),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                }
            }
            const peticio = await fetch(Global.url + "publi/guardar", opcions);
            const dades = await peticio.json();

            if (dades.status !== "error") {
                const fileInput = document.querySelector("#file");
                if (fileInput.files[0]) {
                    const formData = new FormData();

                    formData.append("file0", fileInput.files[0]);

                    const opcions = {
                        method: "POST",
                        body: formData,
                        headers: {
                            "Authorization": token
                        }
                    }

                    const pujada = await fetch(Global.url + "publi/pujarImg/" + dades.publicacioGuardada._id, opcions);
                    const dadesImg = await pujada.json();


                    if (dadesImg.status === 'success') {
                        setTextAlerta("la publicació s'ha creat correctament");
                        setPublications(publications + 1);
                        const myForm = document.querySelector("#publiForm");
                        myForm.reset();
                    } else {
                        const opcions = {
                            method: "DELETE",
                            headers: {
                                "Authorization": token
                            }
                        }
    
                        const borrar = await fetch(Global.url + "publi/borrar/" + dades.publicacioGuardada._id, opcions);

                        setErrorMissatge(dadesImg.message);
                    }
                }
                else{
                    setTextAlerta("la publicació s'ha creat correctament");
                    setPublications(publications + 1);
                    const myForm = document.querySelector("#publiForm");
                    myForm.reset();
                }
            } else {
                setErrorMissatge(dades.message);
            }
        } catch (error) {
            setErrorMissatge("error al crear la publicació");
            console.error(error);
        }

    }

    return (
        <section id="secondary-right" className="secondary-has-right-sidebar side-forum">
            <button className='button-persones' onClick={canviarMostrarPersonas}>buscar <i className="fa-solid fa-user"></i></button>
            <aside className="layout__aside">

                <h2 className="aside__title">Hola, {auth.nick}</h2>
                <NavLink title="Perfil" to="../perfil/1" >
                    <div className="perfil_info">
                        <div className="perfil_info_avatar">
                            <div className="perfil_avatar">
                                {auth.img != "default.png" && <img src={Global.url + "user/avatar/" + auth.img} />}
                                {auth.img == "default.png" && <img src={avatar} />}
                            </div>
                            <div className='perfil_info_nom'>
                                <div className="perfil_nom">{auth.nom} {auth.cognom}</div>
                                <div className="perfil_nick">{auth.nick}</div>
                            </div>
                        </div>

                        <div className="perfil_info_contadors">
                            <div className="contador__following">
                                <div>
                                    <span className="following__titol">Seguint</span>
                                    <span className="following__num">{following}</span>
                                </div>
                            </div>
                            <div className="contador__following">
                                <div>
                                    <span className="following__titol">Seguidors</span>
                                    <span className="following__num">{followed}</span>
                                </div>
                            </div>
                            <div className="contador__following">
                                <div>
                                    <span className="following__titol">Publicacions</span>
                                    <span className="following__num">{publications}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </NavLink>


                <div className="aside__container-form">
                    <form id="publiForm" onSubmit={crearPublicacio}>
                        <div>
                            <label htmlFor="text" >¿Que estas pensant avui?</label>
                            <textarea name="text" onChange={canviat} />
                        </div>
                        <div>
                            <label htmlFor="file0" >Puja una foto</label>
                            <input type="file" id="file" name="file0" />
                        </div>
                        <input type="submit" value="Enviar" />
                    </form>
                    <p className='missatge_error'>{errorMissatge}</p>
                </div>

            </aside>
            <BuscadorUsuaris 
                setFollowing={setFollowing} 
                following={following}
                animacio={animacio}
            />
        </section>
    )
}
