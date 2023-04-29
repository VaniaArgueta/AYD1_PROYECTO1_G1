import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, Divider, Grid, Image } from 'semantic-ui-react'

export const OrdenesPanel = ({Ordenes,idUsuario,props1}) => {
  console.log("Ordenes")
  console.log("idUsuario")
  console.log(Ordenes)
  console.log(idUsuario)
  console.log("props")
  console.log(props1)
  const tomarOrden = (product) =>{
    console.log(product)
    axios.get(`http://localhost:4000/AgendarOrden/${product.idOrden}/${idUsuario}`)
      .then(res=>{
        if (res.data.resultado){
          props1.setTipo(6)
        }
      })
  }
  return (
    <>
      <Grid.Column>
        <Card>
          <Card.Content>
            <Card.Header>Numero de orden: {Ordenes.idOrden}</Card.Header>
            <Card.Meta>Pendiente</Card.Meta>
            <Card.Description>
              Cantidad de Productos: {Ordenes.cantidadProductos}
            </Card.Description>
            <Card.Description>
              Monto del Pedido: Q.{Ordenes.montoPedido}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
          <div className='ui buttons'>
            <Button basic color='green' onClick={()=>tomarOrden(Ordenes)}>
              Tomar Pedido
            </Button>
          </div>
        </Card.Content>
        </Card>
      </Grid.Column>
    </>
  )
}