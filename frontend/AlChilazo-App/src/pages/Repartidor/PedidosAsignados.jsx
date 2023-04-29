import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Divider, Menu, Icon, Table,Rating, Header } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { OrdenesActuales } from "./OrdenesActuales";

export const PedidosAsignados = (props) => {
  const [entregas, setEntregas] = useState([]);
  const [cantidadPedidos, setCantidadPedidos] = useState("")
  useEffect(() => {
    axios
      .get(`http://localhost:4000/OrdenPendiente/${props.datos.idUsuario}`, {
        responseType: "json",
      })
      .then((res) => {
        console.log("res.data");
        console.log(res.data);
        setEntregas(res.data.ordenes);
        setCantidadPedidos(res.data.cantidadOrdenes);
      });
  }, []);
  return (
    <Grid>
      <Grid.Row columns={1}>
        <Grid.Column textAlign='center'></Grid.Column>
        <Grid.Column textAlign='center'>
        <Header size='huge'>Pedidos Actuales</Header>
        </Grid.Column>
        <Grid.Column textAlign='center'></Grid.Column>
      </Grid.Row>
      <Divider></Divider>
      <Grid.Row columns={1}>
        {cantidadPedidos === 1 ? (
          <>
            <Grid.Column textAlign='center'>
              <OrdenesActuales
                Ordenes={entregas[0]}
                idUsuario={props.datos.idUsuario}
                props1={props.datos}
              />
            </Grid.Column>
          </>
        ) : (
          <h1>No hay pedidos pendientes.</h1>
        )}
      </Grid.Row>
    </Grid>
  )
}