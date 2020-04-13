exports.up = function (knex) {
    return knex.schema.createTable('usuario', function (table) {
        table.increments('id').primary();
        table.datetime('createdDate').defaultTo(Date.now());
        table.datetime('modifiedDate').defaultTo(null);
        table.boolean('isDeleted').defaultTo(false);
        table.string('nome').notNullable();
        table.string('telefone', 16).notNullable();
        table.string('endereco').notNullable();
        table.integer('numero').notNullable();
        table.string('bairro').notNullable();
        table.string('cidade').notNullable();
        table.string('uf', 2).notNullable();
        table.string('email').notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('usuario');
};
