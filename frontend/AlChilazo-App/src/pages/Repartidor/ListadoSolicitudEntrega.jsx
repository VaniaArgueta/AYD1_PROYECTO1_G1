import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Divider, Menu, Icon, Table,Rating } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { OrdenesPanel } from "./OrdenesPanel";

export const ListadoSolicitudEntrega = (props) => {
  console.log("props")
  console.log(props)
  const [entregas, setEntregas] = useState([]);
  const [departamento, setDepartamento] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [cantidadPedidos, setCantidadPedidos] = useState("")
  const [entregasUpdated, setEntregasUpdated] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:4000/OrdenActiva/${props.datos.idUsuario}`, {
        responseType: "json",
      })
      .then((res) => {
        console.log("res.data");
        console.log(res.data);
        setEntregasUpdated(res.data.datos);
        setDepartamento(res.data.departamento);
        setCiudad(res.data.ciudad)
      });
  }, []);
  useEffect(() => {
    axios
      .get(`http://localhost:4000/lisadoOrdenes/${props.datos.idUsuario}`, {
        responseType: "json",
      })
      .then((res) => {
        console.log("res.data");
        console.log(res.data);
        setEntregas(res.data.ordenes);
        setCantidadPedidos(res.data.cantidadOrdenes);
      });
  }, []);
  console.log("entregas")
  console.log(entregas)
  console.log("entregasUpdated")
  console.log(entregasUpdated)
  return (
    <Grid>
      {entregasUpdated ? (
        <>
          <Grid.Row columns={3}>
            <Grid.Column textAlign='center'>
              <Menu fluid vertical>
                <Menu.Item className='header'>Departamento Actual</Menu.Item>
                <Menu.Item>{departamento}</Menu.Item>
              </Menu>
            </Grid.Column>
            <Grid.Column textAlign='center'>
              <Menu fluid vertical>
                <Menu.Item className='header'>Ciudad Actual</Menu.Item>
                <Menu.Item>{ciudad}</Menu.Item>
              </Menu>
            </Grid.Column>
            <Grid.Column textAlign='center'>
              <Menu fluid vertical>
                <Menu.Item className='header'>Cantidad de pedidos</Menu.Item>
                <Menu.Item>{cantidadPedidos}</Menu.Item>
              </Menu>
            </Grid.Column>
          </Grid.Row>
          <Divider></Divider>
          <Grid.Row columns={2}>
            {cantidadPedidos > 0 ? (
              <>
                {entregas.map((orden) => (
                    <OrdenesPanel
                      Ordenes={orden}
                      idUsuario={props.datos.idUsuario}
                      props1={props.datos}
                    />
                ))}
              </>
            ) : (
              <h1>No hay pedidos disponibles para esta region.</h1>
            )}
          </Grid.Row>
        </>
      ) : (
        <h1>Tiene un pedido pendiente de entrega. Hasta que no entregue ese pedido, no podrá aceptar uno nuevo.</h1>
      )}
    </Grid>
  )
}