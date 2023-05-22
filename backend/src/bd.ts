import dotenv from 'dotenv'
var Connection = require('tedious').Connection;  

dotenv.config()

export const config = {  
    server: 'dpaschoal-teste.database.windows.net', 
    authentication: {
        type: 'default',
        options: {
            userName: process.env.USER,
            password: process.env.PASSWORD  
        }
    },
    options: {
        encrypt: true,
        database: 'dpaschoal_teste' 
    }
};  
const connection = new Connection(config);  

connection.connect();