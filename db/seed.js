const connection = require('./db');
// const gamecode = require('');

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
    "currlevel" INTEGER NOT NULL,
    "username" VARCHAR(50) DEFAULT NULL,
    "displayname" VARCHAR(1000) DEFAULT NULL,
    "points" INTEGER NOT NULL,
    "picture" TEXT,
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

// Create dummy data to work with



connection.query(
  `INSERT INTO "titlepoints"
  (points, title)
  VALUES (0, 'noob'),
  (10, 'genin'),
  (20, 'chuunin'),
  (30, 'jounin'),
  (40, 'special jounin'),
  (50, 'kage'),
  (60, 'ANBU'),
  (70, 'Hokage')`,
  (err) => {
    if(err) {
      console.error(err);
    } else {
      console.log('inserted into titlepoints');
    }
});



connection.query(`INSERT INTO difflevelpoints
  (difflevel, points) VALUES
  ('novice', 10),
  ('mythic', 20),
  ('heroic', 30)`,
  (err) => {
    if(err) {
      console.error(err);
    } else {
      console.log('Data added to difflevelpts');
    }
});

// Gets user status title based upon points they currently have
// Title will not change every time points change so need to set up logic
// for when points hit a certain threshold, update user status title
// connection.query(
//   `SELECT title FROM titlepoints, users
//     WHERE users.id = 1 AND users.points = titlepoints.points`,
//     (err) => {
//       if(err) {
//         console.error(err);
//       } else {
//         console.log('Cannot get user title');
//       }
// });

// // Gets name of saved game based on user
// connection.query(
//   `SELECT title FROM games
//     WHERE users.id = 1`,
//     (err) => {
//       if(err) {
//         console.error(err);
//       } else {
//         console.log('Cannot get user title');
//       }
// });

// // Grab users current level data (all data) AND need all saved game titles
// `SELECT * FROM leveldata, users WHERE (users.currlevel = leveldata.id)`

// // For not logged in users, only allow them to do level 1
// `SELECT * FROM leveldata WHERE leveldata.id = 1`

// // Update user points based on level they chose
// // Chain queries, get appropriate point value then update user points
// `UPDATE users SET points = points + 10 WHERE users.id = 1`

// // If user advances to next level
// `UPDATE users SET currlevel = currlevel + 1 WHERE users.id = 1`

//CLIENT/SERVER INTERACTIONS

// On page load and upon login
  // Server handles
  // Get username from github login session id, pull data and send back to client
// If user is not logged in, we don't send back user data, then on click tutorial only get level 1 data
  // If try to advance to level 2, need logic on server side to prevent access
    // For all requests, except level 1, need logged in auth to succeed to get to next fn that returns level 2, etc data
// If user is logged in, request level data and returns last left off level
  // GET REQ endpoint to send back level data
  // POST REQ Client sends server which level they completed it on and endpoint will be 'completedlevel' endpoint,
    // will still check to see if user is logged in, then checks title, points, increase curr level, etc
    // send back new points, new level, new title
  // GET REQ to 'nextlevel' endpoint, then send back new level data for that specific user

//server can send back a new title flag (true or false on res object) that lets client know when to pop up new title alert
  // If they flag is true the client knows it needs to alert the user that they have a new title

// GET REQ to 'getsavedgame' will return all game data based on title clicked


// USER PROF PAGE:
  // endpoint 'getuserdata' bring back all users specific data: level, title points, saved game titles,
  // as soon as we click on learn page
  // GET REQ 'getleveldata' check to see if logged in , if not send back all level 1 data
  // if logged in, send back user specific data (last level they were on)




