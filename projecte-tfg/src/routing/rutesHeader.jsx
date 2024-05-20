import React from "react";
import {Routes, Route, BrowserRouter, Navigate, Link} from "react-router-dom";
import {Inici} from "../components/pages/Inici"; 
import {Articles} from "../components/pages/blog/Articles"; 
import {Crear} from "../components/pages/blog/Crear"; 
import {Editar} from "../components/pages/blog/Editar"; 
import {ArticleSingle} from "../components/pages/blog/Article-single"; 
import {Header} from "../components/layout/Header";
import {Breadcrum} from "../components/layout/Breadcrum";
import {Login} from "../components/pages/usuari/Login";
import {Register} from "../components/pages/usuari/Register";
import {Forum} from "../components/pages/forum/Forum";
import {Planificador} from "../components/pages/planificador/Planificador";
import { Autentificador } from "../context/Autentificador";
import { Perfil } from "../components/pages/usuari/Perfil";

export const RutesHeader = () => {
  return (
    <BrowserRouter>
      <Autentificador>
      <Routes>
        <Route path="/" element={<Header />} >
          <Route index element={<Inici/>} />
          <Route path="inici" element={<Inici/>} />
          <Route path="blog" element={<><Breadcrum fill="Blog"/><Articles /></>} />

          <Route path="blog/article/:id" element={<><Breadcrum pare="Blog" fill=""/><ArticleSingle /></>} />
          
          <Route path="forum" element={<><Breadcrum fill="Forum"/><Forum/></>} />

          <Route path="planificador" element={<><Breadcrum fill="planificador"/><Planificador/></>} />
          
          <Route path="login" element={<><Breadcrum  fill="Login"/><Login /></>} />
          <Route path="registre" element={<><Breadcrum  fill="Registre"/><Register /></>} />
        </Route>

        <Route path="/privat" element={<Header privat />} >
          <Route index element={<Inici/>} />
          <Route path="inici" element={<Inici/>} />
          
          <Route path="blog" element={<><Breadcrum fill="Blog"/><Articles privat /></>} />
          <Route path="blog/crear" element={<><Breadcrum pare="Blog" fill="Crear article"/><Crear /></>} />
          <Route path="blog/editar/:id" element={<><Breadcrum pare="Blog" fill="Editar article"/><Editar /></>} />
          <Route path="blog/article/:id" element={<><Breadcrum pare="Blog" fill=""/><ArticleSingle /></>} />
          
          <Route path="perfil/:id?" element={<Perfil />} />

          <Route path="forum" element={<><Breadcrum fill="Forum"/><Forum privat /></>} />

          <Route path="planificador" element={<><Breadcrum fill="planificador"/><Planificador/></>} />

        </Route>

        <Route path="*" element={<><h1>Error 404</h1><Link to="/"> Torna al Inici </Link></>} />
      </Routes>
      </Autentificador>
    </BrowserRouter>
  )
}
