import React, { useState } from "react";
import axios from "axios";
import FileBase64 from "react-file-base64";

const AgregarProducto = (props) => {
  
  const url = "http://localhost:4000/agregarProducto";

  const [foto64, setFoto64] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const { nombre, precio, categoria } = event.target;
    if (foto64 === "") {
      alert("Debe de seleccionar una imagen");
      return;
    }
    const picture = foto64.split(",")[1];

    const data = {
      nombre: nombre.value,
      precio: precio.value,
      categoria: categoria.value,
      picture,
      empresaName:props.usuario
    };
    console.log(props.usuario)
    axios.post(url,data)
        .then((res)=>{
            console.log(res.data)
            if(res.data.agregado){
                alert("Se ha agregado el producto correctamente")
            }else{
                alert("Ha ocurrido un error al agregar el producto")
            }
        })
        .catch((err)=>{
            alert("Ha ocurrido un error en el servidor")
        })
    console.log(data);
  };

  return (
    <>
      <div className="product-form">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nombre">Nombre del producto</label>
            <input
              className="form-control"
              id="nombre"
              placeholder="Nombre"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="precio">Precio</label>
            <input
              className="form-control"
              id="precio"
              placeholder="Precio"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="categoria">Categoria</label>
            <input
              className="form-control"
              id="categoria"
              placeholder="Categoria"
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
            Agregar
          </button>
        </form>
      </div>
    </>
  );
};

export default AgregarProducto;
