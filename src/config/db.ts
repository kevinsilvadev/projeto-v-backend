import dotenv from 'dotenv'
import { Connection } from 'tedious';

dotenv.config()

export const config = {  
    server: 'dpaschoal-teste2.database.windows.net', 
    authentication: {
        type: 'default',
        options: {
            userName: 'teste',
            password: '123@qwer'  
        }
    },
    options: {
        encrypt: true,
        database: 'dpaschoal-teste2' 
    }
};  
const connection = new Connection(config);  

connection.connect();