
exports.up = function(knex) {
    return knex.schema.createTable('pagamento', function (table) {
        table.increments('id').primary();
        table.datetime('createdDate').defaultTo(Date.now());
        table.datetime('modifiedDate').defaultTo(null);
        table.boolean('isDeleted').defaultTo(false);
        table.string('descricao').notNullable();
        table.string('codigo').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('pagamento');
};
