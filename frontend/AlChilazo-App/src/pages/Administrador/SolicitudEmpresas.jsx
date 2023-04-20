import React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';

import { ItemSolicitud } from './ItemSolicitud';
import { InfoSolicitud } from './InfoSolicitud';

export const SolicitudEmpresas = (props) => {
  const url = 'http://localhost:4000/solicitudesEmpresa';
  const urlDocs = 'http://localhost:4000/docsEmpresa';

  const [reqSolicitud, setReqSolicitud] = useState({});
  const [reqDocsSolicitud, setReqDocsSolicitud] = useState([]);
  const [datosAPI, setDatosAPI] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios.get(url).then((response) => {
      setDatosAPI(response.data);
    });
  }, []);

  function funcShowModal(item) {
    axios.post(urlDocs, {
      idEmpresa: item.idEmpresa
    }).then((response) => {
      const { data } = response.data || [];
      console.log(data);
      setReqDocsSolicitud(data);
      setReqSolicitud(item);
      setShowModal(true);
    });
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
              <InfoSolicitud solicitud={reqSolicitud} docs={reqDocsSolicitud} tipo={2} titulo={'EMPRESA'} />
            </div>
          ) :
          (
            <div className="rowS">
              {
                datosAPI.map((item, index) => {
                  return (
                    <div key={index} onClick={() => funcShowModal(item)}>
                      <ItemSolicitud
                        idEmpresa={item.idEmpresa}
                        idTipEmp={item.idTipEmp}
                        idCiudad={item.idCiudad}
                        idDepto={item.idDepto}
                        idPais={item.idPais}
                        NIT={item.NIT}
                        EmpNombre={item.EmpNombre}
                        EmpDsc={item.EmpDsc}
                        EmpEmail={item.EmpEmail}
                        EmpEst={item.EmpEst}
                        EmpFecAlta={item.EmpFecAlta}
                        EmpFecBaja={item.EmpFecBaja}
                        idUsuario={item.idUsuario}
                        tipoEmpresa={item.tipoEmpresa}
                        pais={item.pais}
                        departamento={item.departamento}
                        ciudad={item.ciudad}
                        tipo={2}
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