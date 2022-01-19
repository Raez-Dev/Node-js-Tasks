const fs = require('fs');

class Contenedor {

    constructor(path) {
        this.path = path;
    }

    save = async(item) => {

        try {

            let cont = await fs.promises.readFile(`./${this.path}`, 'utf-8');

            if (cont === "") {

                let products = [{...item, "id": 1 }];
                try {
                    await fs.promises.writeFile(`./${this.path}`, JSON.stringify(products));
                    return 1;
                } catch (error1) {
                    return error1;
                }

            } else {

                let products = JSON.parse(cont);
                let ids = products.map((item) => item.id)
                let newId = Math.max(...ids) + 1;
                let newProducts = [...products, {...item, "id": newId }];

                try {
                    await fs.promises.writeFile(`./${this.path}`, JSON.stringify(newProducts));
                    return newId;
                } catch (error2) {
                    return error2;
                }

            }
        } catch (error) {

            let products = [{...item, "id": 1 }];

            try {
                await fs.promises.appendFile(`./${this.path}`, JSON.stringify(products));
                return 1;
            } catch (error) {
                console.log(error);
            }
        }
    }

    getById = async(idToFind) => {
        try {
            let cont = await fs.promises.readFile(`./${this.path}`, 'utf-8');

            if (cont === "") {
                return "Empty list";
            } else {

                let products = JSON.parse(cont);
                let product = products.find((item) => item.id === idToFind)
                return product;

            }
        } catch (error) {
            throw new "We can't open this file";
        }
    }

    getAll = async() => {
        try {
            let cont = await fs.promises.readFile(`./${this.path}`, 'utf-8');

            if (cont === "") {
                return "Empty list";
            } else {

                let products = JSON.parse(cont);
                return products;

            }
        } catch (error) {
            throw new "We can't open this file";
        }
    }

    deleteById = async(idToDelete) => {
        try {
            let cont = await fs.promises.readFile(`./${this.path}`, 'utf-8');

            if (cont === "") {
                return "Empty list";
            } else {
                let products = JSON.parse(cont);
                let newProducts = products.filter((item) => item.id !== idToDelete)
                await fs.promises.writeFile(`./${this.path}`, JSON.stringify(newProducts));
            }
        } catch (error) {
            throw new "We can't open this file";
        }
    }

    deleteAll = async() => {
        try {
            let cont = await fs.promises.readFile(`./${this.path}`, 'utf-8');

            if (cont === "") {
                return "Empty list";
            } else {
                await fs.promises.writeFile(`./${this.path}`, "");
            }
        } catch (error) {
            throw new "We can't open this file";
        }
    }
}

module.exports = Contenedor;