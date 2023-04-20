import React from 'react';
import { useState } from 'react';
import axios from "axios";
import './style.css';

export const InfoSolicitud = (props) => {

  const [procesado, setProcesado] = useState(false);

  const url = 'http://localhost:4000/aprobarSolicitud';

  function processRequest(idReq, idUser, estado) {
    console.log("id: " + idReq + "idUser: " + idUser + ", estado: " + estado);
    axios
      .post(url, {
        estado: estado,
        idSolicitud: idReq,
        idUsuario: idUser,
        tipo: 1
      })
      .then((response) => {
        console.log(response.data);
        alert('Operacion realizada con exito.');
        setProcesado(true);
      });
  }

  return (
    <>
      <div>
        <p className="info-lb-label-title">SOLICITUD DE {props.titulo} </p>
        {
          props.tipo === 1
            ? (
              <div className="info-card-container border-gray rounded border d-flex flex-row align-items-center ">
                <div className="position-relative border-gray border-right px-4 rounded-left">
                  <label className='info-lb-label'>Nombres: </label>
                  <span className="info-value d-block">[ {props.solicitud.RepNom1 + ' ' + props.solicitud.RepNom2} ]</span>
                  <label className='info-lb-label'>Apellidos: </label>
                  <span className="info-value d-block">[ {props.solicitud.RepApe1 + ' ' + props.solicitud.RepApe2} ]</span>
                  <label className='info-lb-label'>Año de Nac.: </label>
                  <span className="info-value d-block">[ {props.solicitud.RepFecNac} ]</span>
                  <label className='info-lb-label'>Telefono: </label>
                  <span className="info-value d-block">[ {props.solicitud.RepNumCel} ]</span>
                  <label className='info-lb-label'>Posee Transporte: </label>
                  <span className="info-value d-block">[ {props.solicitud.RepTransProp === 1 ? 'SI' : 'NO'} ]</span>
                  <label className='info-lb-label'>Pais: </label>
                  <span className="info-value d-block">[ {props.solicitud.pais} ]</span>
                  <label className='info-lb-label'>Ciudad: </label>
                  <span className="info-value d-block">[ {props.solicitud.ciudad} ]</span>
                  <label className='info-lb-label'>Departamento: </label>
                  <span className="info-value d-block">[ {props.solicitud.departamento} ]</span>

                  <button type="button" className="button-44 btn-outline-warning" onClick={(e) => processRequest(props.solicitud.idRepartidor, props.solicitud.idUsuario, 1)} disabled={procesado}>
                    Activar
                  </button>
                  <button type="button" className="button-42 btn-outline-warning" onClick={(e) => processRequest(props.solicitud.idRepartidor, props.solicitud.idUsuario, 3)} disabled={procesado}>
                    Rechazar
                  </button>
                  {
                    procesado === true ? <span style={{
                      color: "white", fontw
                        : "bold"
                    }}> Procesado! </span> : <></>
                  }
                </div>
                <div className="col-md-8" style={{ height: "380px", background: '#06263b' }}>
                  <object data={props.solicitud.RepCV} type="application/pdf" width="100%" height="100%">
                    <p> <a href={props.solicitud.RepCV}>Mostrar Pdf</a></p>
                  </object>
                </div>
              </div>
            )
            :
            (
              <div className="info-card-container border-gray rounded border d-flex flex-row align-items-center ">
                <div className="position-relative border-gray border-right px-4 rounded-left">
                  <label className='info-lb-label'>Nombres: </label>
                  <span className="info-value d-block">[ {props.solicitud.RepNom1 + ' ' + props.solicitud.RepNom2} ]</span>
                  <label className='info-lb-label'>Apellidos: </label>
                  <span className="info-value d-block">[ {props.solicitud.RepApe1 + ' ' + props.solicitud.RepApe2} ]</span>
                  <label className='info-lb-label'>Año de Nacimiento: </label>
                  <span className="info-value d-block">[ {props.solicitud.RepFecNac} ]</span>
                  <label className='info-lb-label'>Telefono: </label>
                  <span className="info-value d-block">[ {props.solicitud.RepNumCel} ]</span>
                  <label className='info-lb-label'>Posee Transporte: </label>
                  <span className="info-value d-block">[ {props.solicitud.RepTransProp} ]</span>
                  <label className='info-lb-label'>Pais: </label>
                  <span className="info-value d-block">[ {props.solicitud.pais} ]</span>
                  <label className='info-lb-label'>Ciudad: </label>
                  <span className="info-value d-block">[ {props.solicitud.ciudad} ]</span>
                  <label className='info-lb-label'>Departamento: </label>
                  <span className="info-value d-block">[ {props.solicitud.departamento} ]</span>
                </div>
                <div className="col-md-8" style={{ height: "380px", background: '#06263b' }}>
                  <object data={props.solicitud.RepCV} type="application/pdf" width="100%" height="100%">
                    <p> <a href={props.solicitud.RepCV}>Mostrar Pdf</a></p>
                  </object>
                </div>
              </div>
            )
        }
      </div>
    </>
  )
}