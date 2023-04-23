import React from 'react';

import './Empresa.css'

export const PanelControl = ({setTipo}) => {
  
  return (
    <>
      <div className='empresa'>
        <div className='panel-buttons'>
          <h2>PANEL DE CONTROL</h2>
          <button type="button" className="btn btn-outline-danger btn-lg" onClick={()=>setTipo(151)}>Agregar producto</button>
          <button type="button" className="btn btn-outline-danger btn-lg" onClick={()=>setTipo(152)}>Editar/Elimnar productos</button>
          <button type="button" className="btn btn-outline-danger btn-lg" onClick={()=>setTipo(14)}>Ver catalogo de productos</button>
        </div>
      </div>
    </>
  )
}