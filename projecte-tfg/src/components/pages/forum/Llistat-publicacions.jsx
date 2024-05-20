import React from 'react'
import avatar from '../../../assets/user.png';
import { Global } from '../../../helpers/Global';
import ReactTimeAgo from 'react-time-ago';
import { useNavigate } from 'react-router-dom';


export const LlistatPublicacions = ({ llistat, getPublicacions, setPagina }) => {

    let navegar = useNavigate();

    const borrar = async (e, id) => {
        e.preventDefault();
        const confirmacio = window.confirm('Estas segur de que vols borrar aquest article?');
        if (confirmacio) {
            const opcions = {
                method: "DELETE",
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            }
            const peticio = await fetch(Global.url + "publi/borrar/" + id, opcions);
            const dades = await peticio.json();

            if (dades.status === "success") {
                setPagina(1);
                getPublicacions(1);
            }
        }
    }

    const goPerfil = (e, id) => {
        e.preventDefault();

        navegar("/privat/perfil/" + id);
    }

    return (
        <>
            {llistat.length > 0 ?
                <ul>
                    {llistat.map((publi) => {
                        return (
                            <li className="publis__publi" key={publi._id}>
                                <div className="publi__container">
                                    <div className="publi__avatar"  onClick={(e) => goPerfil(e, publi.user._id)}>
                                        {publi.user.img != "default.png" && <img src={Global.url + "user/avatar/" + publi.user.img} />}
                                        {publi.user.img == "default.png" && <img src={avatar} />}
                                    </div>
                                    <div className='publi_content'>
                                        <div className="publi__info"  onClick={(e) => goPerfil(e, publi.user._id)}>
                                            {publi.user.nick}
                                            &nbsp; | &nbsp;
                                            <ReactTimeAgo date={Date.parse(publi.created_at)} />
                                        </div>
                                        <h4 className="publi__text">{publi.text}</h4>
                                        {publi.img ? <img src={Global.url + "publi/getImg/" + publi.img} /> : ""}
                                    </div>
                                </div>
                                <a href="#" onClick={(e) => { borrar(e, publi._id) }}>
                                    <i className="fa-solid fa-trash-can"></i>
                                </a>

                            </li>
                        )
                    })}
                </ul>
                :
                <h3 className='aligncenter'>No s'han trobat publicacions</h3>
            }
        </>
    )
}
