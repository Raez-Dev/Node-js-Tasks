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

// Define handlebars express setup
app.set('layout', 'views/layouts');
app.set('view engine', 'ejs');

//  Routes
app.get('/', function(req, res) {
    // res.render('partials/nuevoProducto', {});
    res.render('partials/nuevoProducto', { layout: true });
});

app.get('/list', async(req, res) => {
    let response = await _Productos.getAll();
    let listProduct = response.IsSuccess ? response.data : [];
    let products = response.IsSuccess ? true : false;
    res.render('partials/listaProducto', { products: products, listProduct: listProduct });
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