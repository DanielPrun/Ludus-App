import React from 'react'
import { NavLink } from 'react-router-dom'

export const PublicNav = () => {
  return (
    <div className="top-right">
        <ul>
            <li><NavLink  to="/login"><p>Inicia sessió</p><i className='fa-solid fa-arrow-right-to-bracket' /></NavLink></li>
            <li><NavLink  to="/registre"><p>Registre</p> <i className="fa-solid fa-pen-to-square" /></NavLink></li>
        </ul>
    </div>
  )
}
