exports.up = function(knex) {
    return knex.schema
    .createTable('cars', table => {
        table.increments('id').notNullable()
        table.string('vin').notNullable().unique()
        table.string('make').notNullable()
        table.string('model').notNullable()
        table.real('mileage').notNullable()
        table.string('title')
        table.string('transmission')
    })
}

exports.down = function(knex){
    return knex.schema.dropTableIfExists('cars')
}