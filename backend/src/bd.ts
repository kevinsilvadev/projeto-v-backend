import dotenv from 'dotenv'
import { Connection } from 'tedious';

dotenv.config()

export const config = {  
    server: 'dpaschoal-teste-server.database.windows.net', 
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