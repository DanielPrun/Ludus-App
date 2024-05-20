import React, { useEffect, useState } from 'react'
import { Global, Ajax } from '../../../helpers/Global';
import { useParams } from 'react-router-dom';

export const ArticleSingle = () => {

  const [article, setArticle] = useState({});
  const [data, setData] = useState(new Date());
  const { id } = useParams();

  useEffect(() => {
    getArticle();
  }, [])

  const getArticle = async () => {

    const { dades, cargant } = await Ajax(Global.url + "article/" + id, "GET");
    
    if (dades.status === "success") {
      setArticle(dades.article);
      setData(new Date(dades.article.data));
    }
  }
  
  return (
    <section id="primary" className="content-full-width">
      <div className="container">
        <article className="article-single-content ">
          <h1>{article.titol}</h1>
          <div className="entry-thumb">
            <img src={Global.url + "img/" + article.img} alt="" title="" />
            <div className="date">
              <span>{data.getDate()}</span><br />
              {data.toLocaleString('default', { month: 'short' })}<br />
              {data.getFullYear()}
            </div>
          </div>
          {article.tag != "null" ? <p className="tags">{article.tag} </p> : "" }
          <p dangerouslySetInnerHTML={{ __html: article.contingut}}></p>
        </article>
      </div>
    </section>
  )
}
