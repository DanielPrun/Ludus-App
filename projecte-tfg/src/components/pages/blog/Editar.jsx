import React from 'react';
import { useState, useEffect } from 'react';
import { useForm } from "../../../hooks/useForm";
import { Global, Ajax, getTags} from '../../../helpers/Global';
import CreatableSelect from 'react-select/creatable';
import { useParams } from 'react-router-dom';


export const Editar = () => {

  const {formulari, enviat, canviat} = useForm({});
  const [article, setArticle] = useState({});
  const [tags, setTags] = useState([]);
  const { id } = useParams();
  const [resultat, setResultat] = useState("no enviat");

  useEffect(() => {
    obtenirTags();
    getArticle();
  }, [])
  const getArticle = async () => {

    const { dades, cargant } = await Ajax(Global.url + "article/" + id, "GET");

    if (dades.status === "success") {
      setArticle(dades.article);
    }
  }

  const editarArticle = async(e) => {
    e.preventDefault();
    
    let nouArticle = formulari;
    
    const { dades, cargant } = await Ajax(Global.url + "article/" + id, "PUT", nouArticle);
    
    if(dades.status === "success"){
      setResultat("guardat");

      const fileInput = document.querySelector("#file");
      if( fileInput.files[0]){
        const formData = new FormData();
        formData.set("file0", fileInput.files[0], fileInput.files[0].name);

        const pujada = await Ajax(Global.url+"upload-img/"+dades.article._id, "POST", formData, true)

        if(pujada.dades.status === 'success'){
          setResultat("guardat");
        } else {
          setResultat("error");
          Ajax(Global.url+"article/"+dades.article._id, "DELETE");
        }
      }

    }
    else{
      setResultat("error");
    }


  }

  const obtenirTags = async () => {
    setTags(await getTags());
  }

  return (
    <div className="container crear-article">
        <h3 className="border-title aligncenter"> Edita l'article: <i>{article.titol}</i> </h3>
        <h4 className=" aligncenter">{resultat == "guardat" ? "Article guardat" : ""}</h4>
        <h4 className=" aligncenter">{resultat == "error" ? "les dades proporcionades son incorrectes" : ""}</h4>
        <form className="frm-crear-article" onSubmit={editarArticle} >
            <input type="text" name="titol" placeholder="Títol..." defaultValue={article.titol}  onChange={canviat} required/>
            <div className="select-tag">
                {article.tag ? <CreatableSelect name="tag" isClearable options={tags} defaultValue ={{label: article.tag, value: article.tag}} onChange={canviat}/> : "" }
            </div>
            <img title="" alt="" src={Global.url + "img/" + article.img} />
            <input id="file" type="file" name="file0" />	
            <textarea name="contingut" placeholder="Contingut..." defaultValue={article.contingut} onChange={canviat} required />
            <input type="submit" name="submit" value="Editar" />
        </form>
    </div>
  )
}
