import React from 'react'

class Home extends React.Component{
  constructor(props) {
    super(props)
    this.state={
      ggscriptheadlines: [' learn', ' explore', ' brag'],
      currentHeadline: 0
    }
  }
  //for scrolling through the ggscriptheadlines
  tick() {
    this.setState({
      currentHeadline: (this.state.currentHeadline + 1)%3
    })

  }

  componentDidMount() {
    this.timer = setInterval(this.tick.bind(this), 2800);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render() {
    return (
      <div>
      <div className="row ggscript">
        <p className="title">./ggscript<span className="blinker">_</span></p>
        <div className="col-md-6 pressenter">
        press START to
        </div>
        {this.state.currentHeadline === 0 ? <div className="col-md-5" id="ggscriptheadlines">{this.state.ggscriptheadlines[this.state.currentHeadline]}
        </div> : null }
        {this.state.currentHeadline === 1 ? <div className="col-md-5" id="ggscriptheadlines">{this.state.ggscriptheadlines[this.state.currentHeadline]}
        </div> : null }
        {this.state.currentHeadline === 2 ? <div className="col-md-5" id="ggscriptheadlines">{this.state.ggscriptheadlines[this.state.currentHeadline]}
        </div> : null }
      </div>
      <div className="container">
      <div className="row homepage">
        <a href='/#/learn'> 
        <div className="col-md-4">
          <div id="arcade"></div>
          <h1 className="text-center blurbTitle">Learn</h1>
          <p className="text-center blurb"> Level up your Phaser skills by completing coding challenges.  
          Available in Novice, Heroic, and Mythic difficulties, which path will you choose? </p>
      </div> 
      </a>
      <a href='/#/sandbox'>
        <div className="col-md-4">
          <div id="explore"></div>
          <h1 className="text-center blurbTitle">Explore</h1>
          <p className="text-center blurb"> If you need a greater challenge, use our Phaser sandbox to build your own games from scratch, or with a little guidance from provided templates.</p> 
        </div>
        </a>
        <a href='/#/profile'>
        <div className="col-md-4">
          <div className="profile-userpic">
            <div className="img-responsive text-center" id="trophy"></div>
          </div>
          <h1 className="text-center blurbTitle">Brag</h1>
          <p className="text-center blurb"> 
          You didn't embark on this quest to keep the spoils for yourself did you?  Share your saved Phaser games with your friends and bask in their adoration.</p>
        </div>
        </a>
      </div>
      <br></br>
      </div>
      <div className="aboutPhaser">
      <div className="container">
        <h1 id="makeVideo" className="text-center"> How to Level Up with Phaser! </h1>
        <div className="aboutText"><span className="strong"> Level 1: </span> Sign up for a GGScript account using your GMAIL account - this gives you the ability to save your tutorial progress as well as the ability to save and share games you create in the sandbox. 
        </div>
        <div className="aboutText"><span className="strong"> Level 2: </span> Hone your phaser skills by completing levels in our Phaser tutorial - each level is available in three different difficulties (normal, heroic, and mythic) and you'll receive points based on the difficulty of the level you complete.  As you complete levels and receive points you'll gain new Phaser titles which you can see on your profile.
        </div>
         <div className="aboutText"><span className="strong"> Level 3: </span> Once your skills are sharpened - try creating your own games from scratch in the Phaser sandbox. You can save your games here and share them with links that you can get from your profile.
        </div>
      </div>
      </div>
        <div className="row">
        <div className="aboutText col-md-10 offset-md-1 text-center">
          <span className="strong"> Phaser </span> is a powerful and intuitive library that allows you to make HTML games that look and function beautifully within your browser.  The best thing about it is that you can get started with little to no experience with coding and its syntax is extremely similar to popular languages such as Ruby and Javascript.  Therefore, those with a bit of web development experience can translate much of what they know into their first games.
        </div>
        </div>
        <img className="center-block" src="http://i.imgur.com/24ZyjhH.png?1"></img>
        <div className="row">
        <div className="aboutText col-md-10 offset-md-1 text-center">
          <span className="strong"> GGScript </span> is the best way to get started because we create a customizable, comprehensize, and expansive platform to ensure anyone that is interested in creating games has the ability to do so.  By providing a tutorial that you can tailor to your specific needs and a sandbox that removes the need to set up a dev environment locally - we have removed many of the barriers that so often derail programmers from making significant progress in their development careers.
      </div>
      </div>
      </div>




  )}

}

export default Home