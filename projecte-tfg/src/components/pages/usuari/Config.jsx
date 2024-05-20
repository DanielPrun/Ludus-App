import React from 'react'
import { useContext, useState } from 'react';
import ContextAutentificador from '../../../context/Autentificador';
import { Global, Ajax } from '../../../helpers/Global';

export const Config = () => {

    const {auth, setAuth} = useContext(ContextAutentificador);

    const [desactivar, setDesactivar] = useState(true);
    const [errorMissatge, setErrorMissatge] = useState("");
    const [errorPassword, setErrorPassword] = useState(false);
    const [formKey, setFormKey] = useState(1);

    const validarPassword = async (e) => {
        e.preventDefault();
        setErrorMissatge("");
        setErrorPassword(false);       
        
        try{
            const resposta = await Ajax(Global.url+"user/login", "POST", {"password": e.target.password.value, "email": auth.email});
            if (resposta.dades.status != "error"){
                
                guardarUsuari(e.target);

            }
            else{
                setErrorPassword(true);
                setErrorMissatge(resposta.dades.message);
            }
        } catch (error) {
            console.error(error);
        }
        
    }

    const guardarUsuari = async (form) => {
        const formData = new FormData(form);
        const token = localStorage.getItem("token");

        const completeObj = {};
        for(let [name, value] of formData){
            completeObj[name] = value;
        }
        console.log(completeObj["file0"])
        const opcions = {
            method: "PUT",
            body: JSON.stringify(completeObj),
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        }
        
        const peticio = await fetch(Global.url + "user/actualitzar", opcions);
        const dades = await peticio.json();
        
        if(dades.status == "success"){
            if(dades.user){
                //actualitzem el avatar
                if(completeObj["file0"].size > 0){
                    const formData = new FormData();
                    formData.append('file0', completeObj["file0"]);
                    
                    const opcions2 = {
                        method: "POST",
                        body: formData,
                        headers: {
                            "Authorization": token
                        }
                    }

                    const peticioAvatar = await fetch(Global.url + "user/pujarImg", opcions2);
                    const dadesAvatar = await peticioAvatar.json();

                    if(dadesAvatar.status == "success"){
                        setAuth(dadesAvatar.user);
                    }
                    else{
                        setErrorMissatge(dadesAvatar.message);
                        setAuth(dades.user);
                    }
                }
                else{
                    setAuth(dades.user);
                }
                setDesactivar(true);
            }
            else{
                setErrorMissatge("Error l'email o el nick ja existeixen");
            }
        }
        else{
            setErrorMissatge("Error al guardar l'usuari");
        }
        
    };
 
    const tencarEdicio = () =>{
        setFormKey(formKey+1);
        setDesactivar(true);
        setErrorPassword(false);
        setErrorMissatge("");
    }

  return (
    <div className="form-wrapper">
        <form method="post" id="config_form" name="frmConfig" onSubmit={validarPassword} key={formKey}>
            <p className="dt-sc-one-half column first">
                <input placeholder="Nom" id="nom" name="nom" type="text" defaultValue={auth.nom}  maxLength="30" disabled={desactivar}  required/>
            </p>
            <p className="dt-sc-one-half column">
                <input placeholder="Cognom" id="cognom" name="cognom" type="text" defaultValue={auth.cognom}  maxLength="80" disabled={desactivar} required/>
            </p>
            <p className="dt-sc-one-half column first">
                <input placeholder="Email" id="email" name="email" type="email" defaultValue={auth.email} disabled={desactivar} required/>
            </p>
            <p className="dt-sc-one-half column">
                <input placeholder="Nick" id="Nick" name="nick" type="text" defaultValue={auth.nick} maxLength="30" disabled={desactivar} required/>
            </p>
            <input id="file" type="file" name="file0" className='aligncenter' disabled={desactivar}  />	
            <textarea name="bio" placeholder='Escriu la teva bio...' defaultValue={auth.bio} disabled={desactivar} maxLength="700" ></textarea>

            {desactivar ? '' :
                <p className="dt-sc-one-half  aligncenter peticio-password" >
                    <label htmlFor='password'>Entra la password per poder guardar:</label>
                    <input placeholder="Contrasenya" name="password" type="password" className={ errorPassword ? 'error_input' : ''} required/>
                </p>
            }


            
            {desactivar ? 
                <button className="dt-sc-button small aligncenter" onClick={() => {setDesactivar(false)}}>  ✎ edita </button>
            :  
                <>
                    <input className="dt-sc-button small aligncenter" value="Guarda" type="submit" />
                    <a className="aligncenter" onClick={tencarEdicio}> deixa de editar </a>
                </>
            }
            <p className='missatge_error aligncenter'>{errorMissatge}</p>
        </form>
    </div>
  )
}
