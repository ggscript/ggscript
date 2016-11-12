import React from 'react'

class Home extends React.Component{
  constructor(props) {
    super(props)
    this.state={
      ggscriptheadlines: ['learn', 'explore', 'brag'],
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
    this.timer = setInterval(this.tick.bind(this), 3000);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render() {
    return (
      <div className="container">
      <div className="row ggscript">
        <p className="title">./ggscript<span className="blinker">_</span></p>
        <p className="subtitle">press ENTER to<span id="ggscriptheadlines">{this.state.ggscriptheadlines[this.state.currentHeadline]}</span></p>
      </div>
      <div className="row homepage">
        <a href='/#/learn'> 
        <div className="col-md-4">
          <div id="arcade"></div>
          <h1 className="text-center">Learn</h1>
          <p className="text-center"> Level up your Phaser skills by completing coding challenges.  
          Available in Novice, Heroic, and Mythic difficulties, which path will you choose? </p>
      </div> 
      </a>
      <a href='/#/sandbox'>
        <div className="col-md-4">
          <div id="explore"></div>
          <h1 className="text-center">Explore</h1>
          <p className="text-center"> If you need a greater challenge, use our Phaser sandbox to build your own games from scratch, or with a little guidance from provided templates.</p> 
        </div>
        </a>
        <a href='/#/profile'>
        <div className="col-md-4">
          <div id="trophy"></div>
          <h1 className="text-center">Brag</h1>
          <p className="text-center"> Visit your player profile page to revisit and share your saved Phaser games.
          You didn't embark on this quest to keep the spoils for yourself did you?  Share with your friends and bask in their adoration.</p>
        </div>
        </a>
      </div>
      </div>




  )}

}

export default Home