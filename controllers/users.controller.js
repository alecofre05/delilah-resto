const jwt = require('jsonwebtoken')
const config = require('../config')
const db = require('../models/index')
const bcrypt = require('bcrypt')
const {salt} = require('../config')

const usersController = {
    createUsuarios: async (req, res) => {
        const claveSinEncriptar = req.body.clave;
        const claveEncriptada = await bcrypt.hash(claveSinEncriptar, parseInt(config.salt));
        const usuario = db.users.build({
            nombre: req.body.nombre, apellido: req.body.apellido, usuario: req.body.usuario, correoElectronico: req.body.correoElectronico,
            telefono: req.body.telefono, direccionDeEnvio: req.body.direccionDeEnvio, clave: claveEncriptada, isAdmin: req.body.isAdmin
        })
        if (!usuario.validate()) {
            res.status(400).json();
        }
        if (!validateCorreoElectronico(usuario.correoElectronico)) {
            res.status(400).json({
                isSuccess: false,
                error: 'El Correo Electronico ya esta registrado'
            })
        }
        try {
            await usuario.save()
            res.status(201).json();
        }
        catch (error) {
            res.status(500).json({
                isSuccess: false,
                error: error
            })
        }
    },

    authenticate: async (req, res) => {
        const {usuario, clave} = req.body
        if (usuario == null || clave == null) {
            res.status(400).json({
                isSucces: false,
                error: 'usuario y clave son requeridos'
            })
            return
        }

        const isValid = await validateUsernameAndPassword(usuario, clave);
        if(!isValid) {
            res.status(401).json({
                isSuccess: false,
                error: 'Usuario y/o clave incorrectos'
            })
            return
        }
        const token = jwt.sign({ usuario: usuario, isAdmin: await isAdmin(usuario) }, config.jwtSecret);
        res.json(token);
    }
}


// Validar si el correo electronico ya existe dentro de mi DB
async function validateCorreoElectronico(email) {
    const result = await db.users.findAll({
        where: {
            correoElectronico: email,
        }
    })
    if (result.length > 0)
        return false
    return true;
}

async function validateUsernameAndPassword(usuario, clave) {
    const usuarioDb = await db.users.findOne({
        where: {
            usuario: usuario,
        }
    })
    if (usuarioDb == null)
        return false;
    const compareResult = await bcrypt.compare(clave, usuarioDb.clave)
    if (!compareResult) {
        return false;
    }
    return true;
}

async function isAdmin(usuario) {
    const usuarioDb = await db.users.findOne({
        where: {
            usuario: usuario,
        }
    })
    if (usuarioDb !== null && usuarioDb.isAdmin)
        return true;
    return false;
}

module.exports = usersController;