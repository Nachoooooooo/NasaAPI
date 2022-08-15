const dotenv = require ("dotenv")
const express = require ("express")
dotenv.config({path:"./config.env"})
//Variable de entorno

const app = express()
const connection = require("./utils/db")

connection()
app.use(express.json())
app.listen(process.env.ENV_PORT,()=>{
    console.log(`Servidor escuchando en el puerto ${process.env.ENV_PORT}`);
})
