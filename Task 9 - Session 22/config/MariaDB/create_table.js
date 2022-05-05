const { MariaDBOptions } = require("../MariaDBOptions.js")
const knex = require("knex")(MariaDBOptions)

knex.schema.createTable('Products', (table) => {
        table.increments('id');
        table.string('name');
        table.string('url');
        table.integer('price');
    })
    .then(() => console.log('Table created!'))
    .catch((err) => { console.log('Error', err); throw err })
    .finally(() => {
        knex.destroy();
    })