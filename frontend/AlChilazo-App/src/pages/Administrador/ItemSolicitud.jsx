import React from 'react';
import './style.css';
import axios from "axios";

export const ItemSolicitud = (props) => {
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
                                <p className="card-text"><label className='label-info'>Nombres: </label>{props.RepNom1 + ' ' + props.RepNom2}</p>
                                <p className="card-text"><label className='label-info'>Fecha Nac.: </label>{props.RepFecNac}</p>
                                <p className="card-text"><label className='label-info'>Telefono: </label>{props.RepNumCel}</p>
                                <p className="card-text"><label className='label-info'>Correo: </label>{props.RepCorrElect}</p>
                                <p className="card-text" style={{ visibility: "hidden" }}>{props.ididRepartidor}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}