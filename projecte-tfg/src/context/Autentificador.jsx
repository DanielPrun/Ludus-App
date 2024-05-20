import React, { createContext, useEffect, useState } from 'react'
import { Global } from '../helpers/Global';

const ContextAutentificador = createContext();

export const Autentificador = ({ children }) => {

    const [auth, setAuth] = useState({});
    const [contadors, setcontadors] = useState({});
    const [loading, setloading] = useState(true);
    const [textAlerta, setTextAlerta] = useState("");

    useEffect(() => {
        autentificarUsuari();
    }, []);

    const autentificarUsuari = async() => {

        const token = localStorage.getItem("token");
        const usuari = localStorage.getItem("usuari");

        if(!token || !usuari){
            setloading(false);
            return false;
        }
        
        const dadesUsuari = JSON.parse(usuari);
        const idUsuari = dadesUsuari.id;

        const peticio = await fetch(Global.url + "user/perfil/" + idUsuari, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });

        const dades = await peticio.json();

        const peticioContadors = await fetch(Global.url + "user/contadors/" + idUsuari, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });

        const dadesContadors = await peticioContadors.json();
        
        setAuth(dades.user);
        setcontadors(dadesContadors);
        setloading(false);
    }

    return (
        <ContextAutentificador.Provider value ={{auth, setAuth, contadors, loading, textAlerta, setTextAlerta}}>
            {children}
        </ContextAutentificador.Provider>
    )
}

export default ContextAutentificador;
