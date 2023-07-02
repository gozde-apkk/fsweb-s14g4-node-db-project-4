/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 * 
 * 
 */


 exports.up = function(knex) {
    return knex.schema.createTable("tarif",t=>{
        t.increments("tarif_id")
        t.string("tarif_adi").notNullable();
        t.timestamp("kayit_tarifi").defaultTo(knex.fn.now());
    })
     .createTable("adim",t =>{
        t.increments("adim_id")
        t.integer("adim_sirasi").notNullable()
        t.string("adim_talimati").notNullable()
        t.integer("tarif_id").references("tarif_id").inTable("tarif_if")
           .onDelete("CASCADE") // RESTRİCT
     })
    .createTable("içindekiler",t=>{
        t.increments("içindekiler_id")
        t.string("içindekiler_adim").notNullable()
        
    })
    .createTable("içindekiler_adim" ,t=>{
        t.increments("içindekiler_adim_id")
        t.decimal("miktar").notNullable();
        t.integer("içindekiler_id").references("içindekiler_id").inTable("içindekiler")
        t.integer("adim_id").references("adim_id").inTable("adim")
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("içindekiler_adim")
    .dropTableIfExists("içindekiler")   
    .dropTableIfExists("adim")
    .dropTableIfExists("tarif")
};
