const connection = require('./db');

// Step 1: Drop old data
// connection.query('DROP TABLE users', (err) => {
//   if (err) {
//     console.error('users has already been dropped', err);
//   } else {
//     console.log('users dropped');
//   }
// });

// connection.query('DROP TABLE leveldata', (err) => {
//   if (err) {
//     console.error('leveldata has already been dropped');
//   } else {
//     console.log('leveldata dropped');
//   }
// });

connection.query(
  `CREATE TABLE IF NOT EXISTS "leveldata" (
    "id" SERIAL PRIMARY KEY,
    "levelname" VARCHAR(300) DEFAULT NULL,
    "prompt" VARCHAR(300) DEFAULT NULL,
    "hint1" VARCHAR(300) DEFAULT NULL,
    "hint2" VARCHAR(300) DEFAULT NULL,
    "hint3" VARCHAR(300) DEFAULT NULL,
    "heroiclevelcode" TEXT NOT NULL,
    "novicelevelcode" TEXT NOT NULL,
    "mythiclevelcode" TEXT NOT NULL
  )`,
  (err) => {
    if (err) {
      console.error('Error adding leveldata');
    } else {
      console.log('Data added to leveldata');
    }
  });

connection.query(
  `CREATE TABLE IF NOT EXISTS "titlepoints" (
   "id" SERIAL PRIMARY KEY,
   "points" VARCHAR(255) NOT NULL,
   "title" VARCHAR(255) NOT NULL
)`,
(err) => {
    if(err){
      console.error('Error adding titlepoints data');
    } else {
      console.log('Data added to titlepoints');
    }
  });

connection.query(
  `CREATE TABLE IF NOT EXISTS "users" (
    "id" SERIAL PRIMARY KEY,
    "currlevel" INTEGER NOT NULL,
    "username" VARCHAR(50) DEFAULT NULL,
    "displayname" VARCHAR(1000) DEFAULT NULL,
    "points" INTEGER NOT NULL,
    "statustitle" INTEGER NOT NULL,
    FOREIGN KEY (statustitle) REFERENCES titlepoints(id),
    FOREIGN KEY (currlevel) REFERENCES leveldata(id)
  )`,
  (err) => {
    if (err) {
      console.error('Error adding user data');
    } else {
      console.log('Data added to users');
    }
  });

connection.query(
  `CREATE TABLE IF NOT EXISTS "games" (
   "id" SERIAL PRIMARY KEY,
   "userid" INTEGER NOT NULL,
   "gamecode" TEXT NOT NULL,
   FOREIGN KEY (userid) REFERENCES users(id)
)`,
  (err) => {
    if(err){
      console.error('Error adding games data');
    } else {
      console.log('Data added to games');
    }
  });

// Create dummy data to work with




