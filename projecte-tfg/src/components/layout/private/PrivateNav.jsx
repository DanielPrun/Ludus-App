import React, { useState } from 'react'
import { useContext} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import avatar from '../../../assets/user.png';
import ContextAutentificador from '../../../context/Autentificador';
import { Global } from '../../../helpers/Global';

export const PrivateNav = () => {
  const {auth} = useContext(ContextAutentificador);
  const navegar = useNavigate();

  const tencarSessió = (e) => {
    e.preventDefault();
    localStorage.clear();
    navegar(0);
  }

  return (
    <div className="top-right">
        <ul>
            <li>
              <NavLink title="Perfil" to="perfil/1" > 
                {auth.img != "default.png" && <img src={Global.url + "user/avatar/" + auth.img} className="post__user-image"/>}
                {auth.img == "default.png" && <img src={avatar} className="post__user-image" />}
                <p>Perfil</p>
              </NavLink>
            </li>
            <li><a href="#" onClick={tencarSessió}><p>Tenca sessió </p><i className='fa-solid fa-arrow-right-from-bracket' /></a></li>
        </ul>
    </div>
  )
}