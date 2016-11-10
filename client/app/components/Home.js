import React from 'react'

const Home = () => (
  <div className="container">
  <div className="row homepage">
  	<a href='/#/learn'> <div className="col-md-4">
  		<div id="arcade"></div>
  		<h1 className="text-center">Learn</h1>
	  	<p className="text-center"> Level up your Phaser skills by completing coding challenges.  
	  	Available in Novice, Heroic, and Mythic difficulties, which path will you choose? </p>
	  	</div> </a>
  	<div className="col-md-4">
	  	<h1 className="text-center">Explore</h1>
	  	<p className="text-center"> If you need a greater challenge, use our Phaser sandbox to build your own games from scratch, or with a little guidance from provided templates.</p> 
  	</div>
  	<div className="col-md-4">
  		<div id="trophy"></div>
	  	<h1 className="text-center">Brag</h1>
	  	<p className="text-center"> Visit your player profile page to revisit and share your saved Phaser games.
	  	You didn't embark on this quest to keep the spoils for yourself did you?  Share with your friends and bask in their adoration.</p>
  	</div>
  </div>
  </div>
)

export default Home