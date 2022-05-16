// Import
//const { resolve } = require('dns');
require('dotenv').config()
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')
const { engine } = require('express-handlebars');
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const Productos = require('./controllers/Productos');
const Mensajes = require("./controllers/Mensajes");
const { Console } = require('console');
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
app.use(cookieParser())
app.use(session({
    store: MongoStore.create({ mongoUrl: process.env.MONGOURL }),
    secret: process.env.SECRETKEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 10
    }
}))


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

    if (req.session.name) {
        res.render('partials/nuevoProducto', { name: req.session.name });
    } else {
        res.redirect('/login');
    }

});

app.get('/login', function(req, res) {
    if (req.session.name) {
        res.redirect('/');
    } else {
        res.render('layouts', { layout: 'login' });
    }
});

app.get('/logout', function(req, res) {
    if (req.session.name) {
        let name = req.session.name;
        console.log(name);
        req.session.destroy(err => {
            if (!err) {
                res.render('layouts', { layout: 'logout', data: { "name": name } });
            } else {
                res.send({ status: 'Logout ERROR', body: err })
            }
        })

    } else {
        res.redirect('/login');
    }
});

app.get('/list', async(req, res) => {
    let response = await _Productos.getAll();
    let listProduct = response.IsSuccess ? response.data : [];
    let products = response.IsSuccess ? true : false;
    res.render('partials/listaProducto', { products: products, listProduct: listProduct });
});

app.get('/api/productos-test', async(req, res) => {
    let listProduct = await _Productos.getFakeData();
    let products = true;
    res.render('partials/listaProducto', { products: products, listProduct: listProduct });
});

app.post('/api/login', async(req, res) => {

    const { name } = req.body;

    if (req.session.name) {
        res.send({ IsSuccess: false, msg: "Sesion Activa" })
    } else {
        req.session.name = name
        res.send({ IsSuccess: true, msg: "Sesion creada" })
    }
})

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
    socket.emit('recibirMensaje', responseMensaje);

    socket.on('nuevoProducto', async(producto) => {
        await _Productos.save(producto);
        let response = await _Productos.getAll();
        io.sockets.emit('propagacionProductos', response.data)
    })

    socket.on('enviarMensaje', async(mensaje) => {
        await mensajes.save(mensaje);
        let lstMensaje = await mensajes.getAll();
        io.sockets.emit('recibirMensaje', lstMensaje);
    })
})