import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from './Pagination';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export const Productos = ({productos}) => {


  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage,setItemsPerPage] = useState(2)


  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentItems = productos.slice(indexOfFirstPost, indexOfLastPost);

  const previousPage = () =>{
    if(currentPage !== 1){
      setCurrentPage(currentPage-1)
    }
  }

  const nextPage = () => {
    if (currentPage !== Math.ceil(productos.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
  	}
  };

  const paginate = (selected) => {
    console.log(selected)
		setCurrentPage(selected);
	};

  
  
  return (
    <>
        <div className='productos-catalogo'>      
            {currentItems.map(producto =>(
                <Card key={producto.ProdDsc} style={{ width: '14rem',height:'18rem',marginRight:'2rem' }}>
                    <Card.Img variant="top" src={producto.ProdImg} style={{width:'12rem',height:'12rem',objectFit:'contain'}}/>
                    <Card.Body>
                        <Card.Title>{producto.ProdDsc}</Card.Title>
                        <Card.Text>Precio: Q.{producto.precio}</Card.Text>

                    </Card.Body>
                </Card>
                /* <div key={producto.ProdDsc} className='card' style={{"width":"10rem"}}>
                    <img className='card-img-top' src={producto.ProdImg} alt='Imagen producto'></img>
                    <div className='card-body'>
                        <h5 className='card-title'>{producto.ProdDsc}</h5>
                    </div>
                </div> */
            ))}
            
        </div>
            <Pagination 
                productsPerPage={itemsPerPage}
                totalProducts={productos.length}
                paginate={paginate}
                previousPage={previousPage}
                nextPage={nextPage}
            />
    </>
  )
}