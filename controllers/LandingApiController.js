const Landing = require("../models/Landing")

//lógica de negocio
/*
GET para obtener nombre y masa de todos aquellos meteoritos cuya masa sea igual o superior a una masa (gr) dada (con query parameters)​
Ejemplo: /astronomy/landings?minimum_mass=200000​
*/
//gte (mayor o igual)

const getNombreMasaPorMasaIgualSuperior = async (req, res, next) => {
    const { minimum_mass } = req.query
    if (minimum_mass === undefined) {
        next()
    } else {
        try {
            const result = await Landing.find({ "$expr": { "$gte": [{ "$toDecimal": "$mass" }, parseFloat(minimum_mass)] } }, ' -_id name mass')
            return res.status(200).json(result)
        } catch (error) {
            console.log(error);
            return next({ "message": "Error al realizar la busqueda" })
        }
    }
}



/*
GET para obtener nombre y masa de uno o más meteoritos cuya masa sea la especificada (route params)​
Ejemplo: /astronomy/landings/mass/200000​
*/
//eq = igual
const getNombreMasaPorMasaIgual = async (req, res, next) => {
    const { mass } = req.params
    try {
        const result = await Landing.find({ "$expr": { "$eq": [{ "$toDecimal": "$mass" }, parseFloat(mass)] } }, "name mass -_id")
        return res.status(200).json(result)
    } catch (error) {
        console.log(error);
        return next({ "message": "Error al realizar la busqueda" })
    }
}

/*
GET para obtener los nombres y clase de aquellos meteoritos cuya clase sea la registrada (route params)​
Ejemplo: /astronomy/landings/class/L6​
*/

const getNombreClasePorClase = async (req, res, next) => {
    const { recclass } = req.params
    try {
        const result = await Landing.find({ recclass }, "name recclass -_id")
        return res.status(200).json(result)
    } catch (error) {
        console.log(error);
        return next({ "message": "Error al realizar la busqueda" })
    }
}

/*
    GET para obtener nombre, masa y fecha de todos los meteoritos caídos en determinadas fechas de la siguiente manera:​
    /astronomy/landings?from=1960&to=1990
    /astronomy/landings?from=1960
    /astronomy/landings?to=1990
    El mismo endpoint deberá ser compatible con las 3 formas
*/

const getNombreMasaFechaPorFecha = async (req, res, next) => {
    const { from, to } = req.query
    const fromDate = new Date(from)
    const toDate = new Date(to)
    let filter = {}
    const EXP_DATE = {
        from: {
            "$expr": {
                "$gte": [{ "$toDate": "$year" }, fromDate]// gte mayor o igual
            }
        },
        to: {
            "$expr": {
                "$lte": [{ "$toDate": "$year" }, toDate] //lte menor o igual
            }
        }
    }

    if (from && to)
        filter = {
            "$and": [
                EXP_DATE.from,
                EXP_DATE.to
            ]
        }
    else if (from)
        filter = EXP_DATE.from;

    else if (to)
        filter = EXP_DATE.to;
    try {
        const result = await Landing.find(filter, " reclong reclat fall id recclass name mass year nametype geolocation -_id")
        return res.status(200).json(result)
    } catch (error) {
        console.log(error);
        return next({ "message": "Error al realizar la busqueda" })
    }
}

/*
POST Para crear un nuevo landing en el sistema. 
El objeto a crear tendrá los mismos campos como los documentos proporcionandos en MongoDB como ejemplo:
*/

const createLanding = async (req, res, next) => {
    try {
        const { body } = req
        const newLanding = new Landing(body)
        const result = await newLanding.save()
        return res.status(200).json(result)
    } catch (error) {
        console.log(error);
        return next({ "message": "Error al crear nueva Landing" })
    }
}

/*
PUT Para editar un landing en el sistema. 
Búsqueda para editar por ID. El objeto a editar tendrá los mismos campos como 
los documentos proporcionandos en MongoDB como ejemplo.
*/


const updateLanding = async (req, res, next) => {
    try {
        const { body } = req
        const { id } = body
        const updateLanding = new Landing(body)
        updateLanding._id = body._id
        const result = await Landing.findOneAndUpdate({ id }, updateLanding)
        return res.status(200).json(result)
    } catch (error) {
        console.log(error);
        return next({ "message": "Error al actualizar Landing" })
    }
}

/*
DELETE Para borrar un landing en el sistema. Búsqueda para borrar por ID.
Ejemplo: /astronomy/landings/delete​
*/

const deleteLanding = async (req, res, next) => {
    try {
        const { id } = req.params
        const removeLanding = await Landing.findOneAndRemove({ id })
        return res.status(200).json(removeLanding)
    } catch (error) {
        console.log(error);
        return next({ "message": "Error al eliminar Landing" })
    }
}


module.exports = {
    getNombreMasaPorMasaIgualSuperior,
    getNombreMasaPorMasaIgual,
    getNombreClasePorClase,
    getNombreMasaFechaPorFecha,
    createLanding,
    updateLanding,
    deleteLanding
}