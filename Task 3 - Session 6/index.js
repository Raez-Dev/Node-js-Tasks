const Contenedor = require("./Contenedor");
let C1 = new Contenedor('productos.txt');

test = async () => {
    await C1.save({
        title: 'Escuadra',
        price: 123.45,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
    });
    await C1.save({
        title: 'Calculadora',
        price: 234.56,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'
    });
    await C1.save({
        title: 'Globo Terráqueo',
        price: 345.67,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png'
    });
};

const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.json());


app.get("/", (req, res) => {
    res.send('Welcome to our API ');
})


app.get("/productos", async (req, res) => {
    let repository = new Contenedor('productos.txt');
    let productos = await repository.getAll();

    if (productos) {
        res.send(productos);
    }
    else {
        res.send('Empty List');
    }
})

app.get("/productoRandom", async (req, res) => {
    let repository = new Contenedor('productos.txt');
    let productos = await repository.getAll();

    if (productos) {
        let rnd = Math.floor((Math.random() * ((productos.length - 1) + 1)));
        let randomProduct = productos[rnd];
        res.send(randomProduct);
    }
    else {
        res.send('Empty List');
    }

})

app.listen(PORT, async () => {
    await test();
    console.log(`App is running on http://localhost:${PORT}`);
})