import React, {useState} from 'react';
import { ModuloCategorias } from './ModuloCategorias';
import { Restaurante } from './Restaurante';
import { EstadoMostrar } from './EstadoMostrar';


export const Categorias = (props) => {
  
  const [mostrar, setMostrar] = React.useState(0);

  return (
    <EstadoMostrar.Provider value={{mostrar, setMostrar}}>
      <ModuloCategorias />
    </EstadoMostrar.Provider>
  )
}