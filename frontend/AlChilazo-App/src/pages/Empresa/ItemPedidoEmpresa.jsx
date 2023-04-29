import axios from "axios";
import React from "react";

const ItemPedidoEmpresa = ({idOrden,usuario,ciudad,departamento,fecha,monto,setPedidosActualizado,pedidosActualizado}) => {


  const rechazarPedido = () =>{
    const data = {
      idOrden
    }

    axios.put("http://localhost:4000/rechazarOrdenEmpresa", data).then((res) => {
      console.log(res.data);
      if (res.data.updated) {
        alert("Se ha rechazado el pedido correctamente");
        setPedidosActualizado(!pedidosActualizado)
      } else {
        alert("Ha ocurrido un error al actualizar el estado del pedido");
      }
    });

  }


  const aceptarPedido = () =>{{

    const data = {
      idOrden
    }

    axios.put("http://localhost:4000/aceptarOrdenEmpresa", data).then((res) => {
      console.log(res.data);
      if (res.data.updated) {
        alert("Se ha aceptado el pedido correctamente");
        setPedidosActualizado(!pedidosActualizado)
      } else {
        alert("Ha ocurrido un error al actualizar el estado del pedido");
      }
    });
  }}

  return (
    <>
      <div style={{ width: "max-width: 400px", padding: "2px" }}>
        <div className="card">
          <div className="row">
            <div className="col-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                fill="#527397"
                className="bi bi-person-circle img-fluid rounded-start"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                />
              </svg>
            </div>
            <div className="col-6">
              <div className="card-body">
                <p className="card-text">
                  <label className="label-info">Usuario: </label>
                  {usuario}
                </p>
                <p className="card-text">
                  <label className="label-info">Direccion: </label>
                  {departamento}, {ciudad}
                </p>
                <p className="card-text">
                  <label className="label-info">Fecha: </label>
                  {fecha}
                </p>
                <p className="card-text">
                  <label className="label-info">Total: </label>
                  { monto}
                </p>
                <p className="card-text" style={{ visibility: "hidden" }}>
                  {/* props.ididRepartidor */}
                </p>
              </div>
            </div>
            <div  className="col-4">
              <button type="button" onClick={rechazarPedido} className="button-44 btn-outline-warning">
                   Rechazar
              </button>
              <button type="button" onClick={aceptarPedido} className="button-44 btn-outline-warning" >
                   Aceptar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemPedidoEmpresa;
