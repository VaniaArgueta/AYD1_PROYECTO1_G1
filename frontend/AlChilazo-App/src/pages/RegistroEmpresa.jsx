import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

export const RegistroEmpresa = () => {
  const [usuario, setUsuario] = useState("");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [categoria, setCategoria] = useState("CAFETERIA");
  const [nit, setNit] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [departamentos, setDepartamentos] = useState([]);
  const [deptoSelected, setDeptoSelected] = useState("");
  const [ciudades, setCiudades] = useState([]);
  const [ciudadSelected, setCiudadSelected] = useState("");

  const [pdfFile, setPdfFile] = useState([]);

  const url = "http://localhost:4000/resgistroEmpresa";

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
    console.log(nombre);
    console.log(email);
    console.log(password);
    console.log(password2);
    console.log(categoria);
    console.log(pdfFile);

    if (deptoSelected === ""){
      alert("Debe de seleccionar un departamento")
      return
    };
    if (ciudadSelected === ""){
      alert("Debe de seleccionar una ciudad")
      return
    };

    const regexNumber = /^\d+$/;
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if(!regexNumber.test(nit)){
      alert("El NIT únicamente puede estar formado de numeros")
      return
    }

    if(!regexCorreo.test(email)){
      alert("El correo ingresado no tiene el formato adecuado de un correo")
      return
    }

    const data = {
      usuario,
      nombre,
      nit,
      email,
      password,
      categoria,
      pdfFile,
      descripcion,
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
        }
      });
    } else alert("La confirmación de contraseña no coincide");

    vaciarCampos()
  }

  const handleUploadPDF = async (event) => {
    const file = event.target.files[0];
    console.log(file);
    console.log(file.name);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async function () {
      const fileContent = reader.result.split(",")[1];
      //console.log(fileContent);
      setPdfFile((pdfFile) => [
        ...pdfFile,
        { pdfName: file.name.split(".")[0], pdfContent: fileContent },
      ]);
    };
  };

  const vaciarCampos = () => {
    setUsuario("");
    setNombre("");
    setEmail("");
    setNit("")
    setDescripcion("")
    setPassword("");
    setPassword2("");
  };

  const handleChange = (e) => {
    setCategoria(e.target.value);
  };

  const handleDepto = (e) => {
    setDeptoSelected(e.target.value);
  };

  const handleCiudad = (e) => {
    setCiudadSelected(e.target.value);
  };

  return (
    <div className="contenedorFormulario">
      <br />
      <br />
      <form onSubmit={onSubmit}>
        <h1>Nueva Empresa</h1>
        <div className="mb-3">
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
        </div>
        <div className="mb-3">
          <label htmlFor="inputNombre" className="form-label">
            Nombre de la empresa
          </label>
          <input
            type="text"
            className="form-control"
            id="inputNombre"
            value={nombre}
            required
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="inputNit" className="form-label">
            NIT
          </label>
          <input
            type="text"
            className="form-control"
            id="inputNit"
            value={nit}
            required
            onChange={(e) => setNit(e.target.value)}
          />
        </div>
        <div className="mb-3">
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
        </div>
        <div className="mb-3">
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
        </div>
        <div className="mb-3">
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
        </div>
        <div className="mb-3">
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
        </div>
        <div className="mb-3">
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
        </div>
        <div className="mb-3">
          <label htmlFor="categoria" className="form-label">
            Tipo de empresa
          </label>
          <select
            className="form-select"
            id="categoria"
            onChange={handleChange}
          >
            <option value="CAFETERIA">Cafeteria</option>
            <option value="COMIDA RAPIDA">Comida Rapida</option>
            <option value="RESTAURANTE">Restaurante</option>
            <option value="TIENDA DE CONVENIENCIA">
              Tienda de conveniencia
            </option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="descripcion">Descripcion de la empresa</label>
          <textarea
            id="descripcion"
            rows="3"
            className="form-control"
            value={descripcion}
            required
            onChange={(e) => setDescripcion(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="archivoPDF" className="form-label">
            Subir archivos
          </label>
          <input
            className="form-control"
            type="file"
            id="archivoPDF"
            onChange={handleUploadPDF}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Registrar
        </button>
      </form>
    </div>
  );
};
