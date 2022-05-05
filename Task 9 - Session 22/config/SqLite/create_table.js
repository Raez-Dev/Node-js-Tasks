const { SqLiteOptions } = require("../SqLiteOptions");
const knex = require('knex')(SqLiteOptions);

knex.schema.createTable('Mensajes', (table) => {
        table.increments('id');
        table.string('message');
        table.string('date');
        table.string('mail');
    })
    .then(() => console.log('Table created!'))
    .catch((err) => { console.log('Error', err); throw err })
    .finally(() => {
        knex.destroy();
    })