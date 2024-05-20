import React from 'react'
import { Side } from './Side'
import { useState, useEffect } from 'react'
import { Global, Ajax } from '../../../helpers/Global';
import { Link, useNavigate } from 'react-router-dom';

export const Articles = ({privat}) => {

  const [articles, setArticles] = useState([]);
  const [llistatArticles, setLlistatArticles] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [numArticles, setNumArticles] = useState(0);

  let navegar = useNavigate();

  useEffect(() => {
    getArticles()
  }, [])

  const getArticles = async (filtre = '') => {
    let url = "";

    if(!filtre){
      url = Global.url+"articles";
    }
    else {
      url = Global.url+"cerca?"+filtre;
    }

    const {dades, cargant} = await Ajax(url, "GET");

    if(dades.status === "success"){
      let articlesRebuts = dades.articles;
      setNumArticles(articlesRebuts.length);
      setArticles([...articlesRebuts]);
      setLlistatArticles(articlesRebuts.splice((pagina-1)*10,10));
    }
  }

  const borrar = async(e, id) => {
    e.preventDefault();
    const confirmacio = window.confirm('Estas segur de que vols borrar aquest article?');
    if(confirmacio) {
      let {dades} = await Ajax(Global.url+"article/"+id, "DELETE");

      if(dades.status === "success"){
        let articlesActualitzats = articles.filter(article => article._id !== id);
        setArticles(articlesActualitzats);
        setLlistatArticles(llistatArticles.filter(article => article._id !== id));
      }
    }
  }

  const navegarAEditar = (e, id) => {
    e.preventDefault();
    navegar("/privat/blog/editar/"+id);
  }
  
  const escollirPagina = (e, pg) => {
    e.preventDefault();
    setPagina(pg);
    let aux = [...articles];
    setLlistatArticles(aux.splice((pg-1)*10,10));
  }

  const pagines = Array.from({ length: Math.ceil(numArticles/10) }, (_, index) => index + 1);
  
  return (
    <div className="container">
      <section id="primary">
        {
          articles.length >= 1 ? (
            llistatArticles.map(article => {
              const data = new Date(article.data);
              return (
                <article key={article._id} className="blog-entry">
                  <Link to={privat ?  "/privat/blog/article/"+article._id : "/blog/article/"+article._id}>
                    <div className="entry-title">
                      <h4>{article.titol}</h4>
                      <div className="fila-tag">
                        <p>{article.tag != 'null' ? article.tag : ""} </p>
                        <div>
                          <a href="#"  onClick={(e) => {borrar(e, article._id)}} > <i className="fa-solid fa-trash-can"></i> </a> &nbsp;
                          <a href="#"  onClick={(e) => {navegarAEditar(e, article._id)}} > <i className="fa-solid fa-pen-to-square"></i> </a>
                        </div>
                      </div>
                    </div>
                    <div className="entry-thumb">
                      <img title="" alt="" src={Global.url + "img/" + article.img} />
                      <div className="date">
                        <span>{data.getDate()}</span><br />
                        {data.toLocaleString('default', { month: 'short' })}<br />
                        {data.getFullYear()}
                      </div>
                    </div>
                    <div className="entry-body">
                      <p>{article.contingut.length > 90 ? article.contingut.slice(0, 90) + '...' : article.contingut}</p>
                      Llegeix més {'>>'} <i className="fa fa-angle-double-right"></i>
                    </div>
                  </Link>
                </article>
              )
            }))
            :
            (
              <h1>No hi ha Articles</h1>
            )
        }
        {numArticles > 10 ? 
        <div className="pagination">
          {pagina > 1 ?
            <div className="prev-post">
              <a href="#" onClick={(e) => {escollirPagina(e, pagina-1)}} >Previa</a> 
            </div>
          : "" }
          <ul>
            {pagines.map((pg) => ( pg == pagina ?
              (<li key={pg} id={pg} className="active-page" >{pg}</li>)
              :
              (<li key={pg} id={pg}>
                <a href="#" onClick={(e) => {escollirPagina(e,pg)}}>
                  {pg}
                </a>
              </li>)
            ))}
          </ul>
          {pagina < Math.ceil(numArticles/10) ?
            <div className="next-post">
              <a href="#" onClick={(e) => {escollirPagina(e,  pagina+1)}}>Seguent </a>
            </div>
          : ""}
        </div>
        : "" 
        }
      </section>
      <Side actualitzarLlistat={getArticles} />
    </div>
  )
}
