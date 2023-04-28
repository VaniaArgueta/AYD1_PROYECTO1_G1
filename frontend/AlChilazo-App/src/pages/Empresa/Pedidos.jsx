import React, { useEffect, useState } from "react";
import ItemPedidoEmpresa from "./ItemPedidoEmpresa";
import axios from "axios";

export const Pedidos = (props) => {
  const [ordenes, setOrdenes] = useState([]);
  const [pedidosActualizado, setPedidosActualizado] = useState(false)

  useEffect(() => {
    axios
      .get(`http://localhost:4000/ordenEmpresa/${props.usuario}`, {
        responseType: "json",
      })
      .then((res) => {
        console.log(res.data);
        setOrdenes(res.data.ordenes);
      });
  }, [pedidosActualizado]);

  return (
    <>
      <div className="rowS">
        {ordenes.map((orden) => (
          <ItemPedidoEmpresa
            idOrden={orden.idOrden}
            usuario={orden.usuario}
            ciudad={orden.CiudadDsc}
            departamento={orden.DeptoDsc}
            fecha={orden.fechaPedido}
            monto={orden.montoPedido}
            setPedidosActualizado={setPedidosActualizado}
            pedidosActualizado={pedidosActualizado}
          />
        ))}
      </div>
    </>
  );
};
