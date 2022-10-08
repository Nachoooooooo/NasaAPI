const dotenv = require("dotenv")
const express = require("express")
var cors = require('cors');
const landingRoutes = require("./routes/landing.routes")
const neaRoutes = require("./routes/nea.routes")
const userRoutes = require ("./routes/user.routes")
dotenv.config({ path: "./config.env" })
//Variable de entorno

const app = express()
const connection = require("./utils/db")

connection()
app.use(cors());
app.use(express.json())
app.use("/api/astronomy/landings",landingRoutes)
app.use("/api/astronomy/neas", neaRoutes)
app.use("/api/astronomy/users", userRoutes)
app.listen(process.env.PORT, () => {
    console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
})
