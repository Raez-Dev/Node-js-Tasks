const socket = io("ws://localhost:3000");
const tableBody = document.getElementById('tableBody');
const listaMensajes = document.getElementById('listaMensajes');


const onSubmit = () => {
    const name = document.getElementById("name");
    const price = document.getElementById("price");
    const url = document.getElementById("url");
    const products = {
        name: name.value,
        price: price.value,
        url: url.value,
    };

    socket.emit('nuevoProducto', products);
}

const onSubmitMessage = () => {
    const mail = document.getElementById("mail");
    const name = document.getElementById("namem");
    const lastname = document.getElementById("lastname");
    const age = document.getElementById("age");
    const alias = document.getElementById("alias");
    const message = document.getElementById("message");

    const oMessage = {
        id: new Date().getTime(),
        author: {
            id: mail.value,
            mail: mail.value,
            name: name.value,
            lastname: lastname.value,
            age: age.value,
            alias: alias.value
        },
        text: message.value,
        date: new Date(Date.now()).toLocaleString()

    };
    socket.emit('enviarMensaje', oMessage);
}

socket.on('propagacionProductos', (listaProducto) => {

    if (listaProducto?.length > 0) {
        const productos = listaProducto.map((item, index) => {
            return `<tr>
                <th>${item.name}</th>
                <td>${item.price}</td>
                <td>
                    <img style="height: 30px;" src=${item.url}>
                </td>
            </tr>`;
        }).join("");
        tableBody.innerHTML = productos;
    }
});


socket.on('recibirMensaje', (data) => {
    
    if (data.messages?.length > 0) {
        const contenedorMensaje = data.messages.map((item, index) => {
            console.log(item);
            return `<tr>
            <div class="d-flex">
            <p class="text-primary fw-bold">${item.author.mail}</p>
            <p class="text-danger"> [${item.date}]: </p>
            <p class="text-success">${item.text}</p>
        </div>`;
        }).join("");
        listaMensajes.innerHTML = contenedorMensaje;
    }
});