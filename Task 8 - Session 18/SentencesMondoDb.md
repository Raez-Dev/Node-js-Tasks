# Task 8 - BD Ecommerce

##  Crea y selecciona la BD
`use ecommerce`

##  Crea colleccion mensaje y producto
`db.createCollection("mensajes")`
`db.createCollection("productos")`

##  Agregar datos a colleccion de mensajes

`db.mensajes.insert([
    {
        "message": "Hola",
        "mail": "test_1@gmail.com",
        "date": "03/3/2022 23:08"
    },
    {
        "message": "Como estan?",
        "mail": "test_2@gmail.com",
        "date": "03/3/2022 23:08"
    },
    {
        "message": "Todo bien?",
        "mail": "test_3@gmail.com",
        "date": "03/3/2022 23:08"
    },
    {
        "message": "Acabaron la tarea?",
        "mail": "test_4@gmail.com",
        "date": "03/3/2022 23:08"
    },
    {
        "message": "Casiii estoy volando",
        "mail": "test_5@gmail.com",
        "date": "03/3/2022 23:08"
    },
    {
        "message": "Ya se acaba el tiempo, corree",
        "mail": "test_6@gmail.com",
        "date": "03/3/2022 23:08"
    },
    {
        "message": "Oka Oka",
        "mail": "test_7@gmail.com",
        "date": "03/3/2022 23:08"
    },
    {
        "message": "Sintieron el temblor",
        "mail": "test_8@gmail.com",
        "date": "03/3/2022 23:08"
    },
    {
        "message": "Aqui en Mexico no",
        "mail": "test_9@gmail.com",
        "date": "03/3/2022 23:08"
    },
    {
        "message": "En colombia tampoco",
        "mail": "test_10@gmail.com",
        "date": "03/3/2022 23:08"
    },
    
])`

##  Agregar datos a colleccion de productos
`db.productos.insert([
    {
        "name":"Laptop",
        "url":"https://th.bing.com/th/id/OIP.sGJ3G-6Rz3RcYjbnSQoDVwHaE8?pid=ImgDet&rs=1",
        "price":1234
    },
    {
        "name":"Lapiz",
        "url":"https://th.bing.com/th/id/OIP.sGJ3G-6Rz3RcYjbnSQoDVwHaE8?pid=ImgDet&rs=1",
        "price":23
    },{
        "name":"Tablet",
        "url":"https://th.bing.com/th/id/OIP.sGJ3G-6Rz3RcYjbnSQoDVwHaE8?pid=ImgDet&rs=1",
        "price":444
    },{
        "name":"Mini Mac",
        "url":"https://th.bing.com/th/id/OIP.sGJ3G-6Rz3RcYjbnSQoDVwHaE8?pid=ImgDet&rs=1",
        "price":436
    },{
        "name":"Mouse Gamer",
        "url":"https://th.bing.com/th/id/OIP.sGJ3G-6Rz3RcYjbnSQoDVwHaE8?pid=ImgDet&rs=1",
        "price":869
    },{
        "name":"PC Gaming",
        "url":"https://th.bing.com/th/id/OIP.sGJ3G-6Rz3RcYjbnSQoDVwHaE8?pid=ImgDet&rs=1",
        "price":3944
    },{
        "name":"iWatch",
        "url":"https://th.bing.com/th/id/OIP.sGJ3G-6Rz3RcYjbnSQoDVwHaE8?pid=ImgDet&rs=1",
        "price":4999
    },{
        "name":"Iphone",
        "url":"https://th.bing.com/th/id/OIP.sGJ3G-6Rz3RcYjbnSQoDVwHaE8?pid=ImgDet&rs=1",
        "price":2345
    },{
        "name":"Funko 1 metro",
        "url":"https://th.bing.com/th/id/OIP.sGJ3G-6Rz3RcYjbnSQoDVwHaE8?pid=ImgDet&rs=1",
        "price":4433
    },{
        "name":"Monitor UHD",
        "url":"https://th.bing.com/th/id/OIP.sGJ3G-6Rz3RcYjbnSQoDVwHaE8?pid=ImgDet&rs=1",
        "price":3777
    }

])`

##  Listar collecciones

`
db.productos.find()
db.mensajes.find()
`

## Mostrar la cantidad de documentos almacenados en cada una de ellas

`db.productos.estimatedDocumentCount()
db.mensajes.estimatedDocumentCount()`

## Realizar CRUD

### Agregar un producto
`db.productos.insert(
    {
        "name":"RTX 3090",
        "url":"https://th.bing.com/th/id/OIP.sGJ3G-6Rz3RcYjbnSQoDVwHaE8?pid=ImgDet&rs=1",
        "price":4978
    })`

### Listar precio menor a 1000
`db.productos.find( { price: { $lt: 1000 } } )`

### Listar precio entre a 1000 y 3000
`db.productos.find({ 
    $and: [ 
        { price: { $gte: 1000 } },
        { price: { $lte: 3000 } }, 
    ]})`

### Listar precio mayor a 3000
`db.productos.find( { price: { $gt: 3000 } } )`

### Obtener nombre del tercer producto
`db.productos.find( {}, {"name": 1}).sort({"price":1}).skip(2).limit(1)`

### Agregar campo stock con valor de 100
`db.productos.update({}, { $set: {stock: 100} },true,true)`

### Cambiar stock a 0 de productos con precio mayor a 4000
`db.productos.update({ price: {$gt: 4000}},{ $set: {stock: 0}},false, true)`

###  Borrar los productos con precio menor a 1000 pesos 
`db.productos.deleteMany({ price: {$lt: 1000}})`

##  Crear un usuario 'pepe' clave: 'asd456' que sólo pueda leer la base de datos ecommerce. Verificar que pepe no pueda cambiar la información.
`db.createUser({ user: 'pepe', pwd: 'asd456', roles: [{role: 'read', db:'ecommerce'}]})`
`mongod --auth`
`mongo 127.0.0.1:27017 -u "pepe" -p "asd456" --authenticationDatabase "ecommerce"`
`db.productos.update({ price: {$gt: 4000}},{ $set: {stock: 0}},false, true)`
