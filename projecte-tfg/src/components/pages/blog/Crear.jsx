import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useForm } from "../../../hooks/useForm";
import { Global, Ajax, getTags } from '../../../helpers/Global';
import CreatableSelect from 'react-select/creatable';
import ContextAutentificador from '../../../context/Autentificador';
import { Alerta } from '../../layout/Alerta';

export const Crear = () => {

  const {formulari, canviat} = useForm({});
  const [tags, setTags] = useState([]);
  const [resultat, setResultat] = useState("");
  const { setTextAlerta } = useContext(ContextAutentificador);


  useEffect(() => {
    obtenirTags()
  }, [])

  const obtenirTags = async () => {
    setTags(await getTags());
  }

  const guardarArticle = async(e) => {
    e.preventDefault();
    setResultat("");    
    const {dades} = await Ajax(Global.url+"crear", "POST", formulari);
    
    if(dades.status === 'success'){
      
      const fileInput = document.querySelector("#file");
      if( fileInput.files[0]){
        const formData = new FormData();
        formData.set("file0", fileInput.files[0], fileInput.files[0].name);

        const pujada = await Ajax(Global.url+"upload-img/"+dades.article._id, "POST", formData, true)

        if(pujada.dades.status === 'success'){
          setTextAlerta("Article creat correctament");
        } else {
          setResultat("error");
          Ajax(Global.url+"article/"+dades.article._id, "DELETE");
        }
      }
      else{
        setTextAlerta("Article creat correctament");
      }
    } else {
      setResultat("error");
    }
    
  }

  return (
    <div className="container crear-article">
        <Alerta />
        <h3 className="border-title aligncenter"> Emplena el formulari per crear un article </h3>
        <h4 className=" aligncenter missatge_error">{resultat == "error" ? "les dades proporcionades son incorrectes" : ""}</h4>
        <form className="frm-crear-article" onSubmit={guardarArticle} >
            <input type="text" name="titol" placeholder="Títol..."  onChange={canviat} required/>
            <div className="select-tag">
                <CreatableSelect name="tag" isClearable options={tags} onChange={canviat}/>
            </div>
            <input id="file" type="file" name="file0" />	
            <textarea name="contingut" placeholder="Contingut..."  onChange={canviat} required />
            <input type="submit" name="submit" value="Crear" />
        </form>
    </div>
  )
}
