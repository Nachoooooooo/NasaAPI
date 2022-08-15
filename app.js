const dotenv = require ("dotenv")
dotenv.config({path:"./config.env"})
//Variable de entorno

const connection = require("./utils/db")

connection()
