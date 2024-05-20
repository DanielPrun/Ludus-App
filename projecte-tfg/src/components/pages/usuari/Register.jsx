import React, { useState } from 'react'
import { useForm } from '../../../hooks/useForm';
import { Global, Ajax } from '../../../helpers/Global';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
    const {formulari, canviat} = useForm({});
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorMissatge, setErrorMissatge] = useState("");
    let navegar = useNavigate();

    const guardarUsuari = async (e) => {
        e.preventDefault();
        setErrorMissatge("")
        let newUser = formulari;

        if(formulari.password == formulari.c_pwd){      
            try{
                const resposta = await Ajax(Global.url+"user/registre", "POST", newUser);
                if (resposta.dades.status != "error"){
                    alert("Has estat registrat correctament");
                    navegar("/login");
                }
                else{
                    setErrorMissatge(resposta.dades.message);
                }
            } catch (error) {
                console.error(error);
            }
        }
        else{
            setErrorMissatge("Les contrasenyes no coincideixen");
            setErrorPassword(true);
        }
    }

    return (
        <section>
            <h3 className="border-title aligncenter"> <span> <i className="fa fa-user"></i> No estàs registrat? - Passa a ser Usuari de fitnessApp! </span></h3>
            <div className="fullwidth-section full-pattern3">
                <div className="container">
                    <div className="form-wrapper">
                        <form method="post" id="reg_form" name="frmRegister" onSubmit={guardarUsuari}>
                            <p className="dt-sc-one-half column first">
                                <input placeholder="Nom" id="nom" name="nom" type="text" onChange={canviat} maxlength="30" required/>
                            </p>
                            <p className="dt-sc-one-half column">
                                <input placeholder="Cognom" id="cognom" name="cognom" type="text" onChange={canviat} maxlength="80" required/>
                            </p>
                            <p className="dt-sc-one-half column first">
                                <input placeholder="Email" id="email" name="email" type="email" onChange={canviat} required/>
                            </p>
                            <p className="dt-sc-one-half column">
                                <input placeholder="Nick" id="Nick" name="nick" type="text" onChange={canviat} maxlength="30" required/>
                            </p>
                            <p className="dt-sc-one-half column first">
                                <input placeholder="Contrasenya" className={ errorPassword ? 'error_input' : ''} name="password" type="password" maxlength="40" onChange={(e) => {setErrorPassword(false); canviat(e)}} required/>
                            </p>
                            <p className="dt-sc-one-half column ">
                                <input placeholder="Repeteix la contrasenya" className={ errorPassword ? 'error_input' : ''} name="c_pwd" type="password" maxlength="40" onChange={(e) => {setErrorPassword(false); canviat(e)}} required/>
                            </p>
                            <p className='missatge_error'>{errorMissatge}</p>
                            <input className="dt-sc-button small" value="Registra't" type="submit" />
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
