import React, { Component } from "react";
import M from 'materialize-css';
import Nav from "./components/Nav"
import Parallax from "./components/Parallax"
import Portfolio from "./components/Portfolio"
import About from "./components/About"
import "./App.css";

class App extends Component {

  state = {
    room: "dungeons"
  };

  componentDidMount() {
    //Auto initialize all materialize components
    M.AutoInit();
  }

  render() {


    return (
      <div className="App">

        <Nav />

        <div className="main-container">
          <Parallax />
          <Portfolio />
          <About />

          {/* <!-- Contact Section --> */}
          <div id="contact" className="scrollspy">
            <div className="row grey darken-4 z-depth-1">

              <div className="col s12 center-align">
                <h4 className="dom-blue-text font1">Contact</h4>
              </div>
            </div>

            <div className="container">

              <div className="row">
                <div className="col s12">
                  <h5 className="dom-blue-text font2">Send me a message</h5>

                  <div className="divider" />
                </div>
              </div>

              <div className="row">
                <div className="col s12 m7 l8">

                  <form id="contact-form" action="https://formspree.io/dominicojeda.coding@gmail.com"
                    method="POST">
                    <div className="row">
                      <div className="input-field col s12">
                        <input type="text" className="form-input" name="name" />
                        <label for="name" className="font1">Name</label>
                      </div>
                      <div className="input-field col s12">
                        <input type="email" className="form-input" name="email" />
                        <label for="email" className="font1">Email</label>
                      </div>
                      <div className="input-field col s12">
                        <textarea id="message" className="materialize-textarea" name="message" />
                        <label for="message" className="font1">Message</label>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col m12">
                        <button id="send-btn"
                          className="btn contact-btn small waves-effect waves-light dom-blue font2 right"
                          type="submit" name="action" value="Send">Send<i
                            className="material-icons right">send</i></button>
                      </div>
                    </div>
                  </form>

                </div>
                <div className="col s12 m5 l4">
                  <div className="row">
                    <div className="col">
                      <h6 className="font1 dom-blue-text">- Contact info -</h6>
                      <br />
                      <p id="p-about">dominicojeda.coding@gmail.com</p>
                      <br />
                      <p>
                        <a href="https://www.linkedin.com/in/dominic-ojeda/" target="_blank"
                          className="contact-link grey-text">Linkedin</a>
                      </p>
                      <br />
                      <p>
                        <a href="https://github.com/dojeda1" target="_blank"
                          className="contact-link grey-text">Github</a>
                      </p>
                    </div>

                  </div>
                </div>
              </div>

              <div className="spacer-large" />
            </div>
          </div>

          <footer className="page-footer grey darken-4">
            <div className="spacer-large" />
            {/* <!-- <div className="container">
                      <div className="row">
                        <div className="col l6 s12">
                          <h5 className="dom-blue-text">Footer Content</h5>
                          <p className="dom-blue-text text-lighten-4">You can use rows and columns here to organize
                              your
                            footer content.</p>
                        </div>

                      </div>
                    </div>
                    <div className="footer-copyright">
                      <div className="container dom-blue-text">
                        © 2014 Copyright Text

                </div>
                </div> --> */}
          </footer>

        </div>
      </div>
    );
  }
}

export default App;
