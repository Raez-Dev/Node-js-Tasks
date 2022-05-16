const SqLiteOptions = {
    client: 'sqlite3',
    connection: {
        filename: `${__dirname}/db/ecommerce.sqlite`
    },
    useNullAsDefault: true
};

module.exports = {
    SqLiteOptions
}