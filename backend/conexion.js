import mysql from "mysql2";
import dotenv from 'dotenv';

var config = {
  host: "",
  user: "",
  password: "",
  database: "",
  port: 
};
const conn = new mysql.createConnection(config);

export default conn;