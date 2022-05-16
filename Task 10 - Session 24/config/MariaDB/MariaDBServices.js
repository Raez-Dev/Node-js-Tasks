const { MariaDBOptions } = require("../MariaDBOptions.js")
const knex = require("knex")(MariaDBOptions)

const saveMaria = async(item) => {

    return knex('products').insert(item)
        .then((data) => { return { IsSuccess: true, data: data } })
        .catch((err) => { return { IsSuccess: false, error: err } })
}

const getAllMaria = async() => {

    return knex('products').select("*")
        .then((data) => {

            const lista = data.map(row => {
                return { "id": row['id'], "name": row['name'], "url": row['url'], "price": row['price'] }
            });

            return {
                IsSuccess: true,
                data: lista
            }
        })
        .catch((err) => { return { IsSuccess: false, error: err } })
}

module.exports = {
    saveMaria,
    getAllMaria
}