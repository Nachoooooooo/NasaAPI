const dotenv = require("dotenv")
const express = require("express")
const landingRoutes = require("./routes/landing.routes")
const neaRoutes = require("./routes/nea.routes")
dotenv.config({ path: "./config.env" })
//Variable de entorno

const app = express()
const connection = require("./utils/db")

connection()
app.use(express.json())
app.use("/api/astronomy/landings",landingRoutes)
app.use("/api/astronomy/neas", neaRoutes)
app.listen(process.env.ENV_PORT, () => {
    console.log(`Servidor escuchando en el puerto ${process.env.ENV_PORT}`);
})
