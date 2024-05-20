import React from 'react'

export const Exercici = ({exercici}) => {
  
  return (
    <section id="primary" className="page-with-sidebar page-with-right-sidebar">
      <h3 className="border-title"> <span> Exercicis </span></h3>
      <h4>{exercici.titol}</h4>
      <div className="dt-sc-workout-detail">
        <div className="dt-sc-one-half column first">
          <iframe src="http://player.vimeo.com/video/106579765" height="250"></iframe>
        </div>
        <div className="dt-sc-one-half column">
          <div className="dt-excersise-detail">
            <h6>Grup muscular:</h6>
            <p className="exercisisSpecs">{exercici.grupMuscular}</p>
            <h6>Disciplina:</h6>
            <p className="exercisisSpecs">{exercici.disciplina}</p>
            <h6>Equipament:</h6>
            <p className="exercisisSpecs">{exercici.equipament}</p>
          </div>
        </div>
        <p>{exercici.descripció}</p>
      </div>
    </section>
  )
}
