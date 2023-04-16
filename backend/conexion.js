import mysql from "mysql2";
import dotenv from 'dotenv';

dotenv.config();

const config = {
  host: process.env.HOSTDB,
  user: process.env.USERDB,
  password: process.env.CONTRADB,
  database: process.env.DATABASE,
  port: process.env.PUERTODB
};

const conn = mysql.createConnection(config);

// Comprobar si la conexión se establece correctamente
conn.connect((err) => {
  if (err) {
    console.error('Error al conectarse a la base de datos:', err);
    return;
  }
  console.log('Conexión a la base de datos establecida');
});

export default conn;