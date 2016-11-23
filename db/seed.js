const connection = require('./db');
// const gamecode = require('');

// Step 1: Drop old data
// connection.query('DROP TABLE users CASCADE', (err) => {
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
    "description_subone" VARCHAR(5000) NOT NULL,
     "description_descone" VARCHAR(5000) NOT NULL,
     "description_subtwo" VARCHAR(5000) NOT NULL,
     "description_desctwo" VARCHAR(5000) NOT NULL,
     "description_subthree" VARCHAR(5000) NOT NULL,
     "description_descthree" VARCHAR(5000) NOT NULL,
     "tldr" VARCHAR(5000) NOT NULL,
     "shortdesc" VARCHAR(5000) NOT NULL,
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
   "points" INTEGER NOT NULL,
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
    "currlevel" INTEGER DEFAULT 1,
    "maxlevel" INTEGER DEFAULT 1,
    "username" VARCHAR(50) DEFAULT NULL,
    "displayname" VARCHAR(1000) DEFAULT NULL,
    "points" INTEGER NOT NULL DEFAULT 0,
    "picture" TEXT DEFAULT 'http://i.imgur.com/s9BlPRc.jpg',
    "googleemail" VARCHAR(100),
    FOREIGN KEY (currlevel) REFERENCES leveldata(id),
    FOREIGN KEY (maxlevel) REFERENCES leveldata(id)
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
   "title" TEXT NOT NULL,
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

connection.query(
  `CREATE TABLE IF NOT EXISTS "templates" (
    "id" SERIAL PRIMARY KEY,
    "templatecode" TEXT NOT NULL
  )`,
  (err) => {
    if(err) {
      console.log('Error adding template data');
    } else {
      console.log('Data added to templates');
    }
  });

connection.query(
`CREATE TABLE IF NOT EXISTS "difflevelpoints" (
  "id" SERIAL PRIMARY KEY,
  "difflevel" TEXT,
  "points" INTEGER
  )`,
  (err) => {
    if(err) {
      console.log('Error adding difflevelpts');
    } else {
      console.log('Data added to difflevelpts');
    }
  });

connection.query(
 `CREATE TABLE IF NOT EXISTS "pointevents" (
 "id" SERIAL PRIMARY KEY,
 "levelid" INTEGER NOT NULL,
 "difflevel" INTEGER NOT NULL,
 "userid" INTEGER NOT NULL,
 FOREIGN KEY (userid) REFERENCES users(id),
 FOREIGN KEY (levelid) REFERENCES leveldata(id),
 FOREIGN KEY (difflevel) REFERENCES difflevelpoints(id)
 )`,
 (err) => {
   if(err) {
     console.log('Error adding user completed levels', err);
   } else {
     console.log('Table user completed levels created');
   }
});

connection.query(
 `CREATE TABLE IF NOT EXISTS "sharedgames" (
 "id" SERIAL PRIMARY KEY,
 "gameid" INTEGER NOT NULL,
 "userid" INTEGER NOT NULL,
 "hash" TEXT,
 FOREIGN KEY (userid) REFERENCES users(id),
 FOREIGN KEY (gameid) REFERENCES games(id)
 )`,
 (err) => {
   if(err) {
     console.log('Error adding sharedgames', err);
   } else {
     console.log('Table sharedgames completed levels created');
   }
});




