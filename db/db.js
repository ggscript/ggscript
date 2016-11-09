const pg = require('pg');

pg.defaults.ssl = true;
const DB_URL = "postgres://lirsvicqxfqdtb:O38lgMS3lrjsyqzco0tcZdVQJ4@ec2-54-235-179-112.compute-1.amazonaws.com:5432/d19g5rrkgl7if8";
// Instantiate new pg client (client will read connection from pg cli tools)
const client = new pg.Client(DB_URL);
client.connect();

module.exports = client;
