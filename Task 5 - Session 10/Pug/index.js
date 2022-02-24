// Import
const express = require('express');
const Productos = require('./controllers/Productos');

//  Constants
const _Productos = new Productos()
const app = express();
const PORT = 8000;

//  Config Middleware
app.use('static', express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'pug'); // registra el motor de plantillas
app.set('views', './views'); // especifica el directorio de vistas

//  Routes
app.get('/', function(req, res) {
    res.render('nuevoProducto', {});
});

app.get('/list', async(req, res) => {
    let response = await _Productos.getAll();
    let listProduct = response.IsSuccess ? response.data : [];
    let products = response.IsSuccess ? true : false;
    res.render('listaProducto', { products: products, listProduct: listProduct });
});
app.post('/new',
    async(req, res) => {
        const response = await _Productos.save(req.body);
        if (response.IsSuccess === true) {
            res.redirect('../list');
        } else {
            res.json(response);
        }
    })

//  PORT Config
app.listen(PORT, () => {
    console.log(`App is running in http://localhost:${PORT}`);
})