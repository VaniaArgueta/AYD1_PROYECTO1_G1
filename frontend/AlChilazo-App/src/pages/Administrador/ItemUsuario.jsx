import React from 'react';
import './style.css';
import axios from "axios";

export const ItemUsuario = (props) => {

    const url = 'http://localhost:4000/cambiarEstadoUsuario';
    //console.log(props)

    function changeStatus(id, status) {
        console.log("id: " + id + ", status: " + status);
        axios
            .post(url, {
                estado: status,
                idUsuario: id
            })
            .then((response) => {
                console.log(response.data);
                alert('Estado de usuario modificado: ' + props.nombre + ' ' + props.apellido);
            });
    }

    return (
        <>
            <div style={{ width: "max-width: 400px", padding: "2px" }}>
                <div className="card" >
                    <div className="row">
                        <div className="col-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="#527397" className="bi bi-person-circle img-fluid rounded-start" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                            </svg>
                        </div>
                        <div className="col-6">
                            <div className="card-body">
                                <p className="card-text"><label className='label-info'>Nombres: </label>{props.nombre + ' ' + props.apellido}</p>
                                <p className="card-text"><label className='label-info'>Rol: </label>{props.usuario}</p>
                                <p className="card-text"><label className='label-info'>Correo: </label>{props.correo}</p>
                                {
                                    props.estado === 1
                                        ? <p className="card-text" style={{ fontWeight: "bold", color: "green" }}>Activo</p>
                                        : <p className="card-text" style={{ fontWeight: "bold", color: "red" }}>Inactivo</p>
                                }
                                <p className="card-text" style={{ visibility: "hidden" }}>{props.idUsuario}</p>
                            </div>
                        </div>
                        <div className="col-4">
                            {
                                props.estado === 1
                                    ? (<button type="button" className="button-42 btn-outline-warning" onClick={(e) => changeStatus(props.idUsuario, 0)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                        </svg> Inactivar
                                    </button>
                                    )
                                    : (<button type="button" className="button-44 btn-outline-warning" onClick={(e) => changeStatus(props.idUsuario, 1)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                        </svg> Activar
                                    </button>
                                    )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>);

}