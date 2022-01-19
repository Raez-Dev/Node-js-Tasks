const Contenedor = require("./Contenedor");

test = async() => {
    let C1 = new Contenedor('productos.txt');
    const r1 = await C1.save({
        title: 'Escuadra',
        price: 123.45,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
    });
    const r2 = await C1.save({
        title: 'Calculadora',
        price: 234.56,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'
    });
    const r3 = await C1.save({
        title: 'Globo Terráqueo',
        price: 345.67,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png'
    });

    console.log(r1);
    console.log(r2);
    console.log(r3);

    console.log(await C1.getById(2));
    console.log(await C1.getAll());
    await C1.deleteById(1);
    console.log(await C1.getAll());
    await C1.deleteAll();
    console.log(await C1.getAll());
};

test();