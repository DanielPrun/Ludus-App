import React, { useEffect, useState } from 'react'

export const Sessio = ({selected = false, sessio, setSelected, index, setLlistatExercisis}) => {

    const [exercisis, setExercisis] = useState([]);

    useEffect(() => {   
    }, []);

    const handleOnDrop = (e) => {
        const exercici = JSON.parse(e.dataTransfer.getData("exercici"));
        setExercisis([...exercisis, exercici.titol])
    }
    
    const handdleDragOver = (e) => {
        e.preventDefault();
    }

    const handleOnDrag = (e, sessio) => {
        e.dataTransfer.setData("sessio", sessio)
    }

    const handleSeleccionar = () => {
        setSelected(index);
        setLlistatExercisis(sessio.aceptades)
    }

  return (
    <li style={selected ? {backgroundColor: "rgb("+sessio.color+" / 40%)", border: "2px solid rgb("+sessio.color+")"} : {backgroundColor: "rgb("+sessio.color+" / 40%)"}}
        onClick={handleSeleccionar}
        onDrop={selected ? handleOnDrop : () =>{}} 
        onDragOver={handdleDragOver} 
        draggable 
        onDragStart={(e) => handleOnDrag(e, JSON.stringify([sessio.titol, sessio.color, exercisis, sessio._id]))}
        key={sessio._id}
        className='liSessio'
        >
            <p className='titolSessio'>{sessio.titol}</p>  
            <ul className='llistatExSessio'>
                {exercisis.map((ex, index) => {
                    return <li key={index}>{ex}</li>
                })}
            </ul>
    </li>
  )
}
