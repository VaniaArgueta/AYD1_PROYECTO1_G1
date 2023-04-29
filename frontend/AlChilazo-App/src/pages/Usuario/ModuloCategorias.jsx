import React from 'react';
import { ListadoCategorias } from './ListadoCategorias';
import { Restaurante } from './Restaurante';
import { EstadoMostrar } from './EstadoMostrar';

export const ModuloCategorias = (props) => {

    const {mostrar, setMostrar} = React.useContext(EstadoMostrar);

    if(mostrar === 0){
        return (
        <><ListadoCategorias/> 
        </>
      )
      }else{
        return(
          <Restaurante/>
        )
      }
}