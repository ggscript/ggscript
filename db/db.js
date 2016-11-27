const pg = require('pg');
var DB_URL;
// if (process.env.NODE_ENV !== 'production') {
  DB_URL = require('../config/database.credentials');
// }
console.log(DB_URL)

// Instantiate new pg client (client will read connection from pg cli tools)
pg.defaults.ssl = true;
const client = new pg.Client(process.env.DATABASE_URL || DB_URL);
client.connect();

module.exports = client;
