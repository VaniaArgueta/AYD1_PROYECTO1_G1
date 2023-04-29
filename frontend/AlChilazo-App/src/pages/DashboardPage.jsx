import React from 'react'
import './../App.css';
import { ModuloAcciones } from './ModuloAcciones';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export const DashboardPage = (props) => {
  const [idUsuario, setIdUsuario] = useState('');
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [rol, setRol] = useState(0);
  const { user } = useParams();
  const [tipo, setTipo] = useState(100);

  const url = 'http://localhost:4000/consultarUsuario/' + user;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data) {
        setIdUsuario(data[0].idUsuario);
        setNombreCompleto(data[0].nombre + ' ' + data[0].apellido);
        setRol(data[0].rol);
      }
    })
    .catch((err) => console.log(err));
  return (
    <>

      <div className="container">
        <div className="uno centrado">
          <svg xmlns="http://www.w3.org/2000/svg" width="200" height="150" fill="#ba3b46" className="bi bi-person-video" viewBox="0 0 16 16">
            <path d="M8 9.05a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
            <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2Zm10.798 11c-.453-1.27-1.76-3-4.798-3-3.037 0-4.345 1.73-4.798 3H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-1.202Z" />
          </svg>
          <br /><div><br /></div>

          <div className='centrado datosPrincipales' >
            <p>Usuario: {user}</p>
            <p>Nombre Completo: {nombreCompleto}</p>
            {rol === 0 ? (<p>Rol: Administrador</p>) : (<p>Rol: Usuario</p>)}
          </div>

          <div className="btn-group" role="group" aria-label="Basic outlined example">
            {rol === 0 &&
              (
                <>
                  <div>
                    <button type="button" className="btn btn-outline-danger btn-lg" onClick={() => setTipo(0)}>Solicitud Repartidores</button>
                    <button type="button" className="btn btn-outline-danger btn-lg" onClick={() => setTipo(1)}>Solicitud Empresas</button>
                    <button type="button" className="btn btn-outline-danger btn-lg" onClick={() => setTipo(2)}>Deshabilitar Usuarios</button>
                    <button type="button" className="btn btn-outline-danger btn-lg" onClick={() => setTipo(3)}>Mantenimiento Repartidores y Empresas</button>
                    <button type="button" className="btn btn-outline-danger btn-lg" onClick={() => setTipo(4)}>Reportes</button>
                  </div>
                </>

              )}
            {rol === 1 &&
              (
                <div>
                  <button type="button" className="btn btn-outline-danger btn-lg" onClick={() => setTipo(5)}>Listado Solicitud de Entrega</button>
                  <button type="button" className="btn btn-outline-danger btn-lg" onClick={() => setTipo(6)}>Pedidos Asignados</button>
                  <button type="button" className="btn btn-outline-danger btn-lg" onClick={() => setTipo(7)}>Perfil</button>
                  <button type="button" className="btn btn-outline-danger btn-lg" onClick={() => setTipo(8)}>Historial de pedidos</button>
                  <button type="button" className="btn btn-outline-danger btn-lg" onClick={() => setTipo(9)}>Comisiones generadas</button>
                </div>
              )}
            {rol === 2 &&
              (
                <div>
                  <button type="button" className="btn btn-outline-danger btn-lg" onClick={() => setTipo(10)}>Categorias</button>
                  <button type="button" className="btn btn-outline-danger btn-lg" onClick={() => setTipo(11)}>Buscar restaurante</button>
                  <button type="button" className="btn btn-outline-danger btn-lg" onClick={() => setTipo(13)}>Historial de pedidos</button>
                </div>
              )}
            {rol === 3 &&
              (
                <div>
                  <button type="button" className="btn btn-outline-danger btn-lg" onClick={() => setTipo(14)}>Catálogo de Productos</button>
                  <button type="button" className="btn btn-outline-danger btn-lg" onClick={() => setTipo(15)}>Panel de Control</button>
                  <button type="button" className="btn btn-outline-danger btn-lg" onClick={() => setTipo(16)}>Pedidos</button>
                  <button type="button" className="btn btn-outline-danger btn-lg" onClick={() => setTipo(17)}>Ofertas y Combos</button>
                  <button type="button" className="btn btn-outline-danger btn-lg" onClick={() => setTipo(18)}>Reportes</button>
                  <button type="button" className="btn btn-outline-danger btn-lg" onClick={() => setTipo(19)}>Informes de restaurantes</button>
                </div>
              )}

          </div>
        </div>
        <div className="dos">
          <ModuloAcciones idUsuario={idUsuario} usuario={user} rol={rol} nombreCompleto={nombreCompleto} tipo={tipo} setTipo={setTipo}/>
        </div>
      </div>
    </>
  )
}