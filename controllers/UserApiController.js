const User = require("../models/User");

/* 
GET para obtener todos los usuarios​
Ejemplo: /users​
*/

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find()
        return res.status(200).json(users)
    } catch (error) {
        console.log(error);
        return next({ "message": "Error al obtener los Usuarios" })
    }
}
/*
GET para obtener usuario por email​
/users?email=usuarioprueba@gmail.com
*/

const getPorEmailUser = async (req, res, next) => {
    const { email } = req.query
    if (email == undefined) {
        next()
    } else {
        try {
            const users = await User.find({ email })
            return res.status(200).json(users)
        } catch (error) {
            console.log(error);
            return next({ "message": "Error al obtener usuario por Email" })
        }
    }
}

/*POST Para crear un nuevo usuario en el sistema. El objeto a crear tendrá 
los mismos campos como los documentos proporcionandos en MongoDB
*/

const createUser = async (req, res, next) => {
    try {
        const { body } = req
        const newUser = new User(body)
        const result = await newUser.save()
        return res.status(200).json(result)
    } catch (error) {
        console.log(error);
        return next({ "message": "Error al crear usuario" })
    }
}


/*
PUT Para editar un usuario en el sistema. Búsqueda para editar por email. 
El objeto a editar tendrá los mismos campos como los documentos proporcionandos 
en MongoDB como ejemplo.
*/
const updateUser = async (req, res, next) => {
    try {
        const { body } = req;
        const { email } = body;
        const _id = await User.find({ email }, "_id")
        const UserToUpdate = new User(body);
        UserToUpdate._id = _id[0]._id
        const result = await User.findOneAndUpdate({ email }, UserToUpdate);
        return res.status(200).json(result)

    } catch (error) {
        console.log(error);
        return next({ "message": "Error al editar usuario" })
    }
}

/*
DELETE Para borrar un usuario del sistema. Búsqueda para borrar por email.
Ejemplo: /users/delete
*/
 

const removeUser = async (req, res, next) => {
    try {
        const {email} = req.params;
        const result = await User.findOneAndRemove({ email });
        return res.status(200).json(result)
    } catch (error) {
        console.log(error);
        return next({ "message": "Error al eliminar usuario" })
    }
}



module.exports = {
    getUsers,
    getPorEmailUser,
    createUser,
    updateUser,
    removeUser
}