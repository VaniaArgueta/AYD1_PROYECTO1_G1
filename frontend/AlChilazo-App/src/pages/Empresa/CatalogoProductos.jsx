import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Productos } from './Productos';

export const CatalogoProductos = (props) => {

  const [productos, setProductos] = useState([])

  useEffect(() => {
    axios
      .get(`http://localhost:4000/catalogoProductos/${props.usuario}`, {
        responseType: "json",
      })
      .then((res) => {
        console.log(res.data)
        setProductos(res.data.productos);
      });
  }, []);
  
  
  return (
    <>
      <h2>Catalogo de productos</h2>
      {
        productos.map(producto=>(
          <div>
            {producto.productos.length > 0 &&
               <div>
                  <h3>{producto.categoria.CataProdDsc}</h3>
                <Productos key={producto.categoria.idCateProd} productos={producto.productos}/>
               </div>
              
            }
            
          </div>
        ))
      }
    </>
  )
}