import express from 'express';
import conn, { query } from "./conexion.js";
import bodyParser from 'body-parser';
import cors from "cors";
import dotenv from 'dotenv';
import md5 from 'md5';
import AWS from 'aws-sdk';
import { format } from 'date-fns';

dotenv.config();

const app = express();
var corsOptions = { origin: true, optionsSuccessStatus: 200 };
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '1000mb' }));

app.get("/", function (req, res) {
  res.send("Bienvenido a Proyecto 1 AlChilazo's NodeJs server")
});

// ----------------------------------------------LISTADO DE ORDENES -----------------------------------------------------------------------------

app.get("/AgendarOrden/(:idorden)/(:idUsuario)", async (req, res) => {
  let idorden = req.params.idorden;
  let idUsuario = req.params.idUsuario;
  console.log(idorden);
  console.log(idUsuario);
  const datosRepartidor = await query({
    sql:`SELECT * FROM Repartidor WHERE idUsuario="${idUsuario}"`
  });
  console.log(datosRepartidor)
  let idRepartidor = datosRepartidor[0].idRepartidor
  const ActualizarOrden = await query({
    sql:`UPDATE Orden SET idRepartidor = "${idRepartidor}", estadoPedido = 2 WHERE idOrden="${idorden}"`
  });
  if (ActualizarOrden.affectedRows > 0) {
    res.send({ resultado: true });
  } else {
    res.send({ resultado: false });
  }
});

app.get("/EntregarOrden/(:idorden)/(:idUsuario)", async (req, res) => {
  let idorden = req.params.idorden;
  let idUsuario = req.params.idUsuario;
  console.log(idorden);
  console.log(idUsuario);
  const datosRepartidor = await query({
    sql:`SELECT * FROM Repartidor WHERE idUsuario="${idUsuario}"`
  });
  console.log(datosRepartidor)
  let idRepartidor = datosRepartidor[0].idRepartidor
  const ActualizarOrden = await query({
    sql:`UPDATE Orden SET idRepartidor = "${idRepartidor}", estadoPedido = 3 WHERE idOrden="${idorden}"`
  });
  if (ActualizarOrden.affectedRows > 0) {
    res.send({ resultado: true });
  } else {
    res.send({ resultado: false });
  }
});

app.get("/CancelarOrden/(:idorden)/(:idUsuario)", async (req, res) => {
  let idorden = req.params.idorden;
  let idUsuario = req.params.idUsuario;
  console.log(idorden);
  console.log(idUsuario);
  const datosRepartidor = await query({
    sql:`SELECT * FROM Repartidor WHERE idUsuario="${idUsuario}"`
  });
  console.log(datosRepartidor)
  let idRepartidor = datosRepartidor[0].idRepartidor
  const ActualizarOrden = await query({
    sql:`UPDATE Orden SET idRepartidor = "${idRepartidor}", estadoPedido = 4 WHERE idOrden="${idorden}"`
  });
  if (ActualizarOrden.affectedRows > 0) {
    res.send({ resultado: true });
  } else {
    res.send({ resultado: false });
  }
});

app.get('/OrdenActiva/(:idUsuario)', async (req, res) => {
  const { idUsuario } = req.params
  console.log(`SELECT * FROM Repartidor WHERE idUsuario="${idUsuario}"`);
  const datosRepartidor = await query({
    sql:`SELECT * FROM Repartidor WHERE idUsuario="${idUsuario}"`
  });
  console.log(datosRepartidor)
  let idRepartidor = datosRepartidor[0].idRepartidor
  let idDepartamento = datosRepartidor[0].idDepto
  let idCiudad = datosRepartidor[0].idCiudad
  console.log(idRepartidor)
  console.log(idDepartamento)
  console.log(idCiudad)
  const DatosOrden = await query({
    sql:`SELECT * FROM Orden WHERE idRepartidor="${idRepartidor}" AND estadoPedido = 2`
  });
  const NombreDepartamento = await query({
    sql:`SELECT DeptoDsc as name FROM Departamento WHERE idDepto = "${datosRepartidor[0].idDepto}"`
  })
  const NombreCiudad = await query({
    sql:`SELECT CiudadDsc as name FROM Ciudad WHERE idCiudad = "${datosRepartidor[0].idCiudad}"`
  })
  
  console.log("DatosOrden")
  console.log(DatosOrden)
  console.log(DatosOrden.length)
  console.log("DatosOrden.length === 0")
  console.log(DatosOrden.length === 0)
  res.send({ datos: DatosOrden.length === 0, departamento: NombreDepartamento[0].name, ciudad: NombreCiudad[0].name})

})

app.get('/OrdenPendiente/(:idUsuario)', async (req, res) => {
  const { idUsuario } = req.params
  console.log(`SELECT * FROM Repartidor WHERE idUsuario="${idUsuario}"`);
  const datosRepartidor = await query({
    sql:`SELECT * FROM Repartidor WHERE idUsuario="${idUsuario}"`
  });
  console.log(datosRepartidor)
  let idRepartidor = datosRepartidor[0].idRepartidor
  const DatosOrden = await query({
    sql:`SELECT * FROM Orden WHERE idRepartidor="${idRepartidor}" AND estadoPedido = 2`
  });
  console.log("DatosOrden")
  console.log(DatosOrden)
  console.log(DatosOrden.length)
  res.send({ ordenes: DatosOrden,cantidadOrdenes: DatosOrden.length })
})

app.get('/lisadoOrdenes/(:idUsuario)', async (req, res) => {
  const { idUsuario } = req.params
  const ordenes = []
  console.log(`SELECT * FROM Repartidor WHERE idUsuario="${idUsuario}"`);
  const datosRepartidor = await query({
    sql:`SELECT * FROM Repartidor WHERE idUsuario="${idUsuario}"`
  });
  console.log(datosRepartidor)
  let idRepartidor = datosRepartidor[0].idRepartidor
  let idDepartamento = datosRepartidor[0].idDepto
  let idCiudad = datosRepartidor[0].idCiudad
  console.log(idRepartidor)
  console.log(idDepartamento)
  console.log(idCiudad)
  const DatosOrden = await query({
    sql:`SELECT * FROM Orden WHERE estadoPedido = 1 AND idCiudad = "${idCiudad}" AND idDepartamento = "${idDepartamento}"`
  });
  /*
  const DatosOrden = await query({
    sql:`SELECT * FROM Orden WHERE idCiudad = "${idCiudad}" AND idDepartamento = "${idDepartamento}"`
  });
  */
  console.log("DatosOrden")
  console.log(DatosOrden)
  console.log(DatosOrden.length)
  res.send({ ordenes: DatosOrden,cantidadOrdenes: DatosOrden.length })

})

//---------------------------------------------------------------------------------------------------------------------------//

// -----------------------------------------------SOLICITUD CAMBIO DE ZONA-----------------------------------------------------------------------
app.post('/CambiodeZona', async function (req, res) {
  const { usuario,
    idRepartidor,
    razonCambio,
    departamento,
    ciudad } = req.body

  const idDepartamento = await query({
    sql: `SELECT idDepto as id FROM Departamento WHERE DeptoDsc = "${departamento}"`
  })

  const idCiudad = await query({
    sql: `SELECT idCiudad as id FROM Ciudad WHERE CiudadDsc = "${ciudad}"`
  })
  console.log(idDepartamento)
  console.log(idCiudad)
  console.log(idDepartamento)
  console.log(idCiudad)
  //Estados
  //0 - Pendiente
  //1 - Aceptado
  //2 - Rechazado

  await query({
    sql: `INSERT INTO CambioZona(idRepartidor,Razon,Estado,idDepartamento,idCiudad) VALUES(?,?,?,?,?)`,
    params: [idRepartidor, razonCambio, 0, idDepartamento[0].id, idCiudad[0].id]
  })
  return res.send({ agregado: true, error: "" })
});

// -----------------------------------------------FIN SOLICITUD CAMBIO DE ZONA -----------------------------------------------------------------------//

// -----------------------------------------------PERFIL REPARTIDOR-----------------------------------------------------------------------

app.post('/Informacion', async function (req, res) {
  const { idusuario
  } = req.body
  const datosUsuario = await query({
    sql: `SELECT * FROM usuario2 WHERE idUsuario="${idusuario}"`
  })
  const datosRepartidor = await query({
    sql: `SELECT * FROM Repartidor WHERE idUsuario="${idusuario}"`
  })
  const NombreDepartamento = await query({
    sql: `SELECT DeptoDsc as name FROM Departamento WHERE idDepto = "${datosRepartidor[0].idDepto}"`
  })
  const NombreCiudad = await query({
    sql: `SELECT CiudadDsc as name FROM Ciudad WHERE idCiudad = "${datosRepartidor[0].idCiudad}"`
  })
  //Aqui falta ver lo de cuando el status este 
  const DatosOrdenes = await query({
>>>>>>> Stashed changes
  })
  let sumaCalificacion = 0;
  let promedio = 0;
  if (DatosOrdenes.length > 0) {
    for (let i = 0; i < DatosOrdenes.length; i++) {
      const dato = DatosOrdenes[i];
      sumaCalificacion += dato.RepCalif
    }
    promedio = sumaCalificacion / datos.length;
  } else {
    console.log('El array está vacío.');
  }

  const fecha = datosRepartidor[0].RepFecNac;
  const fechaFormateada = format(new Date(fecha), "yyyy/MM/dd");
  let respuesta = {
    nombreCompleto: datosRepartidor[0].RepNom1 + " " + datosRepartidor[0].RepNom2 + " " + datosRepartidor[0].RepApe1 + " " + datosRepartidor[0].RepApe2,
    username: datosUsuario[0].usuario,
    email: datosUsuario[0].email,
    idRepartidor: datosRepartidor[0].idRepartidor,
    departamento: NombreDepartamento[0].name,
    ciudad: NombreCiudad[0].name,
    nacimiento: fechaFormateada,
    telefono: datosRepartidor[0].RepNumCel,
    tieneLicencia: datosRepartidor[0].RepLicencia,
    tieneTransProp: datosRepartidor[0].RepTransProp,
    calificacion: promedio,
  }
  if (datosRepartidor[0].RepLicencia === 1) {
    const datosLicencia = await query({
      sql: `SELECT * FROM RepLicencia WHERE idRepartidor = "${datosRepartidor[0].idRepartidor}"`
    });
    respuesta.numLic = datosLicencia[0].RepNumLic;
    respuesta.tipoLic = datosLicencia[0].RepTipoLic;
    const fecha1 = datosLicencia[0].RepFecExpLic;
    const fechaFormateada1 = format(new Date(fecha1), "yyyy/MM/dd");
    respuesta.expiracion = fechaFormateada1;
  };
  if (datosRepartidor[0].RepTransProp === 1) {
    const datosVehiculo = await query({
      sql: `SELECT * FROM RepVehiculo WHERE idRepartidor = ${datosRepartidor[0].idRepartidor}`
    });
    respuesta.numPlaca = datosVehiculo[0].VehPlacaNum;
    respuesta.tipoPlaca = datosVehiculo[0].VehTipPlaca;
  };
  console.log(respuesta)
  return res.send(respuesta)
})

// -----------------------------------------------FIN PERFIL REPARTIDOR -----------------------------------------------------------------------//

// -----------------------------------------------REGISTRO REPARTIDOR-----------------------------------------------------------------------
app.post('/registroRepartidor', async function (req, res) {
  const { usuario,
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
    id,
    fileContent,
    departamento,
    ciudad } = req.body

  const idUsuario = await query({
    sql: `SELECT idUsuario AS id FROM usuario2 WHERE usuario="${usuario}"`
  })
  if (idUsuario.length > 0) {
    return res.send({ agregado: false, error: "Ya existe un usuario registrado con el username utilizado" })
  }

  const repartidorExiste = await query({
    sql: `SELECT idRepartidor FROM Repartidor WHERE RepNom1="${nombre1}" AND RepNom2="${nombre2}" AND 
    RepApe1 ="${apellido1}" AND RepApe2 ="${apellido2}"`
  })
  if (repartidorExiste.length > 0) {
    return res.send({ agregado: false, error: "Ya existe un repartidor registrado con ese nombre" })
  }

  const idDepartamento = await query({
    sql: `SELECT idDepto as id FROM Departamento WHERE DeptoDsc = "${departamento}"`
  })

  const idCiudad = await query({
    sql: `SELECT idCiudad as id FROM Ciudad WHERE CiudadDsc = "${ciudad}"`
  })

  const url = await saveFilePDF(id + Date.now().toString(), fileContent);
  //Se inserta el repartidor en la tabla repartidor y en la tabla usuario
  let propio = 0;
  if (hasTransporte) {
    propio = 1;
  };
  let lic = 0;
  if (hasLicense) {
    lic = 1;
  };
  let pass = md5(password)
  console.log(idCiudad)
  console.log(idDepartamento)
  const fecha = fechaNacimiento;
  const fechaFormateada = format(new Date(fecha), "yyyy-MM-dd");
  console.log(fechaFormateada); // "2023/04/12"

  await query({
    sql: `INSERT INTO usuario2(usuario,nombre,apellido,email,password,estado,rol) VALUES(?,?,?,?,?,?,?)`,
    params: [usuario, nombre1 + ' ' + nombre2, apellido1 + ' ' + apellido2, email, pass, 2, 1]
  })

  const idusuario = await query({
    sql: `SELECT idUsuario AS id FROM usuario2 WHERE usuario="${usuario}"`
  })

  await query({
    sql: `INSERT INTO Repartidor(idCiudad,idDepto,idPais,RepNom1,RepNom2,RepApe1,RepApe2,RepFecEstatus,RepFecNac,RepNumCel,RepCorrElect,
    RepCV, RepTransProp,RepEst,idUsuario,RepLicencia) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    params: [idCiudad[0].id, idDepartamento[0].id, 1, nombre1, nombre2, apellido1, apellido2, 0, fechaFormateada, telefono, email, url.Location, propio, 2, idusuario[0].id, lic]
  })

  const idRepartidor = await query({
    sql: `SELECT idRepartidor FROM Repartidor WHERE RepNom1="${nombre1}" AND RepNom2="${nombre2}" AND 
    RepApe1 ="${apellido1}" AND RepApe2 ="${apellido2}"`
  })
  console.log(idRepartidor)
  if (hasLicense) {
    const fecha1 = fechaVencimiento;
    const fechaFormateada1 = format(new Date(fecha1), "yyyy-MM-dd");
    await query({
      sql: `INSERT INTO RepLicencia(idRepartidor,RepNumLic,RepTipoLic,RepFecExpLic) VALUES(?,?,?,?)`,
      params: [idRepartidor[0].idRepartidor, noLicencia, licenseType, fechaFormateada1]
    })
  }
  if (hasTransporte) {
    await query({
      sql: `INSERT INTO RepVehiculo(VehPlacaNum,VehTipPlaca,idRepartidor,RepVehiculoEst) VALUES(?,?,?,?)`,
      params: [noPlaca, "M", idRepartidor[0].idRepartidor, 1]
    })
  }
  return res.send({ agregado: true, error: "" })
});

// -----------------------------------------------FIN REGISTRO REPARTIDOR -----------------------------------------------------------------------//

// -----------------------------------------------START S3 SAVE IMAGE-----------------------------------------------------------------------
app.post('/prueba', async function (req, res) {
  const body = req.body;
  console.log(body.id);
  console.log(body.fileContent);
  const url = await saveFilePDF(body.id, body.fileContent);
  console.log(url.Location);
  res.send(url);
});
// -----------------------------------------------END S3 SAVE IMAGE-----------------------------------------------------------------------//

// -----------------------------------------------START S3 SAVE FILE PDF-----------------------------------------------------------------------

const saveFilePDF = async (id, base64String) => {
  const s3 = new AWS.S3({
    region: process.env.REGION,
    accessKeyId: process.env.ACCESSKEYID,
    secretAccessKey: process.env.SECRETACCESSKEY,
  })
  const bucketName = process.env.BUCKETNAME
  const base64Data = new Buffer.from(base64String, 'base64')
  const params = {
    Bucket: bucketName,
    Key: `PDFs/${id}`,
    Body: base64Data,
    ContentEncoding: 'base64',
    ContentType: 'application/pdf'
  }
  const response = await s3.upload(params).promise()
  return response
}
// -----------------------------------------------END S3 SAVE FILE PDF-----------------------------------------------------------------------//


// -----------------------------------------------START S3 SAVE IMAGE-----------------------------------------------------------------------
const saveImagePedido = async (id, base64) => {
  var id = id
  var foto = base64
  //carpeta y nombre que quieran darle a la imagen
  var cadena = 'Pedidos/' + id // fotos -> se llama la carpeta UBICACION
  //se convierte la base64 a bytes
  let buff = new Buffer.from(foto, 'base64')
  var s3 = new AWS.S3({
    region: process.env.REGION,
    accessKeyId: process.env.ACCESSKEYID,
    secretAccessKey: process.env.SECRETACCESSKEY,
  }) // se crea una variable que pueda tener acceso a las caracteristicas de S3
  const params = {
    Bucket: process.env.BUCKETNAME, // nombre
    Key: cadena, // Nombre de ubicacion
    Body: buff, // Imagen enn bytes
    ContentType: 'image', // tipo de contenido
  }
  const response = await s3.upload(params).promise()
  return response
}
// -----------------------------------------------END S3 SAVE IMAGE-----------------------------------------------------------------------//

// -----------------------------------------------LOGIN----------------------------------------------------
app.get('/mostrarUsuarios', function (req, res) {
  conn.query('SELECT * FROM usuario2',
    function (err, results, fields) {
      if (err) throw err;
      else console.log('Selected ' + results.length + ' row(s).');

      res.send(results)
      console.log('Done.');
    })
});


app.get("/login/(:usuario)/(:password)", function (req, res) {
  let usuario = req.params.usuario;
  let password = req.params.password;

  console.log(usuario);
  console.log(password);

  /* Códigos de respuesta:
   * 0: no existe usuario
   * 1: login correcto
   * -1: error inesperado o datos incorrectos
   * -2: contraseña incorrecta
   *  3: inactivo
   */
  //console.log('prueba '+md5(passwordRequest));
  conn.query("SELECT * FROM usuario2 where usuario = ?", [usuario], function (err, results, fields) {
    if (err) throw err;
    else {
      console.log("Selected " + results.length + " row(s).");
      if (results.length === 0) {
        console.log('No existe el usuario');
        return res.send({ resultadoLogin: 0 });
      }
      else if (results.length === 1) {
        if (results[0].estado === 0) {
          console.log('Usuario inactivo');
          return res.send({ resultadoLogin: 3 }); // 3 usuario inactivo           
        } else if (results[0].estado === 2) {
          console.log('Usuario pendiente de activacion.');
          return res.send({ resultadoLogin: 2 }); // 3 usuario inactivo           
        }

        password = md5(password);
        console.log('password ingresada (después de encriptación):' + password)
        if (results[0].password == password) {
          console.log('login exitoso');
          return res.send({ resultadoLogin: 1 });
        }
        else {
          console.log('contraseña incorrecta');
          return res.send({ resultadoLogin: -2 }); // -2 código de contraseña incorrecta           
        }

      } else {
        console.log('error inesperado o datos incorrectos');
        return res.send({ resultadoLogin: -1 });
      }
      //res.send((results));
      //console.log(results);
    }
  });

});



// -----------------------------------------------REGISTRO-----------------------------------------------------------------------

app.get("/consultarUsuario/(:usuario)", function (req, res) { // Consulta información usuario
  let usuario = req.params.usuario;
  conn.query("SELECT * FROM usuario2 where usuario = ? ", [usuario], function (err, results, fields) {
    if (err) throw err;
    else console.log("Selected " + results.length + " row(s).");
    res.send((results));
  });
});

app.get("/consultarExistenciaUsuario/(:usuario)", function (req, res) { // Consulta cantidad de usuarios con nombre :usuario
  let usuario = req.params.usuario;
  conn.query("SELECT * FROM usuario2 where usuario = ? ", [usuario], function (err, results, fields) {
    if (err) throw err;
    else console.log("Selected " + results.length + " row(s).");
    res.send({ cantidad: results.length });
  });

});

/** ROLES
 * 0: Administrador
 * 1: Repartidor
 * 2: Usuario
 * 3: Empresa
 */

app.post("/registro", function (req, res) {
  let usuario = req.body.usuario;
  let nombre = req.body.nombre;
  let apellido = req.body.apellido;
  let email = req.body.email;
  let rol = req.body.rol;
  //let password = req.body.password;
  //let rol = req.body.rol;
  let password = md5(req.body.password);

  conn.query(
    "insert into usuario2(usuario, nombre, apellido, email, password, rol) VALUES (?,?,?,?,?,?);",
    [usuario, nombre, apellido, email, password, rol], // ROl: 0 ->administrador, 1 ->repartidor, 2->usuario (consumidor), 3->empresa
    function (err, results, fields) {
      if (err) {
        console.log(err);
        return res.send({ insertarUsuario: false });
      } else {
        console.log("Inserted " + results.affectedRows + " row(s).");
        return res.send({ insertarUsuario: true });
      }
    }
  );
});


app.post('/resgistroEmpresa', async function (req, res) {
  const { usuario, nombre, nit, email, password, categoria, pdfFile, departamento, ciudad, descripcion } = req.body
  const pdfUrls = []
  let pdfUrl = ""
  let pass = md5(password);

  const idUsuario = await query({
    sql: `SELECT idUsuario AS id FROM usuario2 WHERE usuario="${usuario}"`
  })
  if (idUsuario.length > 0) {
    return res.send({ agregado: false, error: "Ya existe un usuario registrado con el username utilizado" })
  }

  const empresaExiste = await query({
    sql: `SELECT idEmpresa FROM Empresa WHERE EmpNombre="${nombre}"`
  })
  if (empresaExiste.length > 0) {
    return res.send({ agregado: false, error: "Ya existe una empresa registrada con ese nombre" })
  }

  const idTipoDoc = await query({
    sql: `SELECT idTipDoc AS id FROM TipoDocu WHERE TipDocDsc="PDF"`
  })
  if (idTipoDoc.length === 0) return res.send({ agregado: false, error: "Error al seleccionar categoria de archivo PDF" })


  const idDepartamento = await query({
    sql: `SELECT idDepto as id FROM Departamento WHERE DeptoDsc = "${departamento}"`
  })

  const idCiudad = await query({
    sql: `SELECT idCiudad as id FROM Ciudad WHERE CiudadDsc = "${ciudad}"`
  })

  const idCategoria = await query({
    sql: `SELECT idTipEmp as id FROM TipoEmpresa WHERE TipEmpDsc = "${categoria}"`
  })

  //Se inserta la empresa en la tabla empresa y en la tabla usuario
  await query({
    sql: `INSERT INTO usuario2(usuario,nombre,apellido,email,password,estado,rol) VALUES(?,?,?,?,?,?,?)`,
    params: [usuario, nombre, nombre, email, pass, 2, 3]
  })

  const idusuario = await query({
    sql: `SELECT idUsuario AS id FROM usuario2 WHERE usuario="${usuario}"`
  })

  await query({
    sql: `INSERT INTO Empresa(idTipEmp,idCiudad,idDepto,idPais,NIT,EmpNombre,EmpDsc,EmpEmail,EmpEst,idUsuario) VALUES(?,?,?,?,?,?,?,?,?,?)`,
    params: [idCategoria[0].id, idCiudad[0].id, idDepartamento[0].id, 1, nit, nombre, descripcion, email, 2, idusuario[0].id]
  })

  const idEmpresa = await query({
    sql: `SELECT idEmpresa AS id FROM Empresa WHERE EmpNombre="${nombre}"`
  })

  for (let pdf of pdfFile) {
    pdfUrl = await saveFilePDF(pdf.pdfName + Date.now().toString() + ".pdf", pdf.pdfContent)
    pdfUrls.push(pdfUrl.Location)
    query({
      sql: `INSERT INTO empDocs(idTipDoc,idEmpresa,idTipEmp,idCiudad,idDepto,idPais,Docu,DocFecCarga) VALUES(?,?,?,?,?,?,?,sysdate())`,
      params: [idTipoDoc[0].id, idEmpresa[0].id, idCategoria[0].id, idCiudad[0].id, idDepartamento[0].id, 1, pdfUrl.Location]
    })
  }
  console.log(pdfUrls)
  return res.send({ agregado: true, error: "" })
})

//------------------------------- PERFIL ADMINISTRADOR-----------------------------

app.get('/listaUsuarios', function (req, res) {
  conn.query('SELECT * FROM usuario2 where estado in (0,1)',
    function (err, results, fields) {
      if (err) throw err;
      else console.log('Selected ' + results.length + ' row(s).');

      res.send(results)
      console.log('Done.');
    })
});

/** Ordenes
 * 0 pendiente de asignar repartidor
 * 1 en ruta
 * 2 entregado
 * 3 cancelado
 */

app.get('/listaRepartidores', function (req, res) {
  conn.query('select rep.* from Repartidor rep where rep.RepEst = 1 and rep.idRepartidor not in (select idRepartidor from Orden where estadoPedido not in (0,1,2))',
    function (err, results, fields) {
      if (err) throw err;
      else console.log('Selected ' + results.length + ' row(s).');

      res.send(results)
      console.log('Done.');
    })
})

app.get('/listaEmpresas', function (req, res) {
  conn.query('select emp.* from Empresa emp where emp.EmpEst = 1 and emp.idEmpresa not in (select idEmpresa from Orden where estadoPedido not in (0,1,2))',
    function (err, results, fields) {
      if (err) throw err;
      else console.log('Selected ' + results.length + ' row(s).');

      res.send(results)
      console.log('Done.');
    })
})

app.post('/cambiarEstadoUsuario', function (req, res) {
  let estado = req.body.estado;
  let idUsuario = req.body.idUsuario;

  conn.query('UPDATE usuario2 SET estado = ? WHERE idUsuario = ?;', [estado, idUsuario],
    function (err, results, fields) {
      if (err) {
        console.log(err)
        return res.send({ "actualizado": false })
      }
      else {
        console.log('Se actualiza ' + results.affectedRows + ' usuario(s).');
        return res.send({ "actualizado": true })
      }
    });
});

app.get('/solicitudesRepartidor', function (req, res) {
  conn.query('select rep.*, (select Pais from Pais where idPais = rep.idPais) as pais, (select DeptoDsc from Departamento where idDepto = rep.idDepto) as departamento, (select CiudadDsc from Ciudad where idCiudad = rep.idCiudad) as ciudad from Repartidor rep where RepEst = 2',
    function (err, results, fields) {
      if (err) throw err;
      else console.log('Selected ' + results.length + ' row(s).');

      res.send(results)
      console.log('Done.');
    })
});

app.post('/aprobarSolicitud', async function (req, res) {
  let estado = req.body.estado;
  let idUsuario = req.body.idUsuario;
  let idSolicitud = req.body.idSolicitud;
  let tipo = req.body.tipo;
  let operacion = req.body.operacion;
  let comentario = req.body.comentario;

  const fechaFormateada = format(new Date(), "yyyy/MM/dd");
  console.log("date: " + fechaFormateada)

  await query({
    sql: `UPDATE usuario2 SET estado = ? WHERE idUsuario = ?;`,
    params: [estado, idUsuario]
  })

  if (tipo == 1) {
    if (operacion = 1) {
      await query({
        sql: `UPDATE Repartidor SET RepEst = ?, RepFecEstAlta = ?, comentario = ? WHERE idRepartidor = ?;`,
        params: [estado, fechaFormateada, comentario, idSolicitud]
      })
    } else {
      await query({
        sql: `UPDATE Repartidor SET RepEst = ?, RepFecEstBaja = ?, comentario = ? WHERE idRepartidor = ?;`,
        params: [estado, fechaFormateada, comentario, idSolicitud]
      })
    }
  } else {
    if (operacion = 1) {
      await query({
        sql: `UPDATE Empresa SET EmpEst = ? ,EmpFecAlta = ?, comentario = ? WHERE idEmpresa = ?;`,
        params: [estado, fechaFormateada, comentario, idSolicitud]
      })
    } else {
      await query({
        sql: `UPDATE Empresa SET EmpEst = ? ,EmpFecBaja = ?, comentario = ? WHERE idEmpresa = ?;`,
        params: [estado, fechaFormateada, comentario, idSolicitud]
      })
    }
  }
  return res.send({ "actualizado": true })
});

app.get('/solicitudesEmpresa', function (req, res) {
  conn.query('select emp.*,(select TipEmpDsc from TipoEmpresa where idTipEmp = emp.idTipEmp) as tipoEmpresa,(select Pais from Pais where idPais = emp.idPais) as pais,(select DeptoDsc from Departamento where idDepto = emp.idDepto) as departamento,(select CiudadDsc from Ciudad where idCiudad = emp.idCiudad) as ciudad from Empresa emp where EmpEst = 2',
    function (err, results, fields) {
      if (err) throw err;
      else console.log('Selected ' + results.length + ' row(s).');

      res.send(results)
      console.log('Done.');
    })
});

app.post("/docsEmpresa", function (req, res) {
  let idEmpresa = req.body.idEmpresa;
  conn.query("select Docu from empDocs where idEmpresa = ?", [idEmpresa],
    function (err, results, fields) {
      if (err) throw err;
      else console.log("selected " + results.length + " row(s).");
      res.send(({ data: results }));
    });
});

app.get('/solicitudesCambioZona', function (req, res) {
  conn.query("select cz.NoSolicitud,cz.Razon,cz.Estado,CONCAT(rep.RepNom1,' ',rep.RepApe1) as Nombre,(select DeptoDsc from Departamento where idDepto = cz.idDepartamento) as NuevoDepartamento, (select CiudadDsc from Ciudad where idCiudad = cz.idCiudad and idDepto = cz.idDepartamento) as NuevaCiudad, cz.idRepartidor,cz.idCiudad as idNuevaCiudad,cz.idDepartamento as idNuevoDepto , (select CiudadDsc from Ciudad where idCiudad = rep.idCiudad and idDepto = rep.idDepto) as ViejaCiudad,(select DeptoDsc from Departamento where idDepto = rep.idDepto) as ViejoDepartamento from CambioZona cz join Repartidor rep on cz.idRepartidor = rep.idRepartidor where cz.Estado = 0",
    function (err, results, fields) {
      if (err) throw err;
      else console.log('Selected ' + results.length + ' row(s).');

      res.send(results)
      console.log('Done.');
    })
});


app.post('/aprobarSolicitudCambioZona', async function (req, res) {
  let estado = req.body.estado;
  let idSolicitud = req.body.idSolicitud;
  let idRepartidor = req.body.idRepartidor;
  let idCiudad = req.body.idCiudad;
  let idDepto = req.body.idDepto;
  let tipo = req.body.tipo;

  if (tipo == 1) {
    await query({
      sql: `UPDATE Repartidor SET idCiudad = ?, idDepto = ? WHERE idRepartidor = ?;`,
      params: [idCiudad, idDepto, idRepartidor]
    })
    await query({
      sql: `UPDATE CambioZona SET Estado = ? WHERE NoSolicitud = ?;`,
      params: [estado, idSolicitud]
    })
  } else {
    await query({
      sql: `UPDATE CambioZona SET Estado = ? WHERE NoSolicitud = ?;`,
      params: [estado, idSolicitud]
    })
  }
  return res.send({ "actualizado": true })
});

//-----------------------------FIN PERFIL ADMIN------------------------------------


//---------------------------------EMPRESAS----------------------------------------
app.post('/agregarProducto', async function (req, res) {
  let { nombre, categoria, precio, picture, empresaName } = req.body
  picture = await (await saveImagePedido(Date.now().toString() + ".png", picture)).Location

  categoria = categoria.toUpperCase()

  let idCategoria = await query({
    sql: `SELECT idCateProd AS idCategoria FROM CateProd WHERE CataProdDsc ="${categoria}"`
  })

  if (!idCategoria.length) {
    await query({
      sql: `INSERT INTO CateProd(CataProdDsc) VALUES("${categoria}")`
    })
    idCategoria = await query({
      sql: `SELECT idCateProd AS idCategoria FROM CateProd WHERE CataProdDsc ="${categoria}"`
    })
  }

  let empresa = await query({
    sql: `SELECT * FROM Empresa e, usuario2 u WHERE u.usuario="${empresaName}" AND u.rol=3 AND e.EmpNombre = u.nombre`
  })
  console.log(empresa)
  console.log(empresaName)
  if (!empresa.length) {
    return res.send({ "agregado": false })
  }

  let { idEmpresa, idTipEmp, idCiudad, idDepto, idPais } = empresa[0]

  query({
    sql: `INSERT INTO EmpProd(idEmpresa,idTipEmp,idCiudad,idDepto,idPais,idCateProd,ProdDsc,ProdImg,precio) VALUES(?,?,?,?,?,?,?,?,?)`,
    params: [idEmpresa, idTipEmp, idCiudad, idDepto, idPais, idCategoria[0].idCategoria, nombre, picture, precio]
  })

  return res.send({ "agregado": true })
})

app.get('/catalogoProductos/(:userEmpresa)', async (req, res) => {
  const { userEmpresa } = req.params
  const catalogo = []
  const consulta = `SELECT e.idEmpresa FROM Empresa e, usuario2 u WHERE u.usuario="${userEmpresa}" AND u.rol=3 AND e.EmpNombre = u.nombre`
  console.log(consulta)
  const idEmpresa = await query({
    sql: `SELECT e.idEmpresa AS id FROM Empresa e, usuario2 u WHERE u.usuario="${userEmpresa}" AND u.rol=3 AND e.EmpNombre = u.nombre`
  })
  console.log(idEmpresa)

  const categorias = await query({
    sql: `SELECT * FROM CateProd`
  })

  for (let categoria of categorias) {
    console.log(`SELECT * FROM EmpProd WHERE idEmpresa=${idEmpresa[0].id} AND idCateProd="${categoria.idCateProd}"`)
    const productos = await query({
      sql: `SELECT * FROM EmpProd WHERE idEmpresa=${idEmpresa[0].id} AND idCateProd="${categoria.idCateProd}"`
    })
    catalogo.push({ categoria, productos })
  }

  res.send({ productos: catalogo, error: "" })

})


app.get('/producto/(:idProducto)', async function (req, res) {
  const { idProducto } = req.params
  const producto = await query({
    sql: `SELECT * FROM EmpProd WHERE IdProd=${idProducto}`
  })
  const categoria = await query({
    sql: `SELECT CataProdDsc FROM CateProd WHERE idCateProd="${producto[0].idCateProd}"`
  })
  res.send({ producto, categoria })
})


app.put('/producto', async function (req, res) {
  const { idProducto, nombreProducto, categoria, precio } = req.body
  let { picture } = req.body
  console.log(picture)
  picture = picture === "" ? "" : (await saveImagePedido(Date.now().toString() + ".png", picture)).Location

  let idCategoria = await query({
    sql: `SELECT idCateProd AS idCategoria FROM CateProd WHERE CataProdDsc ="${categoria}"`
  })

  if (!idCategoria.length) {
    await query({
      sql: `INSERT INTO CateProd(CataProdDsc) VALUES("${categoria}")`
    })
    idCategoria = await query({
      sql: `SELECT idCateProd AS idCategoria FROM CateProd WHERE CataProdDsc ="${categoria}"`
    })
  }

  if (!picture) {
    await query({
      sql: `UPDATE EmpProd SET ProdDsc="${nombreProducto}", idCateProd=${idCategoria[0].idCategoria}, 
           precio=${precio} WHERE idProd=${idProducto}`
    })
  } else {
    await query({
      sql: `UPDATE EmpProd SET ProdDsc="${nombreProducto}", idCateProd=${idCategoria[0].idCategoria}, 
           ProdImg="${picture}",precio=${precio} WHERE idProd=${idProducto}`
    })
  }


  res.send({updated:true})

})

app.get('/ordenEmpresa/(:userEmpresa)', async (req,res) =>{
  const { userEmpresa } = req.params
  console.log(userEmpresa)
  const idEmpresa = await query({
      sql: `SELECT e.idEmpresa AS id FROM Empresa e, usuario2 u WHERE u.usuario="${userEmpresa}" AND u.rol=3 AND e.EmpNombre = u.nombre`
    })
  console.log(idEmpresa)  

  
  const data = {}

  const ordenes = await query({
    sql:`SELECT u.usuario, o.idOrden,c.CiudadDsc, d.DeptoDsc, o.montoPedido, o.fechaPedido
         FROM usuario2 u, Orden o, Ciudad c, Departamento d
         WHERE o.idUsuario = u.idUsuario
          AND o.idCiudad = c.idCiudad
          AND o.idDepartamento = d.idDepto
          AND o.estadoPedido=0
          AND o.idEmpresa = ?`,
    params:[idEmpresa[0].id]
  })
  console.log(ordenes)

  res.send({ordenes})

  /* ordenes.forEach(async (element) =>{
    const carrito = await query({
      sql:`SELECT `
    })
  }) */

})


app.put('/aceptarOrdenEmpresa', async (req,res) => {
  const {idOrden} = req.body

  query({
    sql:`UPDATE Orden SET estadoPedido = 1 WHERE idOrden = ${idOrden}`
  })

  res.send({updated:true})

  res.send({ updated: true })

})


app.put('/rechazarOrdenEmpresa', async (req,res) => {
  const {idOrden} = req.body

  query({
    sql:`UPDATE Orden SET estadoPedido = 4 WHERE idOrden = ${idOrden}`
  })

  res.send({updated:true})
  
})





app.delete('/producto/(:idProducto)', async function(req,res){
  const {idProducto} = req.params
  await query({
    sql: `DELETE FROM EmpProd WHERE IdProd=${idProducto}`
  })
  res.send({ eliminado: true })
})


app.get('/ciudades/(:departamento)', async function (req, res) {
  const { departamento } = req.params
  const idDepartamento = await query({
    sql: `SELECT idDepto as id FROM Departamento WHERE DeptoDsc = "${departamento}"`
  })
  if (idDepartamento.length < 0) return res.send([])
  const ciudades = await query({
    sql: `SELECT CiudadDsc as ciudad FROM Ciudad WHERE IdDepto="${idDepartamento[0].id}"`
  })
  //console.log(ciudades)
  return res.send(ciudades)
})

app.get('/departamentos', async function (req, res) {
  const departamentos = await query({
    sql: `SELECT DeptoDsc as departamento FROM Departamento`
  })
  //console.log(departamentos)
  return res.send(departamentos)
})


//--------------------------------FIN EMPRESAS-------------------------------------






// -------------------------------CATEGORÍAS RESTAURANTES--------------------------
app.get("/consultarListadoCategorias", function (req, res) {
  conn.query("SELECT * FROM CateProd", function (err, results, fields) {
    if (err) throw err;
    else console.log("Selected " + results.length + " row(s).");
    res.send((results));
  });
});

app.get("/consultarEmpresaPorCategoria/(:idCategoria)", function (req, res) {
  let idCategoria = req.params.idCategoria;
  conn.query(`select  distinct empresa.idEmpresa, empresa.EmpNombre from Empresa empresa 
              join EmpProd producto on empresa.idEmpresa = producto.idEmpresa
              join CateProd categoria on producto.idCateProd = categoria.idCateProd
              where categoria.idCateProd = ?`,[idCategoria], function (err, results, fields) {
    if (err) throw err;
    else console.log("Selected " + results.length + " row(s).");
    res.send((results));
  });
});

app.get("/consultarProductosPorEmpresa/(:idEmpresa)", function (req, res) {
  let idEmpresa = req.params.idEmpresa;
  conn.query(`select * from EmpProd where idEmpresa = ?`,[idEmpresa], function (err, results, fields) {
    if (err) throw err;
    else console.log("Selected " + results.length + " row(s).");
    res.send((results));
  });
});

app.get("/consultarPaises", function (req, res) {
  conn.query("SELECT * FROM Pais", function (err, results, fields) {
    if (err) throw err;
    else console.log("Selected " + results.length + " row(s).");
    res.send((results));
  });
});

app.get("/consultarDepartamentos", function (req, res) {
  conn.query("SELECT * FROM Departamento", function (err, results, fields) {
    if (err) throw err;
    else console.log("Selected " + results.length + " row(s).");
    res.send((results));
  });
});

app.get("/consultarCiudades", function (req, res) {
  conn.query("SELECT * FROM Ciudad", function (err, results, fields) {
    if (err) throw err;
    else console.log("Selected " + results.length + " row(s).");
    res.send((results));
  });
});

app.get("/consultarMetodosPago", function (req, res) {
  conn.query("SELECT * FROM TipoMetodoPago", function (err, results, fields) {
    if (err) throw err;
    else console.log("Selected " + results.length + " row(s).");
    res.send((results));
  });
});

app.get("/consultarMetodoPagoUsuario", function (req, res) {
  conn.query(`SELECT * FROM MetodoPagoUsuario mpu
  join TipoMetodoPago tmp on mpu.idTipoMetodoPago = tmp.idTipoMetodoPago`, function (err, results, fields) {
    if (err) throw err;
    else console.log("Selected " + results.length + " row(s).");
    res.send((results));
  });
});

app.get("/consultarPrueba", function (req, res) {
  conn.query("SELECT numTarjeta FROM MetodoPagoUsuario", function (err, results, fields) {
    if (err) throw err;
    else console.log("Selected " + results.length + " row(s).");
    res.send((results));
  });
});

app.get("/consultarMetodosPagoPorUsuario/(:idUsuario)", function (req, res) {
  let idUsuario = req.params.idUsuario;
  conn.query("SELECT * FROM MetodoPagoUsuario where idUsuario = ?",[idUsuario], function (err, results, fields) {
    if (err) throw err;
    else console.log("Selected " + results.length + " row(s).");
    res.send((results));
  });
});


app.post("/agregaOrden", async  function (req, res) {
  let { idEmpresa, idUsuario, idDepartamento, idCiudad, cantidadProductos, montoPedido } = req.body

  //Date.now().toString()

  const user = await query({
    sql: `SELECT idUsuario FROM usuario2 WHERE usuario = "${idUsuario}"`
  })

  console.log(user[0].idUsuario);
  const fecha = new Date();

  conn.query(
    `insert into Orden(idEmpresa, idUsuario, idRepartidor, estadoPedido, fechaPedido,idPais,idDepartamento,idCiudad,cantidadProductos,montoPedido,calificacion) 
    VALUES (?,?,?,?,?,?,?,?,?,?,?); `,
    [idEmpresa, user[0].idUsuario, -1, 0, fecha, 1,idDepartamento,idCiudad,cantidadProductos,montoPedido,5], 
    function (err, results, fields) {
      if (err) {
        console.log(err);
        return res.send({ insertarOrden: false });
      } else {
        console.log("Inserted " + results.affectedRows + " row(s).");
        return res.send({ insertarOrden: true });
      }
    }
  );
});

app.post('/llenarCarrito', async (req, res) => {
  const { items } = req.body
  const catalogo = []
  const consulta = `select idOrden from Orden order by idOrden desc limit 1`
  const idOrden = await query({
    sql: consulta
  })
  console.log(idOrden[0].idOrden);

  for (let item of items) {
    console.log(item);

    await query({
      sql: `INSERT INTO Carrito(idOrden,idProducto,cantidad,monto) VALUES(?,?,?,?)`,
      params: [idOrden[0].idOrden,item.id,item.quantity,item.price]
    })
  }

  res.send({ orden: idOrden})

});

app.get("/consultarOrdenes", function (req, res) {
  conn.query("SELECT * FROm Orden", function (err, results, fields) {
    if (err) throw err;
    else console.log("Selected " + results.length + " row(s).");
    res.send((results));
  });
});


app.get("/consultarRestaurantes/(:palabraClave)", function (req, res) {
  let palabraClave = req.params.palabraClave;
  conn.query(`select * from Empresa where EmpNombre like '%${palabraClave}%'`, function (err, results, fields) {
    if (err) throw err;
    else console.log("Selected " + results.length + " row(s).");
    res.send((results));
  });
});

//------------------------------FIN CATEGORÍAS RESTAURANTES------------------------

app.listen(4000);
console.log("Server running on port 4000");
