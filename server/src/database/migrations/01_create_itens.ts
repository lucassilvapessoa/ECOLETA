import Knex from 'knex'

export async function up(knex:Knex){
    return knex.schema.createTable('items',table=>{
        table.increments('id').primary()
        table.string('image').notNullable()
        table.string('title').notNullable()
    })
    //CRIAR A TABELA //
}
export async function down(knex:Knex){
    //VOLTAR A TRAS DELETAR A TABLEA //
   return knex.schema.dropTable('items')
}

