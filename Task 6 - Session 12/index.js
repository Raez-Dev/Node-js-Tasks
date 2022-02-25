// Import
const express = require('express');
const { engine } = require('express-handlebars');
const Productos = require('./controllers/Productos');

//  Constants
const _Productos = new Productos()
const app = express();
const PORT = 8000;

//  Config Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Define handlebars express stup
app.engine(
    "hbs",
    engine({
        extname: 'hbs',
        defaultLayout: 'index.hbs',
        layoutsDir: `${__dirname}/views/layouts`,
        partialsDir: `${__dirname}/views/partials`,
    })
);
app.set('view engine', 'hbs'); // registra el motor de plantillas
app.set('views', './views'); // especifica el directorio de vistas

//  Routes
app.get('/', function(req, res) {
    res.render('partials/nuevoProducto', {});
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