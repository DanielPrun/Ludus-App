import React from 'react'
import { useContext } from 'react'
import { NavLink, Navigate, Outlet } from 'react-router-dom'
import { PublicNav } from './public/PublicNav'
import { PrivateNav } from './private/PrivateNav'
import ContextAutentificador from '../../context/Autentificador';
import { Footer } from "./Footer";

export const Header = ({ privat }) => {

    const { auth, loading } = useContext(ContextAutentificador);
    if (!loading) {
        return (
            <div className='wrapper'>
                <div id="header-wrapper">
                    <header id="header" className="header2">
                        <div className="main-menu-container">
                            <div className="main-menu">
                                <div id="logo">
                                    <NavLink to={privat ? "/privat/inici" : "/inici"}><img title="Fitness" alt="Fitness" src="images/logo.png" /></NavLink>
                                </div>
                                {privat != undefined ? <PrivateNav /> : <PublicNav />}
                                <div id="primary-menu">
                                    <nav id="main-menu">
                                        <ul className="menu">
                                            <li><NavLink className={({ isActive }) => { return (isActive ? "current_page_item" : "") }} to={privat ? "/privat/inici" : "/inici"}>Home</NavLink></li>
                                            <li><NavLink className={({ isActive }) => { return (isActive ? "current_page_item" : "") }} to={privat ? "/privat/forum" : "/forum"}>Forum</NavLink></li>
                                            <li><NavLink className={({ isActive }) => { return (isActive ? "current_page_item" : "") }} to={privat ? "/privat/planificador" : "/planificador"}>Planificador </NavLink></li>
                                            <li><NavLink className={({ isActive }) => { return (isActive ? "current_page_item" : "") }} to={privat ? "/privat/blog" : "/blog"}>Blog</NavLink></li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </header>
                </div>
                {!auth._id && privat ? <Navigate to="/inici" /> : ""}
                {auth._id && !privat ? <Navigate to="/privat/Forum" /> : ""}
                <Outlet />
                <Footer />
            </div>
        )
    }
    else {
        return (
            <h1>Cargant...</h1>
        )
    }
}
