import React from 'react'
import { useEffect, useState } from 'react'
import { SideForum } from './SideForum';
import { Alerta } from '../../layout/Alerta';
import { FeedPrivat } from './FeedPrivat';
import { FeedGlobal } from './feedGlobal';


export const Forum = ({ privat }) => {

  const [tabGlobal, setTabGlobal] = useState(false);
  const [tabSeguint, setTabSeguint] = useState(false);

  useEffect(() => {
    if (privat != undefined) {
      setTabSeguint(true);
    }
    else{
      setTabGlobal(true);
    }
  }, [])

  const canviarTab = () => {
    setTabSeguint(!tabSeguint)
    setTabGlobal(!tabGlobal);
  }


  return (
    <div className="container">
      <Alerta />
      <section id="primary" style={privat != undefined ? {} : { width: '100%' }}>
        {privat != undefined ?
          <div className='container-tabs'>
            <div className='switch-tabs'>
              <div className='background-activeTab'  style={tabSeguint ? { left: '10px' } : { left: '120px' }}></div>
              <button className={tabSeguint ? 'active' : ''} onClick={canviarTab}>Seguint</button>
              <button className={tabGlobal ? 'active' : ''} onClick={canviarTab}>Global</button>
            </div>
          </div>
          : ''}
        <h2 className="timeline__title">Timeline</h2>
        { tabSeguint ?
          <FeedPrivat />
          :
          <FeedGlobal />
        }
      </section>
      {privat != undefined ? <SideForum /> : ""}
    </div>
  )
}
