// Import
const express = require('express');
const Routes = require('./routes');

//  Constants
const app = express();
const PORT = 8080;

//  Config Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//  Routes Middleware
app.use('/', Routes.routerMain);
app.use('/api/productos', Routes.routerProductos);


//  PORT Config
app.listen(PORT, () => {
    console.log(`App is running in http://localhost:${PORT}`);
})