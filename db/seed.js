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
    "description" TEXT NOT NULL,
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
  `INSERT INTO "leveldata"
  (levelname, prompt, description, hint1, hint2, hint3, heroiclevelcode, novicelevelcode, mythiclevelcode)
  VALUES ('level1', 'Do the game.', 'This is the first level!','Did you check the docs?', 'Semicolons?', '(ツ)', 'var game = function(){console.log("cool game")}', 'var game = function(){}', 'var game;')`,
  (err) => {
    if(err) {
      console.error(err);
    } else {
      console.log('inserted into leveldata');
    }
});

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

connection.query(
  `INSERT INTO "users"
  (currlevel, username, displayname, points) VALUES
  (1, 'dummydum', 'Donald Trumpy', 000000)`,
  (err) => {
    if(err) {
      console.error(err);
    } else {
      console.log('inserted into users');
    }
});

connection.query(
  `INSERT INTO "games"
  (userid, title, gamecode) VALUES
  (1, 'my cool panda game', 'var game = new Phaser.Game(800, 600, Phaser.CANVAS, "", { preload: preload, create: create, update: update });

function preload() {
  game.load.image("pandaback", "http://thesmashable.com/wp-content/uploads/2013/12/free-christmas-tree-background-christmas-patterns-christmas-wallpapers.png");
  game.load.image("riceball", "https://www.emojibase.com/resources/img/emojis/hangouts/1f359.png");
  game.load.image("sushi", "https://www.emojibase.com/resources/img/emojis/hangouts/1f363.png");
  game.load.image("ground", "http://publicdomainvectors.org/photos/1400625045.png");

  game.load.spritesheet("panda", "http://createalittle.com/wp-content/uploads/2014/01/panda_colour.png", 250, 354, 12);
}

var background;
var player;
var riceballs;
var riceball;
var sushis;
var sushi;
var ground;
var ledge;
var hitPlatform
var cursors;
var score = 0;
var scoreText;

function create() {
  //start the Arcade Physics system
  game.physics.startSystem(Phaser.Physics.ARCADE);
  //add background to the game
  background = game.add.sprite(0, 0, "pandaback");
  //  The platforms group contains the ground and the 2 ledges we can jump on
  platforms = game.add.group();
  //  We will enable physics for any object that is created in this group
  platforms.enableBody = true;
  // Here we create the ground.
  ledge = platforms.create(450, 100, "ground");
  ledge.scale.setTo(0.6,0.4);
  ledge.body.immovable = true;

  ledge = platforms.create(0, 250, "ground");
  ledge.scale.setTo(0.6,0.4)
  ledge.body.immovable = true;

  ledge = platforms.create(430, 400, "ground");
  ledge.scale.setTo(0.6,0.4);
  ledge.body.immovable = true;

  //add panda to the game
  player = game.add.sprite(300, 500, "panda");
  player.scale.setTo(0.2,0.2);

  //  We need to enable physics on the player
  game.physics.arcade.enable(player);

  //  Player physics properties. Give the little guy a slight bounce.
  player.body.bounce.y = 0.5;
  player.body.gravity.y = 300;
  player.body.collideWorldBounds = true;

  player.animations.add("left", [0,1,2,3,4,5], 15, true);
  player.animations.add("right", [6,7,8,9,10,11], 15, true);

  cursors = game.input.keyboard.createCursorKeys();

  //add riceball
  riceballs = game.add.group();
  riceballs.enableBody = true;

  for(var i = 0; i < 6; i ++){
    riceball = riceballs.create(i * 150, 0, "riceball");
    riceball.scale.setTo(0.3,0.3);
    riceball.body.gravity.y = 300;
    riceball.body.bounce.y = 0.5 + Math.random() * 0.2;
  }

  //add sushi
  sushis = game.add.group();
  sushis.enableBody = true;

  for(var i = 0; i < 6; i ++){
    sushi = sushis.create(i * 250, 100, "sushi");
    sushi.scale.setTo(0.4,0.4);
    sushi.body.gravity.y = 300;
    sushi.body.bounce.y = 0.5 + Math.random() * 0.2;
  }
  //add score
  scoreText = game.add.text(16, 16, "score: 0", { fontSize: "32px", fill: "#000" });
}

function update() {

    //  Collide the player and the stars with the platforms
    hitPlatform = game.physics.arcade.collide(player, platforms);
    hitPlatform = game.physics.arcade.collide(riceballs, platforms);
    hitPlatform = game.physics.arcade.collide(sushis, platforms);

    game.physics.arcade.overlap(player, riceballs, collectRiceball, null, this);
    game.physics.arcade.overlap(player, sushis, collectSushi, null, this);

    player.body.velocity.x = 0;
    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -100;

        player.animations.play("left");
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 100;

        player.animations.play("right");
    }
    else
    {
        //  Stand still
        player.animations.stop();

        player.frame = 4;
    }

    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown)
    {
        player.body.velocity.y = -200;
    }

}

function collectRiceball (player, riceball) {

    // Removes the riceball from the screen
    riceball.kill();
    //add score;
    score += 10;
    scoreText.text = "Score:" + score;

}

function collectSushi (player, sushi) {

    // Removes the sushi from the screen
    sushi.kill();

    //add score;
    score += 10;
    scoreText.text = "Score:" + score;
}')`,
  (err) => {
    if(err) {
      console.error(err);
    } else {
      console.log('inserted into games');
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
connection.query(
  `SELECT title FROM titlepoints, users
    WHERE users.id = 1 AND users.points = titlepoints.points`,
    (err) => {
      if(err) {
        console.error(err);
      } else {
        console.log('Cannot get user title');
      }
});

// Gets name of saved game based on user
connection.query(
  `SELECT title FROM games
    WHERE users.id = 1`,
    (err) => {
      if(err) {
        console.error(err);
      } else {
        console.log('Cannot get user title');
      }
});

// Grab users current level data (all data) AND need all saved game titles
`SELECT * FROM leveldata, users WHERE (users.currlevel = leveldata.id)`

// For not logged in users, only allow them to do level 1
`SELECT * FROM leveldata WHERE leveldata.id = 1`

// Update user points based on level they chose
// Chain queries, get appropriate point value then update user points
`UPDATE users SET points = points + 10 WHERE users.id = 1`

// If user advances to next level
`UPDATE users SET currlevel = currlevel + 1 WHERE users.id = 1`

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




