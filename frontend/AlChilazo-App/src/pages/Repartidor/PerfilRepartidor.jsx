import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import StarRating from "./StarRating";

export const PerfilRepartidor = (props) => {
  const url = "http://localhost:4000/Informacion";
  console.log("props")
  console.log(props)
  console.log(props.datos.idUsuario)
  const [initialRating, setInitialRating] = useState(0);
  useEffect(() => {
    const data = {
      idusuario: props.datos.idUsuario
    };
    axios.post(url, data).then((response) => {
      console.log(response.data);
    });
    setInitialRating(3);
    console.log("initialRating useEffect")
    console.log(initialRating)
  });
  console.log("initialRating")
  console.log(initialRating)
  return (
    <>
      <Grid>
        <Grid.Row></Grid.Row>
          <Grid.Row>
            <Grid.Column width={4}></Grid.Column>
            <Grid.Column width={10}>
              <Grid.Row>

              </Grid.Row>
              <Grid.Row>
                
              </Grid.Row>
              <Grid.Row>
                
              </Grid.Row>
              <StarRating value={initialRating}/>
            </Grid.Column>
            <Grid.Column width={4}></Grid.Column>
          </Grid.Row>
        <Grid.Row></Grid.Row>
      </Grid>
    </>
  )
}