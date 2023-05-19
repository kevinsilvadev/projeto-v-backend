import dotenv from 'dotenv'
dotenv.config()

export const sqlConfig = {
    server: "ZULU18" + "\\" + "SQLEXPRESS",
    database: process.env.DATABASE_NAME,
    user: process.env.USER,
    password:process.env.PASSWORD,
    options: {
        encrypt:true,
        trustServerCertificate:true
    }
}

