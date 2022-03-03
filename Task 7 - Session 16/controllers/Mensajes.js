//const fs = require('fs');

const { saveSqLite, getAllSqLite } = require('../config/SqLite/SqLiteServices.js');

class Mensajes {

    // constructor(path) {
    //     this.path = path;
    // }

    save = async(item) => {

        console.log(item)
        return await saveSqLite(item);
        // try {

        //     let cont = await fs.promises.readFile(`./${this.path}`, 'utf-8');

        //     if (cont === "") {

        //         let products = [{...item, "id": 1 }];
        //         try {
        //             await fs.promises.writeFile(`./${this.path}`, JSON.stringify(products));
        //             return 1;
        //         } catch (error1) {
        //             return error1;
        //         }

        //     } else {

        //         let products = JSON.parse(cont);
        //         let ids = products.map((item) => item.id)
        //         let newId = Math.max(...ids) + 1;
        //         let newProducts = [...products, {...item, "id": newId }];

        //         try {
        //             await fs.promises.writeFile(`./${this.path}`, JSON.stringify(newProducts));
        //             return newId;
        //         } catch (error2) {
        //             return error2;
        //         }

        //     }
        // } catch (error) {

        //     let products = [{...item, "id": 1 }];

        //     try {
        //         await fs.promises.appendFile(`./${this.path}`, JSON.stringify(products));
        //         return 1;
        //     } catch (error) {
        //         console.log(error);
        //     }
        // }
    };

    getAll = async() => {
        // try {
        //     let cont = await fs.promises.readFile(`./${this.path}`, 'utf-8');

        //     if (cont === "") {
        //         return false;
        //     } else {

        //         let products = JSON.parse(cont);
        //         return products;

        //     }
        // } catch (error) {
        //     throw new "We can't open this file";
        // }

        return await getAllSqLite()
    };

}

module.exports = Mensajes;