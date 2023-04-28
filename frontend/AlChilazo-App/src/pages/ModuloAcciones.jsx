import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {HomePage}from './HomePage';
// Administrador
import { SolicitudRepartidores } from './Administrador/SolicitudRepartidores';
import {SolicitudEmpresas} from './Administrador/SolicitudEmpresas';
import {DeshabilitarUsuarios} from './Administrador/DeshabilitarUsuarios';
import {Mantenimiento} from './Administrador/Mantenimiento';
import {ReportesAdministrador} from './Administrador/ReportesAdministrador';
// Repartidor
import {ListadoSolicitudEntrega} from './Repartidor/ListadoSolicitudEntrega';
import {PedidosAsignados} from './Repartidor/PedidosAsignados';
import {PerfilRepartidor} from './Repartidor/PerfilRepartidor';
import {HistorialPedidosRepartidor} from './Repartidor/HistorialPedidosRepartidor';
import {ComisionesGeneradasRepartidor} from './Repartidor/ComisionesGeneradasRepartidor';
// Usuario
import {CarritoCompra} from './Usuario/CarritoCompra';
import {Categorias} from './Usuario/Categorias';
import {HistorialPedidosUsuario} from './Usuario/HistorialPedidosUsuario';
import {PedirProducto} from './Usuario/PedirProducto';
//Empresa
import {CatalogoProductos} from './Empresa/CatalogoProductos';
import {PanelControl} from './Empresa/PanelControl';
import {Pedidos} from './Empresa/Pedidos';
import {OfertasYCombos} from './Empresa/OfertasYCombos';
import {ReportesEmpresa} from './Empresa/ReportesEmpresa';
import {InformeRestaurantes} from './Empresa/InformeRestaurantes';
import AgregarProducto from './Empresa/AgregarProducto';
import { ProductosPanel } from './Empresa/ProductosPanel';
import { SolicitudCambioZona } from './Administrador/SolicitudCambioZona';

export const ModuloAcciones = (props) => {
  
  switch(props.tipo) {
    case 0:
      return <SolicitudRepartidores />;
    case 1:
      return <SolicitudEmpresas />;
    case 2:
      return <DeshabilitarUsuarios />;
    case 3:
      return <Mantenimiento />;
    case 4:
      return <ReportesAdministrador />;
    case 5:
      return <ListadoSolicitudEntrega />;
    case 6:
      return <PedidosAsignados />;
    case 7:
      return <PerfilRepartidor datos={props}/>;
    case 8:
      return <HistorialPedidosRepartidor />;
    case 9:
      return <ComisionesGeneradasRepartidor />;
    case 10:
      return <Categorias />;
    case 11:
      return <PedirProducto />;
    case 12:
      return <CarritoCompra />;
    case 13:
      return <HistorialPedidosUsuario />;
    case 14:
      return <CatalogoProductos usuario={props.usuario} editar={false}></CatalogoProductos>
    case 15:
      return <PanelControl setTipo={props.setTipo} />;
    case 151:
      return <AgregarProducto usuario={props.usuario}/>;
    case 152:
      return <CatalogoProductos usuario={props.usuario} editar={true}></CatalogoProductos>
    case 16:
      return <Pedidos usuario={props.usuario}/>;
    case 17:
      return <OfertasYCombos />;
    case 18:
      return <ReportesEmpresa />;
    case 19:
      return <InformeRestaurantes />;
    case 22:
      return <SolicitudCambioZona />;
    default:
      return <HomePage/>;
  }
}