import React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';

import { ItemSolicitud } from './ItemSolicitud';
import { InfoSolicitud } from './InfoSolicitud';

export const SolicitudRepartidores = (props) => {
  const url = 'http://localhost:4000/solicitudesRepartidor';

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
              <InfoSolicitud solicitud={reqSolicitud} tipo={1} titulo={'REPARTIDOR'} />
            </div>
          ) :
          (
            <div className="rowS">
              {
                datosAPI.map((item, index) => {
                  return (
                    <div key={index} onClick={() => funcShowModal(item)}>
                      <ItemSolicitud
                        idRepartidor={item.idRepartidor}
                        idCiudad={item.idCiudad}
                        idDepto={item.idDepto}
                        idPais={item.idPais}
                        RepNom1={item.RepNom1}
                        RepNom2={item.RepNom2}
                        RepApe1={item.RepApe1}
                        RepApe2={item.RepApe2}
                        RepFecNac={item.RepFecNac}
                        RepFecEstatus={item.RepFecEstatus}
                        RepFecEstAlta={item.RepFecEstAlta}
                        RepFecEstBaja={item.RepFecEstBaja}
                        RepNumCel={item.RepNumCel}
                        RepCorrElect={item.RepCorrElect}
                        RepCV={item.RepCV}
                        RepTransProp={item.RepTransProp}
                        RepEst={item.RepEst}
                        idUsuario={item.idUsuario}
                        pais={item.pais}
                        departamento={item.departamento}
                        ciudad={item.ciudad}
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