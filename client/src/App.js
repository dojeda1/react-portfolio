import React, { Component } from "react";
import M from 'materialize-css';
import Nav from "./components/Nav"
import Parallax from "./components/Parallax"
import Portfolio from "./components/Portfolio"
import About from "./components/About"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import Game from "./components/Game"
import "./App.css";

class App extends Component {

  state = {
    playingGame: true
  };

  componentDidMount() {
    //Auto initialize all materialize components
    M.AutoInit();
  }

  startGame = () => {
    this.setState({ playingGame: true });
  }

  endGame = () => {
    this.setState({ playingGame: false });
  }

  render() {


    return (

      <div className="App">

        <div className="main-container">
          {this.state.playingGame ?          
          <Game
            playingGame={this.state.playingGame}
            endGame={this.endGame}
          />          
          :
          <Nav
            playingGame={this.state.playingGame}
            startGame={this.startGame}
          />
          }

          <Parallax />
          <Portfolio />
          <About />
          <Contact />
          <Footer />

        </div>
      </div>
    );
  }
}

export default App;
