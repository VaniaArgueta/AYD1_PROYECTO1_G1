import React, {useState} from 'react';
import { EstadoMostrar } from './EstadoMostrar';

export const BuscarEmpresa = (props) => {
    const {mostrar, setMostrar} = React.useContext(EstadoMostrar); // variable mostrar tiene el ID de empresa
    const [datosEmpresaPorCategoria, setDatosEmpresaPorCategoria] = useState([]);
    const [palabraClave, setPalabraClave] = useState('');

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

  return (
    <>
    
    <form onSubmit={onSubmit} >
        <div className="mb-3">
          <label htmlFor="inputPalabra" className="form-label">Palabra clave</label>
          <input type="text" 
                  className="form-control" id="inputPalabra" 
                  value={ palabraClave }
				  required
                  onChange={ (e) => setPalabraClave(e.target.value) }/>
		</div>
        <button type="submit" className="btn btn-primary">Buscar</button>
    </form>

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
    </>
  )
}