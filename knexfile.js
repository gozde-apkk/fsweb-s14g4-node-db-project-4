// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/tarif.db3'
    },
    migrations:{
      directory:""
    },
    seeds:{
      directory:"./data/seeds"
    },
    pool:{
      afterCreate:(conn, done) =>{
        conn.run("PRAGMA foreing_keys = ON",done);
      }
    }
  },

  

};
