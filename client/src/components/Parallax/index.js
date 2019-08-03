import React from "react";
import DLogoWhite from "../../images/d-logo.png"
import LinkedinLogo from "../../images/linkedin-logo.png"
import GitHubLogo from "../../images/github-logo.png"
import ResumeLogo from "../../images/resume-logo.png"
import TreeBG from "../../images/trees2.jpg"
import Resume from "../../files/dro_resume.pdf"

function Parallax() {

    return (
        < div className="parallax-container center valign-wrapper">
            <div className="container">
                <div className="row">
                    <div className="col s12 white-text">
                        <img className="logo-pic" src={DLogoWhite} />
                        <h1 className="white-text font2">DOMINIC OJEDA</h1>
                        <h5 className="font1">Full Stack Web Developer</h5>
                    </div>
                </div>

                <div className="row">

                    <div className="col s12 center-align">
                        <a href="https://www.linkedin.com/in/dominic-ojeda/" target="blank">
                            <img src={LinkedinLogo} alt="Linkedin Logo" className="logo-link" />
                        </a>
                        <a href="https://github.com/dojeda1" target="blank">
                            <img src={GitHubLogo} alt="GitHub Logo" className="logo-link" />
                        </a>
                        <a href={Resume} target="blank">
                            <img src={ResumeLogo} alt="Resume Logo" className="logo-link" />
                        </a>

                    </div>
                </div>
            </div>

            <div className="parallax">
                <img id="para-pic" src={TreeBG} />
            </div>

        </div>
    );
}

export default Parallax;