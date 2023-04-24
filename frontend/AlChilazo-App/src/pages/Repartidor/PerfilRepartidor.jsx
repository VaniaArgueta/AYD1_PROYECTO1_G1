import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Divider, Header, Icon, Table,Rating } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

export const PerfilRepartidor = (props) => {
  const url = "http://localhost:4000/Informacion";
  console.log("props")
  console.log(props)
  console.log(props.datos.idUsuario)
  const [nombre, setNombre] = useState("");
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [nacimiento, setNacimiento] = useState("");
  const [telefono, setTelefono] = useState("");
  const [haveLicencia, setHaveLicencia] = useState("");
  const [haveTransporte, setHaveTransporte] = useState("");
  const [numLicencia, setNumLicencia] = useState("");
  const [tipoLicencia, setTipoLicencia] = useState("");
  const [expiracion, setExpiracion] = useState("");
  const [numPlaca, setNumPlaca] = useState("");
  const [tipoPlaca, setTipoPlaca] = useState("");
  const [initialRating, setInitialRating] = useState(0);
  const [idRepartidor, setIdRepartidor] = useState(0);
  const [departamentos, setDepartamentos] = useState([]);
  const [deptoSelected, setDeptoSelected] = useState("");
  const [ciudades, setCiudades] = useState([]);
  const [ciudadSelected, setCiudadSelected] = useState("");
  const [razon, setRazon] = useState("");
  useEffect(() => {
    const data = {
      idusuario: props.datos.idUsuario
    };
    axios.post(url, data).then((response) => {
      console.log(response.data);
      const body = response.data;
      setInitialRating(body.calificacion);
      setNombre(body.nombreCompleto);
      setUsuario(body.username);
      setEmail(body.email);
      setDepartamento(body.departamento);
      setCiudad(body.ciudad);
      setNacimiento(body.nacimiento);
      setTelefono(body.telefono);
      setHaveLicencia(body.tieneLicencia);
      setHaveTransporte(body.tieneTransProp);
      setIdRepartidor(body.idRepartidor);
      if (body.tieneLicencia === 1){
        setNumLicencia(body.numLic);
        setTipoLicencia(body.tipoLic);
        setExpiracion(body.expiracion);
      };
      if (body.tieneTransProp === 1){
        setNumPlaca(body.numPlaca);
        setTipoPlaca(body.tipoPlaca);
      };
    });
  }, []);
  useEffect(() => {
    axios
    .get(`http://localhost:4000/departamentos`, {
        responseType: "json",
    })
    .then((res) => {
        //console.log(res.data)
        setDepartamentos(res.data);
    });
  }, []);

  useEffect(() => {
    if (deptoSelected === "") return;
    axios
    .get(`http://localhost:4000/ciudades/${deptoSelected}`, {
        responseType: "json",
    })
    .then((res) => {
        //console.log(res.data)
        setCiudades(res.data);
    });
  }, [deptoSelected]);

  const handleDepto = (e) => {
    setDeptoSelected(e.target.value);
  };

  const handleCiudad = (e) => {
      setCiudadSelected(e.target.value);
  };  

  function onSubmit(e) {
    e.preventDefault();
    const url = "http://localhost:4000/CambiodeZona";
    const data = {
      idRepartidor: idRepartidor,
      razonCambio: razon,
      departamento: deptoSelected,
      ciudad: ciudadSelected,
    };
    console.log(data);
    axios.post(url, data).then((response) => {
      console.log(response.data);
      if(!response.data.agregado){
          alert(response.data.error)
      }else{
          alert("Se ha enviado correctamente la solicitud");
          props.datos.setTipo(6);
      }
    });
  }
  return (
    <>
      <Grid columns={2} divided>
            <Grid.Column width={10}>
                  <Divider horizontal>
                    <Header as='h4'>
                      <Icon name='info' />
                      Informacion del Usuario
                    </Header>
                  </Divider>
                  <Table definition>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>Nombre Completo</Table.Cell>
                        <Table.Cell>{nombre}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>UserName</Table.Cell>
                        <Table.Cell>{usuario}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Email</Table.Cell>
                        <Table.Cell>{email}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Departamento</Table.Cell>
                        <Table.Cell>{departamento}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Ciudad</Table.Cell>
                        <Table.Cell>{ciudad}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Fecha de Nacimiento</Table.Cell>
                        <Table.Cell>{nacimiento}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Numero de Telefono</Table.Cell>
                        <Table.Cell>{telefono}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Numero de Licencia</Table.Cell>
                        <Table.Cell>{numLicencia}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Tipo de Licencia</Table.Cell>
                        <Table.Cell>{tipoLicencia}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Fecha de Expiracion</Table.Cell>
                        <Table.Cell>{expiracion}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Numero de Placa (Vehiculo)</Table.Cell>
                        <Table.Cell>{numPlaca}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Tipo de Placa</Table.Cell>
                        <Table.Cell>{tipoPlaca}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell><Rating defaultRating={1} maxRating={1} disabled /> Calificacion</Table.Cell>
                        <Table.Cell>{initialRating}</Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
            </Grid.Column>
            <Grid.Column width={6}>
              <Divider horizontal>
                <Header as='h4'>
                  <Icon name='options' />
                    Cambio de Zona Departamental
                </Header>
              </Divider>
                <form onSubmit={onSubmit}>
                  <label htmlFor="inputRazon" className="form-label">
                    Razon de la Solicitud de Cambio de Zona
                  </label>
                  <textarea
                    className="form-control"
                    id="inputRazon"
                    value={razon}
                    required
                    onChange={(e) => setRazon(e.target.value)}
                  />
                  <br></br>
                  <label htmlFor="departamento" className="form-label">
                    Nuevo Departamento
                  </label>
                  <select
                      className="form-select"
                      id="departamento"
                      onChange={handleDepto}
                  >
                      <option value=""></option>
                      {departamentos.map((departamento) => (
                      <option
                          key={departamento.departamento}
                          value={departamento.departamento}
                      >
                          {departamento.departamento}
                      </option>
                      ))}
                  </select>
                  <br></br>
                  <label htmlFor="ciudad" className="form-label">
                      Nueva Ciudad
                  </label>
                  <select className="form-select" id="ciudad" onChange={handleCiudad}>
                      {ciudades.map((ciudad) => (
                      <option key={ciudad.ciudad} value={ciudad.ciudad}>
                          {ciudad.ciudad}
                      </option>
                      ))}
                  </select>
                  <br></br>
                  <button type="submit" className="btn btn-primary">
                    Enviar Solicitud
                  </button>
                </form>
            </Grid.Column>
      </Grid>
    </>
  )
}