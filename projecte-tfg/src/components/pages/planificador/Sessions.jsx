import React from 'react'
import { Sessio } from './Sessio'

export const Sessions = () => {
  
    const handleOnDrag = (e, estrink) => {
        e.dataTransfer.setData("estrink", estrink)
    }
  
    return (
    <ul  className='sessions'>
            <li draggable onDragStart={(e) => handleOnDrag(e, "la caca")}>la caca</li>
          <Sessio />
          <Sessio />
          <Sessio />
          <Sessio />
      </ul>
  )
}
