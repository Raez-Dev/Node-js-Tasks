let listaProductos = [];

const { saveMaria, getAllMaria } = require('../config/MariaDB/MariaDBServices.js');

class Productos {

    save = async(item) => {
        return await saveMaria(item);
    }

    update = async(updProducto) => {

        if (listaProductos.length === 0) {

            return { IsSuccess: false, msg: "Empty list" };

        } else {

            const producto = listaProductos.find((item) => item.id === updProducto.id);
            if (producto) {

                listaProductos = [...listaProductos.filter((item) => item.id !== producto.id)];
                listaProductos.push(updProducto);
                return { IsSuccess: true, msg: 'Updated item' };

            } else {
                return { IsSuccess: false, msg: "Not found" };
            }

        }
    }

    getById = async(id) => {

        if (listaProductos.length !== 0) {

            const producto = listaProductos.find((item) => item.id === id);
            if (producto) {
                return { IsSuccess: true, data: producto };
            } else {
                return { IsSuccess: false, msg: "Not found" };
            }

        } else {
            return { IsSuccess: false, msg: "Empty list" };
        }
    }

    getAll = async() => {

        return await getAllMaria();
        // if (listaProductos.length !== 0) {

        //     return { IsSuccess: true, data: listaProductos };

        // } else {

        //     return { IsSuccess: false, msg: "Empty list" };

        // }
    }

    deleteById = async(idToDelete) => {

        if (listaProductos.length !== 0) {

            const producto = listaProductos.find((item) => item.id === idToDelete);
            if (producto) {
                listaProductos = [...listaProductos.filter((item) => item.id !== idToDelete)];
                return { IsSuccess: true, msg: 'Deleted item' };
            } else {
                return { IsSuccess: false, msg: "Not found" };
            }

        } else {

            return { IsSuccess: false, msg: "Empty list" };

        }
    }

}

module.exports = Productos;