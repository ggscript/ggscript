import React from 'react'

class Resources extends React.Component {

  render() {
    return (
      <div className="container">
        <h1 id="makeVideo"> Phaser Resources </h1>
      	<div className="row">
                  <div className="col-md-10">
                  <br></br>
                  <span id="functions"><h2 id="makeVideo"> Understanding Phaser's Four Core Functions: Preload, Create, Update and Render </h2></span>
                  <h3>Overview of Preload, Create, Update and Render</h3>
                  <p>Phaser has a number of special ‘reserved’ functions that are executed at specific points in the game, and each contain specific pieces of code to perform distinct operations. Preload loads content before creating, updating and rendering your game.</p>
                  <h3>Preload aka Loading Game Assets</h3>
                  <p>Preload is a way for Phaser to front-load all assets to reduce the wait time on the user. The preload function is always called first. This function is where all of your assets (players, enemies, weapons, background images and spritesheets) are pre-loaded for use. Preload will run automatically.</p>
      		<h3>Creating your Canvas</h3>
                  <p>Canvas creation occurs with every new instantiation of a Phaser game. After preload finishes running, Create is called. Create is where you get to build your game world. Next is update. Update is the heart of your game. This function allows your player to move based on your input, detect collisions and update game state. Lastly, render is only invoked to handle debugging. These essential functions will be described in more depth later on in this tutorial.</p>
                  <br></br>
                  <span id="create"><h2 id="makeVideo"> Using Phaser's Create Function </h2></span>
                  <h3>What is Phaser.Create?</h3>
                  <p>The create function is called automatically once the code inside of your preload function has stopped executing.  Because of this, you can write code in here that has access to all of the assets and other things you loaded in your preload function.  Just like the name suggests, this is the part of your code where you create sprites, groups and many other things that your Phaser game will act on. </p>
                  <h3>How to Create a Sprite</h3>
                  <p>The very first thing we are going to create is a sprite - a sprite is a texture that is mapped to a set of coordinates.  You can basically think of it as an image that exists at a basic place, that you specify.  Sprites also come with a bunch of handy properties - but for the time being you don’t need to worry about that, just know they’ll make your life a lot easier when you start building games from scratch.
Remember, when you loaded your assets in preload, the first parameter you gave them acts as an asset key, which you will need to refer to when creating things in the create function.
The actual code to create sprites is super simple - it goes game.add.sprite (x coord, y coord, asset key) - this will place the preloaded image at the specified destination.
One important note: the order that items are rendered depends on the order you create them - so if you have things, such as a background, that always need to be in the back or the front, make sure to take that in consideration when creating your create function.</p>
                  <h3>What are Groups?</h3>
                  <p>A group acts as a container for display objects, which includes things like sprites and images.  Any transformations applied to a group will be applied to all of the objects that are defined as a part of this group.  For example, if you scale up a group, all of the group’s children objects will be scaled up as well.  Groups also make it easier for you to recycle objects with identical properties such as platforms or enemy sprites.  game.add.group() creates the group that we assign to a local variable - so platforms =game.add.group() creates a group that we can refer to as platforms.</p>
            <br></br>
            <span id="update"><h2 id="makeVideo"> Mastering Phaser's Update Function </h2></span>
            <h3>The Update Function</h3>
            <p>The update function is the core game loop.   It is run every frame of the game.  It usually runs around 60 times per second, with variations due to different computer processors  The update function is responsible for calling both the update logic function (which in turn updates the logic subsystems such as the physics, camera, and sound subsystems) and the updateRender function.</p>
            <h3>But What Does It Really Do?</h3>
            <p>It’s inside of the update function where you can write code that allows sprites to move, interact with other sprites, and add any other logic that depends on the current state of other sprites.  Need to detect a collision?  Do it here.  Need to shoot a bullet?  That goes here as well.</p>
            <h3>Yes, the Update Loop is as Cool as it Sounds.</h3>
            <p>Some cool things that you’ll be introduced to over the course of this tutorial that will be in the update loop: moving, jumping, colliding, shooting, scoring, bouncing, swimming, flying, powerups, and a lot more.</p>
            <br></br>
            </div>
            <div className="col-md-2">
                  <h3 id="makeVideo"> Topics </h3>
                  <a href="#functions"><p>Understanding Phaser's Four Core Functions: Preload, Create, Update and Render</p></a>
                  <a href="#create"><p>Using Phaser's Create Function</p></a>
                  <a href="#update"><p>Mastering Phaser's Update Function</p></a>
            </div>
      	</div>
      </div>
      )
  }
}

export default Resources
