const db = require("../models/index");

const pedidosController = {
    //Create pedidos
    createPedidos: async (req, res) => {
    let productos = []
    if(req.body.estado == null || req.body.total == null || req.body.formaDePago || req.body.direccion || req.body.productos) {
        res.status(400).json({
            isSuccess: false,
            error: "Algunos de los datos solicitados son requeridos"
        });
    }
    try {
        let pedido = await db.pedidos.create({
            estado: req.body.estado, total: req.body.total, formaDePago: req.body.formaDePago, direccion: req.body.direccion,
        })
        req.body.productos.forEach(async element => {
            let producto = await db.productos.findOne({
                where: {
                    id: element.id
                }
            })
            await pedido.setProductos(producto)
        })
        res.status(201).json(); 
    }
    catch(error) {
        res.status(500).json({
            isSuccess: false,
            error: error
        })
    }
},

//Get Pedidos
    getPedidos: async (req, res) => {
        let pedidos = await db.pedidos.findAll()
        if(pedidos.lenght > 0)
            res.json(pedidos)
        else
            res.status(204).json()
},

//Get Pedidos by ID
    getByID: async (req, res) => {
    let pedido = await db.pedidos.findOne({
        where: {
            id: req.params.id
        }
    })
    if (pedidos !== null)
        res.json(pedido)
    else
        res.status(404).json()
},

//Update action
    UpdatePedidos: async (req, res) => {
        let pedidos = await db.pedidos.findOne({
            where: {
                id: req.params.id
            }
        })
        if(pedidos == null)
            res.status(404).json()
            await pedidos.update({
                estado: req.body.estado,
                total: req.body.total,
                formaDePago: req.body.formaDePago,
                direccion: req.body.direccion
            })
            res.status(204).json();
    },

//Delete action
    deletePedidos: async (req, res) => {
        let pedido = await db.pedidos.findOne({
            where: {
                id: req.params.id
            }
        })
        if(pedido == null)
            req.status(404).json()
        await pedido.destroy()
        res.status(204).json()
    }
}


module.exports = pedidosController