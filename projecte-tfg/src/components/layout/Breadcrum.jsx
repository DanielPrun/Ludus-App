import React from 'react'
import { NavLink } from 'react-router-dom'

export const Breadcrum = ({pare, fill}) => {
  return (
    <div className="breadcrumb-wrapper">
        <div className="container">
          <h1>{fill}</h1>
          <div className="breadcrumb">
            <NavLink to="../inici">Home</NavLink>
            &nbsp; | &nbsp;
            <h4><NavLink to={`../${pare}`}>{pare}</NavLink></h4>
            {pare != undefined ?  ` | ` : ""}
            <h4>{fill}</h4>
          </div>
        </div>
      </div>
  )
}
