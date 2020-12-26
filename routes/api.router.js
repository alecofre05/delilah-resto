const router = require('express').Router();
const pedidosController = require('../controllers/pedidos.controller')
const productosController = require('../controllers/productos.controller')
const usersValidation = require('../validations/users.validation')
const usersController = require('../controllers/users.controller')


//Rutas usuarios
router.post('/users', usersValidation.isAuthorized, usersValidation.isAdmin, usersController.createUsuarios)
router.get('/users/login', usersController.authenticate)

//Rutas productos
router.get('/productos', usersValidation.isAuthorized, productosController.getProductos)
router.get('/productos/:id', usersValidation.isAuthorized, productosController.getProductoById)
router.post('/productos', usersValidation.isAuthorized, usersValidation.isAdmin, productosController.createProductos)
router.put('/productos/:id', usersValidation.isAuthorized, usersValidation.isAdmin, productosController.updateProduct)
router.delete('/productos/:id', usersValidation.isAuthorized, usersValidation.isAdmin, productosController.deleteProduct)

//Rutas pedidos
router.post('/pedidos', usersValidation.isAuthorized, pedidosController.createPedidos)
router.get('/pedidos', usersValidation.isAuthorized, usersValidation.isAdmin, pedidosController.getPedidos)
router.get('/pedidos/:id', usersValidation.isAuthorized, usersValidation.isAdmin, pedidosController.getByID)
router.put('/pedidos/:id', usersValidation.isAuthorized, usersValidation.isAdmin, pedidosController.updatePedidos)
router.delete('/pedidos/:id', usersValidation.isAuthorized, usersValidation.isAdmin, pedidosController.deletePedidos)



module.exports = router