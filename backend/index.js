import express from 'express';
import conn,{query} from "./conexion.js";
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
app.use(bodyParser.json({limit: '1000mb'}));

app.get("/", function (req, res) {
  res.send("Bienvenido a Proyecto 1 AlChilazo's NodeJs server")
});

// -----------------------------------------------REGISTRO REPARTIDOR-----------------------------------------------------------------------
app.post('/registroRepartidor', async function(req,res){
  const {usuario,
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
    ciudad} = req.body

  const idUsuario = await query({
    sql:`SELECT idUsuario AS id FROM usuario2 WHERE usuario="${usuario}"`
  })
  if(idUsuario.length>0){
    return res.send({agregado:false,error:"Ya existe un usuario registrado con el username utilizado"})
  }

  const repartidorExiste = await query({
    sql:`SELECT idRepartidor FROM Repartidor WHERE RepNom1="${nombre1}" AND RepNom2="${nombre2}" AND 
    RepApe1 ="${apellido1}" AND RepApe2 ="${apellido2}"`
  })
  if(repartidorExiste.length>0){
    return res.send({agregado:false,error:"Ya existe un repartidor registrado con ese nombre"})
  }

  const idDepartamento = await query({
    sql:`SELECT idDepto as id FROM Departamento WHERE DeptoDsc = "${departamento}"`
  })

  const idCiudad = await query({
    sql:`SELECT idCiudad as id FROM Ciudad WHERE CiudadDsc = "${ciudad}"`
  })

  const url = await saveFilePDF(id+Date.now().toString(), fileContent);
  //Se inserta el repartidor en la tabla repartidor y en la tabla usuario
  let propio = 0;
  if (hasTransporte){
    propio = 1;
  };
  let pass = md5(password)
  console.log(idCiudad)
  console.log(idDepartamento)
  const fecha = fechaNacimiento;
  const fechaFormateada = format(new Date(fecha), "yyyy/MM/dd");
  console.log(fechaFormateada); // "2023/04/12"
  await query({
    sql:`INSERT INTO Repartidor(idCiudad,idDepto,idPais,RepNom1,RepNom2,RepApe1,RepApe2,RepFecEstatus,RepFecNac,RepNumCel,RepCorrElect,
    RepCV, RepTransProp,RepEst) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    params:[idCiudad[0].id,idDepartamento[0].id,1,nombre1,nombre2,apellido1,apellido2,0,fechaFormateada,telefono,email,url.Location,propio,0]
  })
  await query({
    sql:`INSERT INTO usuario2(usuario,nombre,apellido,email,password,estado,rol) VALUES(?,?,?,?,?,?,?)`,
    params:[usuario,nombre1+' '+nombre2,apellido1+' '+apellido2,email,pass,0,1]
  })
  const idRepartidor = await query({
    sql:`SELECT idRepartidor FROM Repartidor WHERE RepNom1="${nombre1}" AND RepNom2="${nombre2}" AND 
    RepApe1 ="${apellido1}" AND RepApe2 ="${apellido2}"`
  })
  console.log(idRepartidor)
  if (hasLicense){
    const fecha1 = fechaVencimiento;
    const fechaFormateada1 = format(new Date(fecha1), "yyyy/MM/dd");
    await query({
      sql:`INSERT INTO RepLicencia(idRepartidor,idCiudad,idDepto,idPais,RepNumLic,RepTipoLic,RepFecExpLic) VALUES(?,?,?,?,?,?,?)`,
      params:[idRepartidor[0].idRepartidor,idCiudad[0].id,idDepartamento[0].id,1,noLicencia,licenseType,fechaFormateada1]
    })
  }
  if (hasTransporte){
    await query({
      sql:`INSERT INTO RepVehiculo(VehPlacaNum,VehTipPlaca,idRepartidor,idCiudad,idDepto,idPais,RepVehiculoEst) VALUES(?,?,?,?,?,?,?)`,
      params:[noPlaca,"M",idRepartidor[0].idRepartidor,idCiudad[0].id,idDepartamento[0].id,1,1]
    })
  }
  return res.send({agregado:true,error:""})
});

app.get('/ciudades/(:departamento)', async function(req,res){
  const {departamento} = req.params
  const idDepartamento = await query({
    sql:`SELECT idDepto as id FROM Departamento WHERE DeptoDsc = "${departamento}"`
  })
  if(idDepartamento.length<0) return res.send([])
  const ciudades = await query({
    sql:`SELECT CiudadDsc as ciudad FROM Ciudad WHERE IdDepto="${idDepartamento[0].id}"`
  })
  //console.log(ciudades)
  return res.send(ciudades)
})

app.get('/departamentos',async function(req,res){
  const departamentos = await query({
    sql:`SELECT DeptoDsc as departamento FROM Departamento`
  })
  //console.log(departamentos)
  return res.send(departamentos)
})
// -----------------------------------------------REGISTRO REPARTIDOR -----------------------------------------------------------------------//

// -----------------------------------------------START S3 SAVE IMAGE-----------------------------------------------------------------------
app.post('/prueba', async function(req, res) {
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
const saveImagePedido = async (id, base64) =>{
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
        conn.query("SELECT * FROM usuario2 where usuario = ?",[usuario], function (err, results, fields) {
            if (err) throw err;
            else {
              console.log("Selected " + results.length + " row(s).");   
              if(results.length === 0){
                console.log('No existe el usuario');
                return res.send({ resultadoLogin: 0 });
              }
              else if(results.length === 1){
                if(results[0].estado === 0){
                  console.log('Usuario inactivo');
                  return res.send({ resultadoLogin: 3 }); // 3 usuario inactivo           
                }

                password = md5(password);
                console.log('password ingresada (después de encriptación):'+password)
                if(results[0].password == password) {
                  console.log('login exitoso');
                  return res.send({ resultadoLogin: 1 });
                }
                else {
                  console.log('contraseña incorrecta');
                  return res.send({ resultadoLogin: -2 }); // -2 código de contraseña incorrecta           
                }
    
              }else {
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


  app.post('/resgistroEmpresa', async function(req,res){
    const {usuario,nombre,nit,email,password,categoria,pdfFile,departamento,ciudad,descripcion} = req.body
    const pdfUrls = []
    let pdfUrl = ""

    const idUsuario = await query({
      sql:`SELECT idUsuario AS id FROM usuario2 WHERE usuario="${usuario}"`
    })
    if(idUsuario.length>0){
      return res.send({agregado:false,error:"Ya existe un usuario registrado con el username utilizado"})
    }

    const empresaExiste = await query({
      sql:`SELECT idEmpresa FROM Empresa WHERE EmpNombre="${nombre}"`
    })
    if(empresaExiste.length>0){
      return res.send({agregado:false,error:"Ya existe una empresa registrada con ese nombre"})
    }

    const idTipoDoc = await query({
      sql:`SELECT idTipDoc AS id FROM TipoDocu WHERE TipDocDsc="PDF"`
    })
    if(idTipoDoc.length===0) return res.send({agregado:false,error:"Error al seleccionar categoria de archivo PDF"})


    const idDepartamento = await query({
      sql:`SELECT idDepto as id FROM Departamento WHERE DeptoDsc = "${departamento}"`
    })

    const idCiudad = await query({
      sql:`SELECT idCiudad as id FROM Ciudad WHERE CiudadDsc = "${ciudad}"`
    })

    const idCategoria = await query({
      sql:`SELECT idTipEmp as id FROM TipoEmpresa WHERE TipEmpDsc = "${categoria}"`
    })

    //Se inserta la empresa en la tabla empresa y en la tabla usuario
    await query({
      sql:`INSERT INTO Empresa(idTipEmp,idCiudad,idDepto,idPais,NIT,EmpNombre,EmpDsc,EmpEmail,EmpEst) VALUES(?,?,?,?,?,?,?,?,?)`,
      params:[idCategoria[0].id,idCiudad[0].id,idDepartamento[0].id,1,nit,nombre,descripcion,email,0]
    })
    await query({
      sql:`INSERT INTO usuario2(usuario,nombre,apellido,email,password,estado,rol) VALUES(?,?,?,?,?,?,?)`,
      params:[usuario,nombre,nombre,email,password,0,3]
    })

    const idEmpresa = await query({
      sql:`SELECT idEmpresa AS id FROM Empresa WHERE EmpNombre="${nombre}"`
    })

    for(let pdf of pdfFile){
      pdfUrl = await saveFilePDF(pdf.pdfName+Date.now().toString()+".pdf",pdf.pdfContent)
      pdfUrls.push(pdfUrl.Location)
      query({
        sql:`INSERT INTO empDocs(idTipDoc,idEmpresa,idTipEmp,idCiudad,idDepto,idPais,Docu,DocFecCarga) VALUES(?,?,?,?,?,?,?,sysdate())`,
        params:[idTipoDoc[0].id,idEmpresa[0].id,idCategoria[0].id,idCiudad[0].id,idDepartamento[0].id,1,pdfUrl.Location]
      })
    }
    console.log(pdfUrls)
    return res.send({agregado:true,error:""})
  })

//------------------------------- PERFIL ADMINISTRADOR-----------------------------

app.get('/listaUsuarios',function(req,res){
  conn.query('SELECT * FROM usuario2', 
      function (err, results, fields) {
          if (err) throw err;
          else console.log('Selected ' + results.length + ' row(s).');

          res.send(results)
          console.log('Done.');
      })
});

app.post('/cambiarEstadoUsuario',function(req,res){
  let estado = req.body.estado;
  let idUsuario = req.body.idUsuario;

  conn.query('UPDATE usuario2 SET estado = ? WHERE idUsuario = ?;', [estado,idUsuario],
  function (err, results, fields) {
      if (err){
          console.log(err)
          return res.send({ "actualizado": false })
      }
      else{
           console.log('Se actualiza ' + results.affectedRows + ' usuario(s).');
           return res.send({ "actualizado": true })
      }
 });
});

//-----------------------------FIN PERFIL ADMIN------------------------------------


//---------------------------------EMPRESAS----------------------------------------
app.post('/agregarProducto', async function(req,res){
    let {nombre,categoria,precio,picture,empresaName} = req.body
    picture = "sin_imagen"  //Temporal mientras se agregan los buckets

    categoria = categoria.toUpperCase()
    
    let idCategoria = await query({
      sql:`SELECT idCateProd AS idCategoria FROM CateProd WHERE CataProdDsc ="${categoria}"`
    })

    if(!idCategoria.length){
      await query({
        sql:`INSERT INTO CateProd(CataProdDsc) VALUES("${categoria}")`
      })
      idCategoria = await query({
        sql:`SELECT idCateProd AS idCategoria FROM CateProd WHERE CataProdDsc ="${categoria}"`
      })
    }

    let empresa = await query({
      sql:`SELECT * FROM Empresa WHERE EmpNombre ="${empresaName}"`
    })
    //console.log(empresa)
    console.log(empresaName)
    if(!empresa.length){ 
      return res.send({ "agregado": false })
    }
    
    let {idEmpresa,idTipEmp,idCiudad,idDepto,idPais} = empresa[0]

    query({
      sql:`INSERT INTO EmpProd(idEmpresa,idTipEmp,idCiudad,idDepto,idPais,idCateProd,ProdDsc,ProdImg,precio) VALUES(?,?,?,?,?,?,?,?,?)`,
      params:[idEmpresa,idTipEmp,idCiudad,idDepto,idPais,idCategoria[0].idCategoria,nombre,picture,precio]
    })

    return res.send({ "agregado": true })
})


app.get('/ciudades/(:departamento)', async function(req,res){
  const {departamento} = req.params
  const idDepartamento = await query({
    sql:`SELECT idDepto as id FROM Departamento WHERE DeptoDsc = "${departamento}"`
  })
  if(idDepartamento.length<0) return res.send([])
  const ciudades = await query({
    sql:`SELECT CiudadDsc as ciudad FROM Ciudad WHERE IdDepto="${idDepartamento[0].id}"`
  })
  //console.log(ciudades)
  return res.send(ciudades)
})

app.get('/departamentos',async function(req,res){
  const departamentos = await query({
    sql:`SELECT DeptoDsc as departamento FROM Departamento`
  })
  //console.log(departamentos)
  return res.send(departamentos)
})


//--------------------------------FIN EMPRESAS-------------------------------------

app.listen(4000);
console.log("Server running on port 4000");
  