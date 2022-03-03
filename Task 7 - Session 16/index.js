// Import
const { resolve } = require('dns');
const express = require('express');
const { engine } = require('express-handlebars');
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const Productos = require('./controllers/Productos');
const Mensajes = require("./controllers/Mensajes");
let mensajes = new Mensajes('mensajes.txt');

//  Constants
const _Productos = new Productos()
const app = express();
const PORT = 3000;
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

//  Config Middleware
app.use(express.static('./public'));
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
    });

// El servidor funcionando en el puerto 3000
httpServer.listen(PORT, () => {
    console.log(`App is running in http://localhost:${PORT}`);
})

// Socket.Io Methods
io.on('connection', async(socket) => {

    console.log(`Nueva coneccion ${socket.id}`);
    let response = await _Productos.getAll();
    let responseMensaje = await mensajes.getAll();
    socket.emit('propagacionProductos', response.data);
    socket.emit('recibirMensaje', responseMensaje.data);

    socket.on('nuevoProducto', async(producto) => {
        await _Productos.save(producto);
        let response = await _Productos.getAll();
        io.sockets.emit('propagacionProductos', response.data)
    })

    socket.on('enviarMensaje', async(mensaje) => {
        await mensajes.save(mensaje);
        let lstMensaje = await mensajes.getAll();
        io.sockets.emit('recibirMensaje', lstMensaje.data);
    })
})