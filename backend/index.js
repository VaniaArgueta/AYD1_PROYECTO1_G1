import express from 'express';
import conn from "./conexion.js";
import bodyParser from 'body-parser';
import cors from "cors";
import dotenv from 'dotenv';
import md5 from 'md5';

dotenv.config();

const app = express();
var corsOptions = { origin: true, optionsSuccessStatus: 200 };
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("Bienvenido a Pryecto 1 AlChilazo's NodeJs server")
});

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
  