import React, { useContext, useState } from 'react'
import { NavLink, useNavigate} from 'react-router-dom'
import { useForm } from '../../../hooks/useForm';
import { Global, Ajax } from '../../../helpers/Global';

export const Login = () => {

    const {formulari, canviat} = useForm({});
    const [errorMissatge, setErrorMissatge] = useState("");

    let navegar = useNavigate();

    const iniciarSessio = async (e) => {
        e.preventDefault();
        setErrorMissatge("");

        let dadesUsuari = formulari;

        try{
            const resposta = await Ajax(Global.url+"user/login", "POST", dadesUsuari);
            if (resposta.dades.status != "error"){
                
                localStorage.setItem("token", resposta.dades.token);
                localStorage.setItem("usuari", JSON.stringify(resposta.dades.usuari));

                navegar(0);
            }
            else{
                setErrorMissatge(resposta.dades.message);
            }
        } catch (error) {
            console.error(error);
        }

    }

    return (
        <section>
            <h3 className="border-title aligncenter"> <span> <i className="fa fa-user"></i> Inicia sessió </span></h3>
            <div className="fullwidth-section full-pattern3">
                <div className="container">
                    <div className="form-wrapper">
                        <form method="post" id="loginform" name="frmLogin" onSubmit={iniciarSessio}>
                            <input placeholder="Email" id="email" name="email"  type="text" onChange={canviat} required/>
                            <input placeholder="Contrasenya" id="pwd" name="password" type="password" onChange={canviat} required />
                            <p className='missatge_error'>{errorMissatge}</p>
                            <input className="dt-sc-button small" value="Entra" type="submit" />
                        </form>
                    </div>
                </div>
            </div>
            <div className="page_info aligncenter">
                <h4 className="title">Necessites ajuda?</h4>
                <p>Si no t'has registrat encare, <NavLink to="/registre">Registrat aqui!</NavLink></p>
            </div>
        </section>
    )
}
