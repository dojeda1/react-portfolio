import React from "react";
import GitHubLogo from "../../images/github-logo.png"

function Footer() {

    return (
        <footer className="page-footer dom-blue-text font1 grey darken-4 center-align">
            <div className="container">
                <div className="row">
                    <div className="col s12">
                        <div className="spacer" />
                        <h5>Live, Learn, Create</h5>
                        <div className="spacer" />
                        <p></p>
                        <div className="row">
                            <img className="footer-img" src={GitHubLogo} alt="Footer Logo" />
                            <img className="footer-img" src={GitHubLogo} alt="Footer Logo" />
                            <img className="footer-img" src={GitHubLogo} alt="Footer Logo" />
                        </div>
                        <div className="spacer" />
                        <p>Copyright © 2019 - Dominic Ojeda</p>
                    </div>
                </div>
            </div>
            <div className="spacer" />
        </footer>
    );
}

export default Footer;