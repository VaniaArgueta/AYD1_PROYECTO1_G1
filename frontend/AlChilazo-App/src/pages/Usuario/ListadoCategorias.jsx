import React, {useState, useEffect} from 'react';
import { EstadoMostrar } from './EstadoMostrar';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Carousel} from "react-bootstrap";
import './usuario.css';

export const ListadoCategorias = (props) => {

    const {mostrar, setMostrar} = React.useContext(EstadoMostrar);

    const [datosCategoria, setDatosCategoria] = useState([]);
    const [datosEmpresaPorCategoria, setDatosEmpresaPorCategoria] = useState([]);
    const [nombreCategoria, setNombreCategoria] = useState('');
    const [palabraClave, setPalabraClave] = useState('');

    const handleFitrarDatos = () => {
    fetch('http://localhost:4000/consultarListadoCategorias')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);             
                if(data){              
                    console.warn(data);
                    setDatosCategoria(data);
                    console.warn(datosCategoria);
                    console.warn(datosCategoria.length);
                }
    }).catch((err) => console.log(err));
    }

    function mostrarRestaurante(idCategoria, nombreCategoria){
        //alert(idCategoria);
        setNombreCategoria(nombreCategoria);
        fetch('http://localhost:4000/consultarEmpresaPorCategoria/'+idCategoria)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);             
                if(data){              
                    console.warn(data);
                    setDatosEmpresaPorCategoria(data);
                    //setNombreEmpresa(data.EmpNombre);
                    console.warn(datosEmpresaPorCategoria);
                    console.warn(datosEmpresaPorCategoria.length);
                }
    }).catch((err) => console.log(err));
    }

    function prueba(prueba){
        alert(prueba);
    }

    function onSubmit(e) {
		e.preventDefault();
        fetch('http://localhost:4000/consultarRestaurantes/'+palabraClave)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);             
                if(data){              
                    console.warn(data);
                    setDatosEmpresaPorCategoria(data);
                    //setNombreEmpresa(data.EmpNombre);
                    console.warn(datosEmpresaPorCategoria);
                    console.warn(datosEmpresaPorCategoria.length);
                }
        }).catch((err) => console.log(err));		
	  }

    return(<div className='divListadoCategorias'>
        <form onSubmit={onSubmit} >
        <div className="mb-3">
          <label htmlFor="inputPalabra" className="form-label">Palabra Clave</label>
          <input type="text" 
                  className="form-control" id="inputPalabra" 
                  value={ palabraClave }
				  required
                  onChange={ (e) => setPalabraClave(e.target.value) }/>
		</div>
        <button type="submit" className="btn btn-outline-secondary">Buscar</button>
    </form>

    <button type="button" className="btn btn-outline-danger btn-lg" onClick={handleFitrarDatos}>Ver categorías</button>
    <div className='divListadoCategorias' style={{overflow:"auto", minHeight: "200px"}} >
    <div className="row row-cols-1 row-cols-md-2 g-4">
    {
      datosCategoria.map((item, index) => {       
        return(
            <div className="card" key={index} style={{maxHeight: "150px", maxWidth:"125px"}} onClick={(e) => mostrarRestaurante(item.idCateProd, item.CataProdDsc)} >
                <img src="https://thumbs.dreamstime.com/b/plato-comida-caliente-icono-del-restaurante-134749600.jpg" style={{maxHeight: "100px", maxWidth:"125px"}} className="card-img-top" alt="..."/>
                <div className="card-body" >
                <h4>{item.CataProdDsc}</h4>
                </div>            
            </div>                  
        )   
        })      
    }       
    </div>
    </div>
    <div><h2>Empresas con productos de la categoría {nombreCategoria}</h2></div>
    <div className='divRestaurantesPorCategoria' style={{overflow:"auto"}}>
        
    <div className="row row-cols-1 row-cols-md-2 g-4">
    {
      datosEmpresaPorCategoria.map((item, index) => {       
        return(
            <div className="card" key={index} style={{maxHeight: "125px", maxWidth:"125px"}} onClick={(e) => setMostrar(item.idEmpresa)} >
                <img src="https://img2.freepng.es/20190226/hb/kisspng-restaurant-computer-icons-portable-network-graphic-5c74daa2bccf59.5555512215511620187734.jpg" className="card-img-top" alt="..."/>
                <div className="card-body" >
                <h4>{item.EmpNombre}</h4>
                </div>            
            </div>                  
        )   
        })      
    }       
    </div>
    </div>
    </div>)
}