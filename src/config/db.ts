import dotenv from 'dotenv'
import { Connection } from 'tedious';

dotenv.config()

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
        database: 'dpaschoal-teste' 
    }
};  
const connection = new Connection(config);  

connection.connect();