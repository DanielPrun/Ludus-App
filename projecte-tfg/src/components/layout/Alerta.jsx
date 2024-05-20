import React from 'react';
import { useContext } from 'react';
import ContextAutentificador from '../../context/Autentificador';

export const Alerta = () => {

    const { textAlerta, setTextAlerta } = useContext(ContextAutentificador);

    const eliminarAlerta = () => {
        setTextAlerta("");
    }
    if(textAlerta != ""){
    return (
        <div className='container-alerta'>
            <div className='alerta' onClick={eliminarAlerta}>
                <i className="fa-solid fa-check" />
                {textAlerta}
                <i className="fa-solid fa-xmark" />
            </div>
        </div>
    )
    }
    else{
        return (<></>)
    }
}
