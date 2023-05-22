import dotenv from 'dotenv'
var Connection = require('tedious').Connection;  

dotenv.config()

/*export const sqlConfig = {
    server: "ZULU18" + "\\" + "SQLEXPRESS",
    database: process.env.DATABASE_NAME,
    user: process.env.USER,
    password:process.env.PASSWORD,
    options: {
        encrypt:true,
        trustServerCertificate:true
    }
}*/


export const config = {  
    server: 'dpaschoal-teste.database.windows.net', 
    authentication: {
        type: 'default',
        options: {
            userName: 'teste',
            password: '123@qwer'  
        }
    },
    options: {
        encrypt: true,
        database: 'dpaschoal_teste' 
    }
};  
const connection = new Connection(config);  

connection.connect();