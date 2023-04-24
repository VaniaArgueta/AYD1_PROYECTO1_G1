import React, { Component, useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Grid } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'semantic-ui-css/semantic.min.css';
import { useNavigate } from "react-router-dom";

export const RegistroRepartidor = () => {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState("");
    const [nombre1, setNombre1] = useState("");
    const [nombre2, setNombre2] = useState("");
    const [apellido1, setApellido1] = useState("");
    const [apellido2, setApellido2] = useState("");
    const [fechaNacimiento, setNacimiento] = useState(null);
    const [fechaVencimiento, setVencimiento] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [telefono, setTelefono] = useState(0);
    const [departamentos, setDepartamentos] = useState([]);
    const [deptoSelected, setDeptoSelected] = useState("");
    const [ciudades, setCiudades] = useState([]);
    const [ciudadSelected, setCiudadSelected] = useState("");
    const [noPlaca, setNoPlaca] = useState(0);
    const [noLicencia, setNoLicencia] = useState(0);
    const [hasLicense, setHasLicense] = useState(false);
    const [hasTransporte, setHasTransporte] = useState(false);
    const [licenseType, setLicenseType] = useState('');
    const [pdfName, setPdfName] = useState('')
    const [fileContent, setfileContent] = useState('');

    const url = "http://localhost:4000/registroRepartidor";

    useEffect(() => {
        axios
        .get(`http://localhost:4000/departamentos`, {
            responseType: "json",
        })
        .then((res) => {
            //console.log(res.data)
            setDepartamentos(res.data);
        });
    }, []);

    useEffect(() => {
        if (deptoSelected === "") return;

        axios
        .get(`http://localhost:4000/ciudades/${deptoSelected}`, {
            responseType: "json",
        })
        .then((res) => {
            //console.log(res.data)
            setCiudades(res.data);
        });
    }, [deptoSelected]);

    function onSubmit(e) {
        e.preventDefault();
        console.log(usuario);
        console.log(nombre1);
        console.log(nombre2);
        console.log(apellido1);
        console.log(apellido2);
        console.log(fechaNacimiento);
        console.log(telefono);
        console.log(email);
        console.log(password);
        console.log(password2);
        console.log(deptoSelected);
        console.log(ciudadSelected);
        console.log(hasLicense);
        console.log(licenseType);
        console.log(fechaVencimiento);
        console.log(hasTransporte);
        console.log(noPlaca);
        console.log(fileContent);
        console.log(pdfName);

        const data = {
        usuario,
        nombre1,
        nombre2,
        apellido1,
        apellido2,
        fechaNacimiento,
        telefono,
        email,
        password,
        hasLicense,
        licenseType,
        fechaVencimiento,
        hasTransporte,
        noPlaca,
        noLicencia,
        id: pdfName,
        fileContent: fileContent,
        departamento: deptoSelected,
        ciudad: ciudadSelected,
        };
        console.log(data);
        if (password == password2) {
            axios.post(url, data).then((response) => {
                console.log(response.data);
                if(!response.data.agregado){
                    alert(response.data.error)
                }else{
                    alert("Se ha registrado correctamente. Espere que su usuario sea aceptado por un administrador")
                    navigate('/')
                }
            });
        } else alert("La confirmación de contraseña no coincide");
        
    }

    const handleUploadPDF = async (event) => {
        const file = event.target.files[0]
        console.log(file)
        console.log(file.name)
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async function () {
          setfileContent(reader.result.split(',')[1]);
          setPdfName(file.name);
        };
    };

    const handleHasLicenseChange = (event) => {
        setHasLicense(event.target.checked);
    };

    const handleHasTransporteChange = (event) => {
        setHasTransporte(event.target.checked);
    };
    
    const handleLicenseTypeChange = (event) => {
        setLicenseType(event.target.value);
    };

    const handleDepto = (e) => {
        setDeptoSelected(e.target.value);
    };

    const handleCiudad = (e) => {
        setCiudadSelected(e.target.value);
    };

    function handleDateChange(date) {
        setNacimiento(date);
    };
    
    function handleVencimientoChange(date) {
        setVencimiento(date);
    }

    return (
        <>
            <Grid>
              <Grid.Row>
                  <Grid.Column width={5}>
                  <label className="form-label">
                            a
                        </label>
                  </Grid.Column>
                  <Grid.Column width={6}>
                    <form onSubmit={onSubmit}>
                        <h1>Solicitud de Repartidor</h1>
                        <br></br>
                        <label htmlFor="inputUsuario" className="form-label">
                            Usuario
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputUsuario"
                            value={usuario}
                            required
                            onChange={(e) => setUsuario(e.target.value)}
                        />
                        <br></br>
                        <label htmlFor="inputNombre1" className="form-label">
                            Primer Nombre
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputNombre1"
                            value={nombre1}
                            required
                            onChange={(e) => setNombre1(e.target.value)}
                        />
                        <br></br>
                        <label htmlFor="inputNombre2" className="form-label">
                            Segundo Nombre
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputNombre2"
                            value={nombre2}
                            required
                            onChange={(e) => setNombre2(e.target.value)}
                        />
                        <br></br>
                        <label htmlFor="inputApellido1" className="form-label">
                            Primer Apellido
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputApellido1"
                            value={apellido1}
                            required
                            onChange={(e) => setApellido1(e.target.value)}
                        />
                        <br></br>
                        <label htmlFor="inputApellido2" className="form-label">
                            Segundo Apellido
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputApellido2"
                            value={apellido2}
                            required
                            onChange={(e) => setApellido2(e.target.value)}
                        />
                        <br></br>
                        <label htmlFor="a" className="form-label">
                            Fecha de Nacimiento (YYYY/MM/DD)
                        </label>
                        <DatePicker id="a" selected={fechaNacimiento} onChange={handleDateChange} dateFormat="yyyy/MM/dd" />
                        <br></br>
                        <label htmlFor="inputTel" className="form-label">
                            Numero de Telefono
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputTel"
                            value={telefono}
                            required
                            onChange={(e) => setTelefono(e.target.value)}
                        />
                        <br></br>
                        <label htmlFor="inputEmail" className="form-label">
                            Correo electrónico
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputEmail"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <br></br>
                        <label htmlFor="inputPass" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="inputPass"
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <br></br>
                        <label htmlFor="inputPass2" className="form-label">
                            Confirmar Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="inputPass2"
                            value={password2}
                            required
                            onChange={(e) => setPassword2(e.target.value)}
                        />
                        <br></br>
                        <label htmlFor="departamento" className="form-label">
                            Departamento
                        </label>
                        <select
                            className="form-select"
                            id="departamento"
                            onChange={handleDepto}
                        >
                            <option value=""></option>
                            {departamentos.map((departamento) => (
                            <option
                                key={departamento.departamento}
                                value={departamento.departamento}
                            >
                                {departamento.departamento}
                            </option>
                            ))}
                        </select>
                        <br></br>
                        <label htmlFor="ciudad" className="form-label">
                            Ciudad
                        </label>
                        <select className="form-select" id="ciudad" onChange={handleCiudad}>
                            {ciudades.map((ciudad) => (
                            <option key={ciudad.ciudad} value={ciudad.ciudad}>
                                {ciudad.ciudad}
                            </option>
                            ))}
                        </select>
                        <br></br>
                        <label htmlFor="licencia" className="form-label">
                            Tipo de Licencia
                        </label>
                        <label>
                            <input
                            type="checkbox"
                            checked={hasLicense}
                            onChange={handleHasLicenseChange}
                            />
                            Sí
                        </label>
                        &nbsp; &nbsp;&nbsp; &nbsp;
                        <label>
                            <input
                            type="checkbox"
                            checked={!hasLicense}
                            onChange={handleHasLicenseChange}
                            />
                            No
                        </label>
                        {hasLicense && (
                            <>
                                <label>
                                    Tipo de licencia:
                                    <br></br>
                                    <select className="form-select" value={licenseType} onChange={handleLicenseTypeChange}>
                                    <option value="">Seleccione un tipo</option>
                                    <option value="A">Licencia A</option>
                                    <option value="B">Licencia B</option>
                                    <option value="C">Licencia C</option>
                                    <option value="M">Licencia M</option>
                                    <option value="E">Licencia E</option>
                                    </select>
                                </label>
                                <br></br>
                                <label htmlFor="aaaaa" className="form-label">
                                    Numero de Licencia
                                </label>
                                <input
                                type="text"
                                className="form-control"
                                id="aaaaa"
                                value={noLicencia}
                                required
                                onChange={(e) => setNoLicencia(e.target.value)}
                                />
                                <label htmlFor="as" className="form-label">
                                    Fecha de Vencimiento (YYYY/MM/DD)
                                </label>
                                <DatePicker
                                    id="as"
                                    selected={fechaVencimiento}
                                    onChange={handleVencimientoChange}
                                    dateFormat="yyyy/MM/dd"
                                />
                                <br></br>
                                <label htmlFor="medios" className="form-label">
                                    Posee un Medio de Transporte Propio? (Motocicleta)
                                </label> 
                                <label>
                                    <input
                                    type="checkbox"
                                    checked={hasTransporte}
                                    onChange={handleHasTransporteChange}
                                    />
                                    Sí
                                </label>
                                &nbsp; &nbsp;&nbsp; &nbsp;
                                <label>
                                    <input
                                    type="checkbox"
                                    checked={!hasTransporte}
                                    onChange={handleHasTransporteChange}
                                    />
                                    No
                                </label>
                                {hasTransporte && (
                                    <>
                                    <br></br>
                                        <label htmlFor="assd" className="form-label">
                                            Numero de Placa
                                        </label>
                                        <input
                                        type="text"
                                        className="form-control"
                                        id="assd"
                                        value={noPlaca}
                                        required
                                        onChange={(e) => setNoPlaca(e.target.value)}
                                        />
                                    </>
                                )}
                            </>
                        )}
                        <br></br>
                        <label htmlFor="archivoPDF" className="form-label">
                            Subir CV (PDF)
                        </label>
                        <input
                            className="form-control"
                            type="file"
                            id="archivoPDF"
                            onChange={handleUploadPDF}
                        />
                        <br></br>
                        <button type="submit" className="btn btn-primary">
                        Enviar Solicitud
                        </button>
                        
                    </form>
                  </Grid.Column>
                  <Grid.Column width={5}></Grid.Column>
              </Grid.Row>
            </Grid>
            
        </>
    );
};
