import React, {useState,useEffect} from 'react';
import { ConfirmarPedido } from './ConfirmarPedido';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const PedirProducto = (props) => {
  const { user } = useParams();

  const [idMetodoPagoUsuario, setIdMetodoPagoUsuario] = useState(1);
  const [direccion, setDireccion] = useState();
  const [idCiudad, setIdCiudad] = useState(1);
  const [idDepartamento, setIdDepartamento] = useState(1);
  const [numTC, setNumTC] = useState();

  const [confirmar, setConfirmar] = useState(false);
  const [confirmarPago, setConfirmarPago] = useState(false);


  /*var lista = [
    {
      idMetodoPagoUsuario: 0,
      idTipoMetodoPago: 0,
      idUsuario: 2,
      nombre:'Elegir',
      numTarjeta: '0'
    }
];*/
var lista= [
  { idMetodoPago: 1,
    nombre: 'Tarjeta de crédito',
    numTarjeta: '558899663322114455'
  },
  { idMetodoPago: 2,
    nombre: 'Efectivo',
    numTarjeta: ''
  }
];

  /*const [listaPago, setListaPago] = useState(lista.map(o => (
    <option key={0} value={'Elegir'}>Elegir</option>
  )));  */

  const [listaPago, setListaPago] = useState(lista.map(o => (
    <option key={o.idMetodoPago} value={o.nombre+' '+o.numTarjeta}>{o.nombre+' '+o.numTarjeta}</option>
  )));  



  var listaDirecciones = [
    {
      idDireccionUsuario: 1,
      idPais: 1,
      idDepto: 1,
      idCiudad: 1,
      direccion: '30 calle A 6-88 zona 5 de Mixco'
    },
    {
      idDireccionUsuario: 2,
      idPais: 1,
      idDepto: 6,
      idCiudad: 18,
      direccion: '7ma avenida 1-14 zona 2 Sacapulas'
    },
    {
      idDireccionUsuario: 3,
      idPais: 1,
      idDepto: 5,
      idCiudad: 14,
      direccion: '11va calle 1-14 zona 2 Sumpango'
    }
];

  const [listaDirecciones2, setListaDirecciones] = useState(listaDirecciones.map(o => (
    <option key={o.idDireccionUsuario} value={o.direccion}>{o.direccion}</option>
  )));  

  const handleFitrarDatosPago = () => {
    const urlpago = 'http://localhost:4000/consultarMetodoPagoUsuario';

    fetch(urlpago)
    .then((response) => response.json())
    .then((data) => {
    console.log(data);             
    if(data){      
      lista = data;       
        console.warn(lista);        
        /*setListaPago(lista.map(o => (
            <option key={o.idMetodoPagoUsuario} value={o.nombre=='Efectivo'? o.nombre : o.nombre + ' '+ o.numTarjeta}>{o.nombre=='Efectivo'? o.nombre : o.nombre + ' '+ o.numTarjeta}</option>
        )));*/
        setListaPago(lista.map(o => (
          <option key={o.idMetodoPagoUsuario} value={o.nombre=='Efectivo'? o.nombre : o.nombre + ' '+ o.numTarjeta}>{o.nombre=='Efectivo'? o.nombre : o.nombre + ' '+ o.numTarjeta}</option>
      )));
        //console.log(listaPago);
    }
    })
    .catch((err) => console.log(err));
  }

  const handleChange = event => {
    setIdMetodoPagoUsuario(event.target.value);
    
    setNumTC(event.target.value);
    console.warn(numTC);
    if(numTC && numTC !== null && numTC !== undefined){
      setConfirmarPago(true);
    }
    //alert(idCiudad + ' '+ idDepartamento);
  }; 


  const handleChangeDireccion = event => {
    setDireccion(event.target.value);
    if(direccion && direccion !== null && direccion !== undefined){
      setConfirmar(true);
    }
  }; 

  function realizarPedido(){
    console.warn(props.items);
    console.log(user);

    axios.post('http://localhost:4000/agregaOrden', {
      idEmpresa: props.idEmpresa,
      idUsuario: user,
      idDepartamento: 1,
      idCiudad: 1,
      cantidadProductos: props.cantidad,
      montoPedido: props.monto   
    })
    .then((response) => {
      console.log(response.data);
      console.log(response.data.insertarOrden);
      if(response.data.insertarOrden) alert('Orden registrada');
      else  alert('Error inesperado al registrar orden');			
    }); 

    axios.post('http://localhost:4000/llenarCarrito', {
      items: props.items
    })
    .then((response) => {
      console.log(response.data);
      console.log(response.data.orden);
      if(response.data.orden) console.log('carrito lleno');
      else  alert('Error inesperado al registrar carrito');			
    }); 
						
    
  } 
  

  return (
    <>
    <div>
    <div className='contenedorFormulario'>
            <br />      
            <br />      
            <div className="mb-3">
                <select  id="select3" className='form-select form-select-lg' onChange={handleChange}>
                    {listaPago}
                </select>  
                   
            </div>     
            <div className="mb-3">
                <br />
                <select  id="select2" className='form-select form-select-lg' onChange={handleChangeDireccion}>
                    {listaDirecciones2}
                </select>  
                   
            </div>      
            <div>
           {confirmar && confirmarPago && <div>
            <br/>

            <h2>Confirmar pedido</h2>

            <p>Cantidad de productos: {props.cantidad}</p>
            <p>Monto total: {props.monto}</p>
            <p>Método de pago: {props.numTC}</p>
            <p>Dirección de entrega: {props.direccion}</p>
            <p></p>
            <p>¿Está seguro de continuar con la compra?</p>
            <button
                className='btn btn-primary m-2'
                onClick={()=> realizarPedido()}>
                Pagar
            </button>                        
            </div>}
          </div>                 
      </div>
    </div>
    
    </>
  )
}