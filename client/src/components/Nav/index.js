import React, { Component } from "react";
import M from 'materialize-css';
import DLogo from "../../images/D_logo_final.png"
import Resume from "../../files/dro_resume.pdf"

class Nav extends Component {

    componentDidMount() {
        //Auto initialize all materialize components
        M.AutoInit();
    }

    toggleGame = () => {
        if (this.props.playingGame === false) {
            this.props.startGame();
        } else {
            this.props.endGame();
        }
    }

    render() {
        const code = "< / >"
        console.log(this.props.playingGame);
        return (
            <div>
                {/* <!-- TOP NAVBAR --> */}
                <div id="top-nav-container" className="navbar-fixed">
                    <nav id="top-nav" className="nav-wrapper navbar-fixed grey darken-4">

                        <div className="container">
                            <a href="#!" className="sidenav-trigger left" data-target="side-modal">
                                <i className="material-icons">menu</i>
                            </a>

                            <a href="/" className="brand-logo">
                                <img src={DLogo} id="logo-top" className="left valign-wrapper" alt="D Logo" />
                            </a>
                        </div>
                    </nav>
                </div>

                {/* <!-- Modal side navbar --> */}
                <ul id="side-modal" className="sidenav center-align font1">
                    <li>
                        <a href="#portfolio" className="white-text">Portfolio</a>
                    </li>
                    <li>
                        <a href="#about" className="white-text">About</a>
                    </li>
                    <li>
                        <a href="#contact" className="white-text">Contact</a>
                    </li>
                    <li>
                        <a href={Resume} target="blank" className="white-text">Resume</a>
                    </li>
                    <li>
                        <a className="lime-text" onClick={this.toggleGame.bind(this)}>{code}</a>
                    </li>
                </ul>
                {/* <!-- End NavBar --> */}

                {/* <!-- LEFT MAIN SIDEBAR	 --> */}
                <ul id="side-nav" className="sidenav sidenav-fixed grey darken-4 center-align z-depth-0 font1">
                    <li>
                        <a id="logo-side-a" href="">
                            <img id="logo-side" src={DLogo} alt="D Logo" />
                        </a>
                    </li>
                    <div className="table-of-contents">
                        <li>
                            <a href="#portfolio" className="white-text">Portfolio</a>
                        </li>
                        <li>
                            <a href="#about" className="white-text">About</a>
                        </li >
                        <li>
                            <a href="#contact" className="white-text">Contact</a>
                        </li>
                        <li>
                            <a href={Resume} target="blank" className="white-text">Resume</a>
                        </li>
                        <li>
                            <a className="grey-text" onClick={this.toggleGame.bind(this)}>{code}</a>
                        </li>
                    </div>
                </ul>
            </div>
        );
    }
}
export default Nav;