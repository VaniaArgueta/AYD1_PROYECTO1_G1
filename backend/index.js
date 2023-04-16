import express from 'express';
import conn from "./conexion.js";
import bodyParser from 'body-parser';
import cors from "cors";
import dotenv from 'dotenv';
import md5 from 'md5';
import AWS from 'aws-sdk';

dotenv.config();

const app = express();6
var corsOptions = { origin: true, optionsSuccessStatus: 200 };
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: '1000mb'}));

app.get("/", function (req, res) {
  res.send("Bienvenido a Proyecto 1 AlChilazo's NodeJs server")
});

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
         */
        //console.log('prueba '+md5(passwordRequest));
        conn.query("SELECT * FROM usuario2 where usuario = ? ",[usuario], function (err, results, fields) {
            if (err) throw err;
            else {
              console.log("Selected " + results.length + " row(s).");   
              if(results.length === 0){
                console.log('No existe el usuario');
                return res.send({ resultadoLogin: 0 });
              }
              else if(results.length === 1){
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

app.listen(4000);
console.log("Server running on port 4000");
  