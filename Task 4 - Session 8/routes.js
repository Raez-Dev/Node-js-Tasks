// Import
const express = require('express');
const { body, validationResult, checkSchema } = require('express-validator');
const { Router } = express;
const Productos = require('./Productos');


//  Constants
const routerProductos = Router();
const routerMain = Router();
const _Productos = new Productos()


//  Routes middleware
routerMain.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

routerProductos.get('/', async(req, res) => {
    res.json(await _Productos.getAll());
})

routerProductos.get('/:id', async(req, res) => {
    const { id } = req.params
    res.json(await _Productos.getById(parseInt(id)));
})

routerProductos.post('/',
    checkSchema({
        title: {
            isString: true,
        },
        price: {
            isFloat: true,
            toFloat: true
        },
        thumbnail: {
            isString: true
        },
    }),
    async(req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        res.json(await _Productos.save(req.body));
    })

routerProductos.put('/:id',
    checkSchema({
        title: {
            isString: true,
        },
        price: {
            isFloat: true,
            toFloat: true
        },
        thumbnail: {
            isString: true
        },
    }), async(req, res) => {
        const { id } = req.params;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        res.json(await _Productos.update({...req.body, id: parseInt(id) }));

    })

routerProductos.delete('/:id', async(req, res) => {
    const { id } = req.params
    res.json(await _Productos.deleteById(parseInt(id)));
})

const Routes = { routerProductos, routerMain };
module.exports = Routes;