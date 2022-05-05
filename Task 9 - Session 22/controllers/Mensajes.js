const fs = require('fs');
const util = require('util');
const normalizr = require('normalizr');
const normalize = normalizr.normalize;
const denormalize = normalizr.denormalize;
const schema = normalizr.schema;

//const { saveSqLite, getAllSqLite } = require('../config/SqLite/SqLiteServices.js');

// Definimos un esquema de usuarios (autores y comentadores)
const authorSchema = new schema.Entity('author', {}, { idAttribute: "mail" })

const messageSchema = new schema.Entity('message', {
    author: authorSchema
});

const messagesSchema = new schema.Entity('messages', {
    messages: [messageSchema]
})

class Mensajes {

    constructor(path) {
        this.path = path;
    }

    print = (obj) => {
        console.log(util.inspect(obj, false, 12, true));
    }

    save = async(item) => {

        //console.log(item)
        // return await saveSqLite(item);
        try {

            let cont = await fs.promises.readFile(`./${this.path}`, 'utf-8');

            if (cont === "") {

                let products = { id: 1, messages: [{...item }] };
                const normalizeData = normalize(products, messagesSchema);
                try {
                    await fs.promises.writeFile(`./${this.path}`, JSON.stringify(normalizeData));
                    return 1;
                } catch (error1) {
                    return error1;
                }

            } else {

                let products = JSON.parse(cont);
                const denormalizeData = denormalize(products.result, messagesSchema, products.entities);
                let newProducts = {...denormalizeData, messages: [...denormalizeData.messages, item] }
                const normalizeData = normalize(newProducts, messagesSchema);

                try {
                    await fs.promises.writeFile(`./${this.path}`, JSON.stringify(normalizeData));
                    return newId;
                } catch (error2) {
                    return error2;
                }

            }
        } catch (error) {

            console.error("error", error);

        }
    };

    getAll = async() => {
        try {

            let cont = await fs.promises.readFile(`./${this.path}`, 'utf-8');

            if (cont === "") {
                return false;
            } else {

                //console.log(JSON.parse(cont));
                let products = JSON.parse(cont);
                const denormalizeData = denormalize(products.result, messagesSchema, products.entities);
                return denormalizeData;

            }
        } catch (error) {
            console.error(error);
        }
        //return await getAllSqLite()
    };

}

module.exports = Mensajes;