import React,{useState,useEffect} from 'react';
import { useCart } from 'react-use-cart';
import {PedirProducto } from './PedirProducto';
import { EstadoMostrar } from './EstadoMostrar';

export default function Cesta() {
    const {mostrar, setMostrar} = React.useContext(EstadoMostrar); // variable mostrar tiene el ID de empresa

    const { 
        isEmpty,
        totalUniqueItems,
        items,
        totalItems,
        cartTotal,
        updateItemQuantity,
        removeItem,
        emptyCart
     } = useCart();

     const [confirmar, setConfirmar] = useState(false);
     
    if(isEmpty) return <h1 className='text-center'>El carrito está vacío</h1>
    
    
     return (
        <div>
        <section>
            <div className='row justify-content-center'>
            <h1 className='text-center'>Carrito de compra</h1>
                <div style={{width:'100%'}}>
                    <h5>Productos (items únicos) en el carrito: ({totalUniqueItems})</h5>
                    <h5>Total Items agregados: ({totalItems})</h5>
                    <table className='table table-dark  m-0' style={{width:'100%'}}>
                        <tbody>
                        {
                            items.map((item,index)=>{
                                return(
                                    <tr key={index}>
                                    <td>
                                        <img src={item.img} alt="" style={{height:'6rem'} }/>
                                    </td>
                                    <td>{item.name}</td>
                                    <td>Q {item.price}</td>
                                    <td><strong>Cantidad</strong>: ({item.quantity})</td>
                                    <td>
                                        <button className='btn btn-info ms-2'
                                            onClick={()=>updateItemQuantity(item.id, item.quantity - 1)}>-
                                        </button>
                                        <button className='btn btn-info ms-2'
                                            onClick={()=>updateItemQuantity(item.id, item.quantity + 1)}>+
                                        </button>
                                        <button className='btn btn-danger' style={{width:'100%'} }
                                            onClick={()=> removeItem(item.id)}>Quitar
                                        </button>
                                    </td>
                                </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
                <div className='col-auto ms-auto'>
                    <h2>Total: Q. {cartTotal}</h2>
                </div>
                <div className='col-auto'>
                    <button 
                        className='btn btn-danger m-2'
                        onClick={()=> emptyCart()}>
                        Limpiar cesta
                    </button>
                    <button 
                        className='btn btn-primary m-2'
                        onClick={()=> setConfirmar(true)}>
                        Confirmar datos
                    </button>
                </div>
            </div>
        </section>
        <section className='py-4 container'>
            {confirmar && <PedirProducto monto={cartTotal} cantidad={totalItems} items={items} idEmpresa={mostrar}/>}
        </section>
        </div>
  )
}
