const templates = () => {
  return
  {
    id: 1,
    templatecode: `var game = new Phaser.Game(600, 450, Phaser.CANVAS, 'gamebox', { preload: preload, create: create, update: update });

// Preload all images you will need here
function preload() {
  game.load.image('space', 'http://universe-beauty.com/albums/userpics/2011y/05/23/1/10/amazing-space-photo-img125-JPG.jpg');

}

var background;
var player;
var cursors;
var score = 0;
var scoreText;
var titleText;

function create() {
  // Start the Arcade Physics system
  game.physics.startSystem(Phaser.Physics.ARCADE);
  // Adds space background to the game
  background = game.add.sprite(0, 0, 'space');

  // Add a player to game
  player = game.add.sprite(300, 500, 'playerAssetKeyHere');
  player.scale.setTo(0.2,0.2);

  // Need to enable physics on the player so it can move
  game.physics.arcade.enable(player);

  // Player physics properties
  player.body.bounce.y = 0.8;
  player.body.gravity.y = 300;
  player.body.collideWorldBounds = true;

  player.animations.add('left', [0,1,2,3,4,5], 15, true);
  player.animations.add('right', [6,7,8,9,10,11], 15, true);

  cursors = game.input.keyboard.createCursorKeys();

  // Add score counter above
  scoreText = game.add.text(10, 20, 'Score: 0', { fontSize: '18px', fill: '#fff' });
  // Title of your game
  titleText = game.add.text(180, 10, 'Space Game Template', { fontSize: '24px', fill: 'red' });
}

function update() {
    player.body.velocity.x = 0;
    if (cursors.left.isDown) {
        //  Move to the left
        player.body.velocity.x = -100;
    } else if (cursors.right.isDown) {
        //  Move to the right
        player.body.velocity.x = 100;
    } else {
        //  Stand still
        player.animations.stop();
        player.frame = 4;
    }

    //  Allow the player to jump if they are touching the ground
    if (cursors.up.isDown){
       player.body.velocity.y = -200;
    }
}`
}

export default templates
