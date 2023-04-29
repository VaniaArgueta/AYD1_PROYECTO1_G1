import React, {useState,useEffect} from 'react';
import axios from "axios";

export const Direcciones = (props) => {

    const [idCiudad, setIdCiudad] = useState(1);
    const [idDepartamento, setIdDepartamento] = useState(-1);

    var lista = [
        {
            idCiudad: 0,
            CiudadDsc:'Elegir'
        }
    ];

    const [listaCiudades, setListaCiudades] = useState(lista.map(o => (
        <option key={o.idCiudad} value={o.idCiudad} depto={idDepartamento}>{o.CiudadDsc}</option>
      )));  


      const handleFitrarDatos = () => {
        const urlListaAlbum = 'http://localhost:4000/consultarCiudades';

        fetch(urlListaAlbum)
        .then((response) => response.json())
        .then((data) => {
        console.log(data);             
        if(data){              
            console.warn(data);
            //setIdCiudad(data.idCiudad);
            //setIdDepartamento(data.idDepto);
            setListaCiudades(data.map(o => (
                <option key={o.idCiudad} value={o.idCiudad} depto={o.idDepto}>{o.CiudadDsc}</option>
            )));
            //console.log('general');
            console.log(listaCiudades);
        }
        })
        .catch((err) => console.log(err));
      }

      const handleChange = event => {
        setIdCiudad(event.target.value);
        setIdDepartamento(event.target.getAttribute('depto'));
        console.warn(event.target.getAttribute('depto'));
        //alert(idCiudad + ' '+ idDepartamento);
      }; 

  
  return (
    <>
            <div className='contenedorFormulario'>
            <br />      
            <br />      
            <div className="mb-3">
                <button className='btn btn-outline-danger btn-lg' onClick={handleFitrarDatos}>Consultar Ciudades</button>
                <br />
                <select  id="select1" className='form-select form-select-lg' onChange={handleChange}>
                    {listaCiudades}
                </select>   
                   
            </div>
            <div><br />      
            <br /></div>
            <div className="row row-cols-1 row-cols-md-2 g-4">
     
            </div>                           
            </div>
        </>
  )
}