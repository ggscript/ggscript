userData = {
  user_id: '1',
  username: 'dummydum',
  display_name: 'Donald Trump',
  points: '-50',
  title: 'loser',
  level: '4'
};

var novice = `var game = new Phaser.Game(800, 600, Phaser.CANVAS, '', { preload: preload, create: create, update: update });

function preload() {
  game.load.image('pandaback', 'http://thesmashable.com/wp-content/uploads/2013/12/free-christmas-tree-background-christmas-patterns-christmas-wallpapers.png');
  game.load.image('riceball', 'https://www.emojibase.com/resources/img/emojis/hangouts/1f359.png');
  game.load.image('sushi', 'https://www.emojibase.com/resources/img/emojis/hangouts/1f363.png');
  game.load.image('ground', 'http://publicdomainvectors.org/photos/1400625045.png');

  game.load.spritesheet('panda', 'http://createalittle.com/wp-content/uploads/2014/01/panda_colour.png', 250, 354, 12);
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
  background = game.add.sprite(0, 0, 'pandaback');
  //  The platforms group contains the ground and the 2 ledges we can jump on
  platforms = game.add.group();
  //  We will enable physics for any object that is created in this group
  platforms.enableBody = true;
  // Here we create the ground.
  ledge = platforms.create(450, 100, 'ground');
  ledge.scale.setTo(0.6,0.4);
  ledge.body.immovable = true;

  ledge = platforms.create(0, 250, 'ground');
  ledge.scale.setTo(0.6,0.4)
  ledge.body.immovable = true;
  
  ledge = platforms.create(430, 400, 'ground');
  ledge.scale.setTo(0.6,0.4);
  ledge.body.immovable = true;
  
  //add panda to the game 
  player = game.add.sprite(300, 500, 'panda');
  player.scale.setTo(0.2,0.2);
  
  //  We need to enable physics on the player
  game.physics.arcade.enable(player);

  //  Player physics properties. Give the little guy a slight bounce.
  player.body.bounce.y = 0.5;
  player.body.gravity.y = 300;
  player.body.collideWorldBounds = true;
  
  player.animations.add('left', [0,1,2,3,4,5], 15, true);
  player.animations.add('right', [6,7,8,9,10,11], 15, true);
  
  cursors = game.input.keyboard.createCursorKeys();  
 
  //add riceball
  riceballs = game.add.group();
  riceballs.enableBody = true;
  
  for(var i = 0; i < 6; i ++){
    riceball = riceballs.create(i * 150, 0, 'riceball');
    riceball.scale.setTo(0.3,0.3);
    riceball.body.gravity.y = 300;
    riceball.body.bounce.y = 0.5 + Math.random() * 0.2;
  }
    
  //add sushi 
  sushis = game.add.group();
  sushis.enableBody = true;
  
  for(var i = 0; i < 6; i ++){
    sushi = sushis.create(i * 250, 100, 'sushi');
    sushi.scale.setTo(0.4,0.4);
    sushi.body.gravity.y = 300;
    sushi.body.bounce.y = 0.5 + Math.random() * 0.2;
  }
  //add score
  scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
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

        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 100;

        player.animations.play('right');
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
    scoreText.text = 'Score:' + score;

}

function collectSushi (player, sushi) {
    
    // Removes the sushi from the screen
    sushi.kill();
  
    //add score;
    score += 10;
    scoreText.text = 'Score:' + score;
}
 `;

var heroic = `var game = new Phaser.Game(800, 600, Phaser.CANVAS, '', { preload: preload, create: create, update: update });

function preload() {
  game.load.image('pandaback', 'http://thesmashable.com/wp-content/uploads/2013/12/free-christmas-tree-background-christmas-patterns-christmas-wallpapers.png');
  game.load.image('riceball', 'https://www.emojibase.com/resources/img/emojis/hangouts/1f359.png');
  game.load.image('sushi', 'https://www.emojibase.com/resources/img/emojis/hangouts/1f363.png');
  game.load.image('ground', 'http://publicdomainvectors.org/photos/1400625045.png');

  game.load.spritesheet('panda', 'http://createalittle.com/wp-content/uploads/2014/01/panda_colour.png', 250, 354, 12);
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
  background = game.add.sprite(0, 0, 'pandaback');
  //  The platforms group contains the ground and the 2 ledges we can jump on
  platforms = game.add.group();
  //  We will enable physics for any object that is created in this group
  platforms.enableBody = true;
  // Here we create the ground.
  ledge = platforms.create(450, 100, 'ground');
  ledge.scale.setTo(0.6,0.4);
  ledge.body.immovable = true;

  ledge = platforms.create(0, 250, 'ground');
  ledge.scale.setTo(0.6,0.4)
  ledge.body.immovable = true;
  
  ledge = platforms.create(430, 400, 'ground');
  ledge.scale.setTo(0.6,0.4);
  ledge.body.immovable = true;
  
  
  //  We need to enable physics on the player
  game.physics.arcade.enable(player);

  //  Player physics properties. Give the little guy a slight bounce.
  player.body.bounce.y = 0.5;
  player.body.gravity.y = 300;
  player.body.collideWorldBounds = true;
  
  player.animations.add('left', [0,1,2,3,4,5], 15, true);
  player.animations.add('right', [6,7,8,9,10,11], 15, true);
  
  cursors = game.input.keyboard.createCursorKeys();  
 
  //add riceball
  riceballs = game.add.group();
  riceballs.enableBody = true;
  
  for(var i = 0; i < 6; i ++){
    riceball = riceballs.create(i * 150, 0, 'riceball');
    riceball.scale.setTo(0.3,0.3);
    riceball.body.gravity.y = 300;
    riceball.body.bounce.y = 0.5 + Math.random() * 0.2;
  }
    
  //add sushi 
  sushis = game.add.group();
  sushis.enableBody = true;
  
  for(var i = 0; i < 6; i ++){
    sushi = sushis.create(i * 250, 100, 'sushi');
    sushi.scale.setTo(0.4,0.4);
    sushi.body.gravity.y = 300;
    sushi.body.bounce.y = 0.5 + Math.random() * 0.2;
  }
  //add score
  scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
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

        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 100;

        player.animations.play('right');
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
    scoreText.text = 'Score:' + score;

}

function collectSushi (player, sushi) {
    
    // Removes the sushi from the screen
    sushi.kill();
  
    //add score;
    score += 10;
    scoreText.text = 'Score:' + score;
}
 `

var mythic = `var game = new Phaser.Game(800, 600, Phaser.CANVAS, '', { preload: preload, create: create, update: update });

function preload() {
  // good luck ;)
}

function create() {
  //lol
}

function update() {
  
  //who are you kidding
    
}

function collectRiceball (player, riceball) {
    
    //hint

}

function collectSushi (player, sushi) {
    
    //do code here
}
 `





levelData = {
  level: '4',
  level_name: 'Mordor',
  prompt: 'Do the game',
  description: 'Read the docs',
  hint_1: 'semicolons?',
  hint_2: 'did you check the docs?',
  hint_3: '¯\_(ツ)_/¯',
  heroic_level_code: heroic,
  mythic_level_code: mythic,
  novice_level_code: novice
}

module.exports = {
  levelData: levelData,
  userData: userData
}
