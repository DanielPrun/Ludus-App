import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { getTags } from '../../../helpers/Global';

export const Side = ({actualitzarLlistat}) => {

  const [valorCerca, setValorCerca] = useState('');
  const [tags, setTags] = useState([]);
  const [tagsSeleccionats, setTagsSeleccionats] = useState([]);

  useEffect(() => {
    obtenirTags();
  }, [])

  const obtenirTags = async () => {
    setTags(await getTags());
  }

  const cerca = (e) => {
    e.preventDefault();
    let tagsUrl = [];
    if(tagsSeleccionats.length)tagsUrl = tagsSeleccionats.join(',');
    actualitzarLlistat("text="+valorCerca+"&tags="+tagsUrl);
  }

  const seleccionarTag = (e) => {
    e.preventDefault();
    let tagsSeleccionatsActualitzats = [];

    if(e.target.classList.contains('active')){
      e.target.classList.remove('active');
      tagsSeleccionatsActualitzats = tagsSeleccionats.filter(tag => tag != e.target.getAttribute("val"));
    }
    else{
      e.target.classList.add('active');
      tagsSeleccionatsActualitzats = [...tagsSeleccionats, e.target.getAttribute("val")];
    }
    
    setTagsSeleccionats(tagsSeleccionatsActualitzats);
    actualitzarLlistat("text="+valorCerca+"&tags="+tagsSeleccionatsActualitzats.join(','));
  }


  return (
    <section id="secondary-right" className="secondary-has-right-sidebar">
      <aside className="widget widget_crear_article">
        <button><NavLink to="crear">Crear un Article </NavLink></button>
      </aside>
      <aside className="widget widget_cerca">
        <div className="widgettitle">
          <h3>Cerca</h3>
          <span></span>
        </div>
        <form action="#" id="formcerca" method="get" onSubmit={(e) => {cerca(e)}}>
          <input type="text" placeholder="Escriu el que vulguis cercar..." onChange={(e) => {setValorCerca(e.target.value)}} />
          <input type="submit" value="submit" name="submit"  />
        </form>
      </aside>
      {tags.length > 0 ?  (
      <aside className="widget widget_tag_cloud">
        <div className="widgettitle">
          <h3>Tags</h3>
          <span></span>
        </div>
        <div className="tagcloud">
          { tags.map((tag, i) => {
            return (<a key={i} href="#" val={tag.value} onClick={(e) => seleccionarTag(e)}>{tag.label}</a>)
          })}
        </div>
      </aside> ) : ""}

    </section>
  )
}
