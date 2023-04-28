import React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';

import { ItemSolicitud } from './ItemSolicitud';
import { InfoSolicitud } from './InfoSolicitud';

export const SolicitudCambioZona = (props) => {
  const url = 'http://localhost:4000/solicitudesCambioZona';

  const [reqSolicitud, setReqSolicitud] = useState({});
  const [datosAPI, setDatosAPI] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios.get(url).then((response) => {
      setDatosAPI(response.data);
    });
  }, []);

  function funcShowModal(item) {
    setReqSolicitud(item);
    setShowModal(true);
  }

  function onClose() {
    axios.get(url).then((response) => {
      setDatosAPI(response.data);
    });
    setShowModal(false);
  }

  return (
    <>
      {
        showModal === true ?
          (
            <div>
              <Button variant="contained" className="btn-info btn-outline-light btn-sm" startIcon={<ArrowBackIcon />} onClick={() => onClose()}>Regresar</Button>
              <InfoSolicitud solicitud={reqSolicitud} tipo={3} titulo={'CAMBIO ZONA'} />
            </div>
          ) :
          (
            <div className="rowS">
              <p className="info-lb-label-title"> LISTA DE SOLICITUDES </p>
              <div className='list'>
                {datosAPI.length ? <br /> : <p style={{ fontWeight: "bold", fontSize: "1.2rem" }}>No se encontraron registros.</p>}
              </div>
              {
                datosAPI.map((item, index) => {
                  return (
                    <div key={index} onClick={() => funcShowModal(item)}>
                      <ItemSolicitud
                        NoSolicitud={item.NoSolicitud}
                        Nombre={item.Nombre}
                        Razon={item.Razon}
                        tipo={3}
                        item={item}
                        key={index}
                      />
                    </div>
                  )
                })
              }
            </div>
          )
      }
    </>
  )
}