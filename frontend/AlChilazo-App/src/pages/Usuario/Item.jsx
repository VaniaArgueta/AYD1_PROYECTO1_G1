import React from 'react';
import { useCart } from 'react-use-cart';

export const Item = (props) => {
    const { addItem } = useCart();

  return (
    <div className='col-11 col-md-6 col-lg-3 ms-0 mb-4 justify-content-center'>
        <div className="card overflow-auto h-10 shadow justify-content-center" style={{width:'200px', height:'250px', display:"auto"}}>
        <div className='justify-content-center'>
        <img src={props.img} className="card-img-top img-fluid" alt="Producto" style={{width:'80px', height:'80px'}} />
        </div>
        <div className="card-body text-center">
            <h3 className="card-title">{props.name}</h3>
            <h5 className="card-title">Q {props.price}</h5>                 
            <button className="btn btn-success" 
                onClick={() => addItem(props.item)}
                >Agregar al carrito</button>
        </div>
        </div>
    </div>
  )
}

export default Item