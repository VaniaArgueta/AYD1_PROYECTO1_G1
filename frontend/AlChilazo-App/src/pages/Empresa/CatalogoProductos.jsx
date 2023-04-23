import React, { useEffect, useState } from "react";
import axios from "axios";
import FileBase64 from "react-file-base64";
import { Productos } from "./Productos";
import { ProductosPanel } from "./ProductosPanel";

export const CatalogoProductos = (props) => {
  const [productos, setProductos] = useState([]);
  const [catalogoUpdated, setCatalogoUpdated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [idProductoEdit, setIdProductoEdit] = useState("")

  const [foto64, setFoto64] = useState("");
  const [precio, setPrecio] = useState(0)
  const [nombreProducto, setNombreProducto] = useState("")
  const [categoria, setCategoria] = useState("")


  useEffect(() => {
    setShowModal(false)
    axios
      .get(`http://localhost:4000/catalogoProductos/${props.usuario}`, {
        responseType: "json",
      })
      .then((res) => {
        console.log(res.data);
        setProductos(res.data.productos);
      });
  }, [catalogoUpdated]);


  useEffect(()=>{
    if(!showModal) return
    axios
      .get(`http://localhost:4000/producto/${idProductoEdit}`, {
        responseType: "json",
      })
      .then((res) => {
        console.log(res.data)
        setNombreProducto(res.data.producto[0].ProdDsc)
        setPrecio(res.data.producto[0].precio)
        setCategoria(res.data.categoria[0].CataProdDsc)
      });
  },[idProductoEdit])


  const handleSubmit = (event) =>{
    event.preventDefault();

    console.log(foto64)
    const picture = foto64 !== "" ? foto64.split(",")[1] : "";
    const data ={
      idProducto:idProductoEdit,
      nombreProducto,
      categoria,
      precio,
      picture
    }
    console.log(data)
    axios.put('http://localhost:4000/producto',data)
      .then(res =>{
         console.log(res.data)
         if(res.data.updated){
          alert("Se ha actualizado el producto correctamente")
          setShowModal(false)
          setCatalogoUpdated(!catalogoUpdated)
         }else{
          alert("Ha ocurrido un error al actualizar el producto")
         }
      })
  }

  return (
    <>
      {showModal ? (
        <div>
          <h2>Editando producto</h2>
          <div className="product-form">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="nombre">Nombre del producto</label>
                <input
                  className="form-control"
                  id="nombre"
                  placeholder="Nombre"
                  value={nombreProducto}
                  onChange={ (e) => setNombreProducto(e.target.value) }
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="precio">Precio</label>
                <input
                  className="form-control"
                  id="precio"
                  value={precio}
                  placeholder="Precio"
                  onChange={ (e) => setPrecio(e.target.value) }
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="categoria">Categoria</label>
                <input
                  className="form-control"
                  id="categoria"
                  placeholder="Categoria"
                  value={categoria}
                  onChange={ (e) => setCategoria(e.target.value) }
                  required
                />
              </div>
              <div className="mb-3">
                <FileBase64
                  hidden
                  multiple={false}
                  onDone={({ name, base64 }) => {
                    setFoto64(base64);
                  }}
                  type="file"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Modificar
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div>
          <h2>Catalogo de productos</h2>
          {productos.map((producto) => (
            <div>
              {producto.productos.length > 0 && (
                <div>
                  <h3>{producto.categoria.CataProdDsc}</h3>
                  {props.editar ? (
                    <ProductosPanel
                      key={producto.categoria.idCateProd}
                      productos={producto.productos}
                      setCatalogoUpdated={setCatalogoUpdated}
                      catalogoUpdated={catalogoUpdated}
                      setShowModal={setShowModal}
                      setIdProductoEdit={setIdProductoEdit}
                    />
                  ) : (
                    <Productos
                      key={producto.categoria.idCateProd}
                      productos={producto.productos}
                    />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};
