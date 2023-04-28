import React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import { ItemUsuario } from './ItemUsuario';


export const DeshabilitarUsuarios = (props) => {

  const url = 'http://localhost:4000/listaUsuarios';

  const [datosAPI, setDatosAPI, datosAPIRef] = useState([]);

  useEffect(() => {
    axios.get(url).then((response) => {
      setDatosAPI(response.data);
    });
  }, []);

  function charge(item) {
    console.log(item)
    axios.get(url).then((response) => {
      setDatosAPI(response.data);
    });
  }

  return (
    <>
      <div className="rowS">
        <p className="info-lb-label-title"> LISTA DE USUARIOS </p>
        {
          datosAPI.map((item, index) => {
            return (
              <div key={index} onClick={() => charge(item)}>
                <ItemUsuario
                  nombre={item.nombre}
                  apellido={item.apellido}
                  usuario={item.usuario}
                  correo={item.email}
                  estado={item.estado}
                  rol={item.rol}
                  idUsuario={item.idUsuario}
                  item={item}
                  key={index}
                />
              </div>
            )
          })
        }
      </div>
    </>
  )
}