
exports.up = function(knex) {
    return knex.schema.alterTable('usuario', function(table) {
        table.string('password').nullable();
     });
};

exports.down = function(knex) {
    return knex.schema.alterTable('usuario', function(table) {
        table.dropColumn('password');
     });
};
