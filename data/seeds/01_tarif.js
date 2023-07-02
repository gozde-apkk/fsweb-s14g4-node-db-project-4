/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */


const defaultTarif = [{tarif_adi:"Spagetti Bolonez"},{tarif_adi:"Mantı"}];


const defaultAdim =[
  {adim_id:1,adim_sirasi:1, adim_talimati:"Büyük bir tencereyi orta ateşe koyun",tarif_id:1},
  {adim_id:2,adim_sirasi:1, adim_talimati:" tencereyi orta ateşe koyun",tarif_id:2},
  {adim_id:3,adim_sirasi:2,adim_talimati:"1 yemek kaşığı zeytinyağı ekleyin",tarif_id:2},
  {adim_id:4,adim_sirasi:2,adim_talimati:"zeytinyağı ekleyin",tarif_id:2},
  {adim_id:5,adim_sirasi:3,adim_talimati:"tuz ekleyin",tarif_id:1},
  {adim_id:6,adim_sirasi:3,adim_talimati:"tuz ekleyin",tarif_id:2}];

  const defaultIcindekiler = [
   { icindekiler_adi:"zeytinyağı"},
   { icindekiler_adi:"tuz"}];


const defaultIcindekilerAdim=[
  {içincekiler_id:1, adim_id:2,miktar:0.5},
  {içincekiler_id:1, adim_id:5,miktar:1},
  {içincekiler_id:1, adim_id:3,miktar:0.5},
  {içincekiler_id:1, adim_id:6,miktar:10},
];


 exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('tarif').truncate()
  await knex('adim').truncate()
  await knex('içindekiler').truncate()
  await knex('içindekiler_adim').truncate()


  await knex("tarif").insert(defaultTarif);
  await knex("adim").insert(defaultAdim);
  await knex("içindekiler").insert(defaultIcindekiler);
  await knex("içindekiler_adim").insert(defaultIcindekilerAdim);
};
