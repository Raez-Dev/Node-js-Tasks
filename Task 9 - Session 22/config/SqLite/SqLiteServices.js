const { SqLiteOptions } = require("../SqLiteOptions.js")
const knex = require("knex")(SqLiteOptions)

const saveSqLite = async(item) => {

    return knex('Mensajes').insert(item)
        .then((data) => { return { IsSuccess: true, data: data } })
        .catch((err) => { return { IsSuccess: false, error: err } })
}

const getAllSqLite = async() => {

    return knex('Mensajes').select("*")
        .then((data) => {

            const lista = data.map(row => {
                return { "id": row['id'], "message": row['message'], "date": row['date'], "mail": row['mail'] }
            });

            return {
                IsSuccess: true,
                data: lista
            }
        })
        .catch((err) => { return { IsSuccess: false, error: err } })
}

module.exports = {
    saveSqLite,
    getAllSqLite
}