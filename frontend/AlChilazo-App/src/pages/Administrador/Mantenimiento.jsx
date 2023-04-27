import React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';

import { InfoBaja } from './InfoBaja';
import { ItemBaja } from './ItemBaja';

export const Mantenimiento = (props) => {
  const urlRep = 'http://localhost:4000/listaRepartidores';
  const urlEmp = 'http://localhost:4000/listaEmpresas';

  const [reqSolicitud, setReqSolicitud] = useState({});
  const [datosAPIRep, setDatosAPIRep] = useState([]);
  const [datosAPIEmp, setDatosAPIEmp] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [tipo, setTipo] = useState(-1);
  const [titulo, setTitulo] = useState('');

  useEffect(() => {
    axios.get(urlRep).then((response) => {
      setDatosAPIRep(response.data);
    });

    axios.get(urlEmp).then((response) => {
      setDatosAPIEmp(response.data);
    });
  }, []);

  function funcShowModal(item, tipo, titu) {
    setReqSolicitud(item);
    setTipo(tipo);
    setTitulo(titu);
    setShowModal(true);
  }

  function onClose() {
    axios.get(urlRep).then((response) => {
      setDatosAPIRep(response.data);

      axios.get(urlEmp).then((response) => {
        setDatosAPIEmp(response.data);
      });
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
              <InfoBaja solicitud={reqSolicitud} tipo={tipo} titulo={titulo} />
            </div>
          ) :
          (
            <div className="rowS">
              <p className="info-lb-label-title"> LISTA REPARTIDORES </p>
              <div className='list'>
                {datosAPIRep.length ? <br /> : <p style={{ fontWeight: "bold", fontSize: "1.2rem" }}>No se encontraron registros.</p>}
              </div>
              {
                datosAPIRep.map((item, index) => {
                  return (
                    <div key={index} onClick={() => funcShowModal(item, 1, 'REPARTIDOR')}>
                      <ItemBaja
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
                        tipo={1}
                        item={item}
                        key={index}
                      />
                    </div>
                  )
                })
              }

              <p className="info-lb-label-title"> LISTA EMPRESAS </p>
              <div className='list'>
                {datosAPIRep.length ? <br /> : <p style={{ fontWeight: "bold", fontSize: "1.2rem" }}>No se encontraron registros.</p>}
              </div>
              {
                datosAPIEmp.map((item, index) => {
                  return (
                    <div key={index} onClick={() => funcShowModal(item, 2, 'EMPRESA')}>
                      <ItemBaja
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