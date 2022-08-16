const Nea = require ("../models/Nea")

/* NUM 1
GET para obtener la designación y el período anual en base a la clase orbital 
del asteroide (con query params)​
Ejemplo: /astronomy/neas?class=aten​
*/

/* NUM 2
GET para obtener designación, fecha y período anual de todos los asteroides
 que cumplan el filtro de fechas dadas​
/astronomy/neas?from=2010&to=2015
/astronomy/neas?from=2010
/astronomy/neas?to=2015
En este caso, además, podremos poner la fecha más específica si quisiéramos:
YYYY-MM-DD
YYYY-MM
YYYY
*/

/* NUM 3
POST Para crear un nuevo NEA en el sistema. El objeto a crear tendrá los mismos campos 
como los documentos proporcionandos en MongoDB como ejemplo: */

const createNea = async (req, res, next) => {
    try {
        const { body } = req
        const newNea = new Nea(body)
        const result = await newNea.save()
        return res.status(200).json(result)
    } catch (error) {
        console.log(error);
        return next({ "message": "Error al crear nueva Nea" })
    }
}

/* NUM 4
PUT Para editar un NEA en el sistema. Búsqueda para editar por designation. 
El objeto a editar tendrá los mismos campos como los documentos proporcionandos 
en MongoDB como ejemplo.
*/

const updateNea = async (req, res, next) => {
    try {
        const { body } = req
        const { designation } = body
        const updateNea = new Nea(body)
        updateNea._id = body._id
        const result = await Nea.findOneAndUpdate({ designation }, updateNea)
        return res.status(200).json(result)
    } catch (error) {
        console.log(error);
        return next({ "message": "Error al actualizar Nea" })
    }
}

/* NUM 5
DELETE Para borrar un NEA del sistema. Búsqueda para borrar por designation.
Ejemplo: /astronomy/neas/delete
*/

const deleteNea = async (req, res, next) => {
    try {
        const { designation } = req.params
        const removeNea = await Nea.findOneAndRemove({ designation })
        return res.status(200).json(removeNea)
    } catch (error) {
        console.log(error);
        return next({ "message": "Error al eliminar Nea" })
    }
}

module.exports = {
    createNea,
    updateNea,
    deleteNea
}