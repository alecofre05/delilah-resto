const jwt = require('jsonwebtoken')
const config = require('../config')

 const validations = {
     isAuthorized: (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const tokenDecoded = jwt.verify(token, config.jwtSecret)
            
            if(tokenDecoded) {
                req.user = { username: tokenDecoded.username, isAdmin: tokenDecoded.isAdmin}
                next()
            }
        }
        catch(err) {
            res.status(401).json({
                isSuccess: false,
                error: 'No se reconoce el usuario' + err
            })
        }
    },
    isAdmin: (req, res, next) => {
        if(!req.user.isAdmin) {
            res.status(403).json({
                isSuccess: false,
                error: 'Usted no tiene permiso para acceder al recurso solicitado'
            })
        }

        next();
    }
 }

module.exports = validations