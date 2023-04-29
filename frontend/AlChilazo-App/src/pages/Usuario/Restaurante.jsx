import React, {useState,useEffect} from 'react';
import { EstadoMostrar } from './EstadoMostrar';
import Item from './Item';
import Cesta from './Cesta';
import axios from "axios";
import { CartProvider } from 'react-use-cart';
import { useCart } from 'react-use-cart';

export const Restaurante = (props) => {
  
  const {mostrar, setMostrar} = React.useContext(EstadoMostrar); // variable mostrar tiene el ID de empresa

  const { 
    emptyCart
 } = useCart();

  const [listadoProductos, setListadoProductos] = useState([]);
  var dataPrueba =[];
  var data = [];
  var primerRender = true;


  /*useEffect(() => {
    // fetch data
    const dataFetch = async () => {
      const data = await (
        await fetch(
          'http://localhost:4000/consultarProductosPorEmpresa/'+mostrar
        )
      ).json();

      // set state when the data received
      setListadoProductos(data);
    };

    dataFetch();

  }, []);*/

  React.useEffect(() => {
    ()=> emptyCart();
    axios.get('http://localhost:4000/consultarProductosPorEmpresa/'+mostrar).then((response) => {
      if(primerRender){
      dataPrueba = response.data;
      dataPrueba.forEach(element => {                      
                        //var nuevaImagen =  (element.results.data).reduce((data, byte) => data + String.fromCharCode(byte), '');
                        var nuevoProducto = { //Se agrega un objeto con las propiedades que react-use-cart requiere 
                          id : element.idProd,
                          img : element.ProdImg,
                          name : element.ProdDsc,
                          description : element.ProdDsc,
                          price : element.precio,
                          quantity : 20
                        };
                        data.push(nuevoProducto);                      
                      });  
                      setListadoProductos(data);
      primerRender = false; 
      }             
    });
  }, []);

  return (
    <>
    {}
    <CartProvider>
        <h1 className="text-center mt-3">Productos</h1>
        <section>          
          <div className="row justify-content-center">
            {
              listadoProductos.map((item, index) => {
                return(
                  <Item                     
                    img={item.img} 
                    name={item.name}                   
                    description={item.description} 
                    price={item.price} 
                    quantity={item.quantity}                    
                    item={item}                 
                    key={index}
                  />
                )
              })
            }
            <Cesta />
          </div> 
        </section>
      </CartProvider>
    </>
  )
}