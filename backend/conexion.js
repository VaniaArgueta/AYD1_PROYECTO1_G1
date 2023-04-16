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

export const query = ({sql , params = []})=>{
  return new Promise((resolve,reject) =>{
      if(!sql || !sql.length){
          return reject(err)
      }
      conn.query(sql,params,function(err,result){
          if(err){
              return reject(err)
          }
          if(!result){
              return reject(err)
          }
          
          resolve(result)
      })
  })
}

export default conn;