import React, { Component } from "react";
import HtmlLogo from "../../images/tool-logos/html-logo.png"
import CssLogo from "../../images/tool-logos/css-logo.png"
import JsLogo from "../../images/tool-logos/js-logo.png"
import JQueryLogo from "../../images/tool-logos/jquery-logo.png"
import NodeLogo from "../../images/tool-logos/node-logo.png"
import ReactLogo from "../../images/tool-logos/react-logo.png"
import MySqlLogo from "../../images/tool-logos/mysql-logo.png"
import MongoDbLogo from "../../images/tool-logos/mongodb-logo.png"
import BootstrapLogo from "../../images/tool-logos/bootstrap-logo.png"
import MaterializeLogo from "../../images/tool-logos/materialize-logo.png"
import PhotoshopLogo from "../../images/tool-logos/ps-logo.png"
import IllustratorLogo from "../../images/tool-logos/illustrator-logo.png"

import TreeLogo from "../../images/tree-logo.png"
import SpaceLogo from "../../images/space-logo.png"
import ArtLogo from "../../images/art-logo.png"
import GameLogo from "../../images/game-logo.png"

class About extends Component {

    handleRotate = (event) => {

        const logo = event.target;
        if (logo.classList.contains("rotate")) {
            logo.classList.remove("rotate");
        } else {
            logo.classList.add("rotate");
            setTimeout(function () {
                logo.classList.remove("rotate");
            }, 801);
        }

    }

    render() {
        return (

            < div id="about" className="scrollspy" >
                <div className="row grey darken-4 z-depth-1">

                    <div className="col s12 center-align">
                        <h4 className="dom-green2-text font1">About</h4>
                    </div>
                </div>

                <div className="container">

                    <div className="row">
                        <div className="col s12 m8">
                            <h5 className="dom-green2-text font2">Summary</h5>

                            <div className="divider" />

                            <div className="">
                                <p> I am a web developer who enjoys coding on both front-end and back-end. Experience
                                producing web
                                applications with HTML, CSS, and JavaScript and creating visual elements with Photoshop
                                and Illustrator. I have a passion for making programs that are visually appealing and
                                fun to interact with. I enjoy solving problems creatively and I am always determined to
                                try again and again until the vision becomes reality. I believe clear communication is
                                key to completing any project, and I work well in a team or going at it alone. I know
                                that the right
                                code can solve any problem.</p>
                                <br />
                                <p></p>
                            </div>
                        </div>

                        <div className="col s12 m4">
                            <h5 className="dom-green2-text font2">My Tool Belt</h5>

                            <div className="divider" />

                            <div className="row">
                                <div className="col s3">
                                    <img className="tool-pic bulge" src={HtmlLogo} alt="HTML Logo" onClick={this.handleRotate} />
                                </div>

                                <div className="col s3">
                                    <img className="tool-pic bulge" src={CssLogo} alt="CSS Logo" onClick={this.handleRotate} />
                                </div>

                                <div className="col s3">
                                    <img className="tool-pic bulge" src={JsLogo} alt="JavaScript Logo" onClick={this.handleRotate} />
                                </div>

                                <div className="col s3">
                                    <img className="tool-pic bulge" src={JQueryLogo} alt="jQuery Logo" onClick={this.handleRotate} />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col s3">
                                    <img className="tool-pic bulge" src={NodeLogo} alt="Node Logo" onClick={this.handleRotate} />
                                </div>

                                <div className="col s3">
                                    <img className="tool-pic bulge" src={ReactLogo} alt="React Logo" onClick={this.handleRotate} />
                                </div>

                                <div className="col s3">
                                    <img className="tool-pic bulge" src={MySqlLogo} alt="MySQL Logo" onClick={this.handleRotate} />
                                </div>

                                <div className="col s3">
                                    <img className="tool-pic bulge" src={MongoDbLogo} alt="MongoDB Logo" onClick={this.handleRotate} />
                                </div>
                            </div>

                            <div className="row">

                                <div className="col s3">
                                    <img className="tool-pic bulge" src={BootstrapLogo} alt="Bootstrap Logo" onClick={this.handleRotate} />
                                </div>

                                <div className="col s3">
                                    <img className="tool-pic bulge" src={MaterializeLogo} alt="MongoDB Logo" onClick={this.handleRotate} />
                                </div>

                                <div className="col s3">
                                    <img className="tool-pic bulge" src={PhotoshopLogo} alt="Photoshop Logo" onClick={this.handleRotate} />
                                </div>

                                <div className="col s3">
                                    <img className="tool-pic bulge" src={IllustratorLogo} alt="Illustrator Logo" onClick={this.handleRotate} />
                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="row">
                        <div className="col s12">
                            <h5 className="dom-green2-text font2">My Interests</h5>

                            <div className="divider" />

                        </div>

                        <div className="row">
                            <div className="col s6 m6 l3 center-align">
                                <img className="int-logo bulge" src={TreeLogo} alt="Tree Logo" onClick={this.handleRotate} />

                                <p>Nature is incredible. The trees, rocks, and rivers give us everything we need for life.
                                Being outdoors, taking in the fresh air and looking at all the
                                wonder this world has to offer can always give me sense of peace and purpose.</p>
                            </div>

                            <div className="col s6 m6 l3 center-align">
                                <img className="int-logo bulge" src={SpaceLogo} alt="Space Logo" onClick={this.handleRotate} />
                                <p>The vastness of the universe forever leaves me in awe. I love learning about the planets
                                and stars, and how they all mesh together to form the cosmos. There is so much we
                                don't yet know, and that's part of what makes it so exciting.</p>
                            </div>


                            <div className="col s6 m6 l3 center-align">
                                <img className="int-logo bulge" src={ArtLogo} alt="Art Logo" onClick={this.handleRotate} />
                                <p>Art has always been one of my great loves. I enjoy creating characters, concept art, and
                                logo designs using both traditional and digital
                                medium. Many hours have been spent huddled over my desk working on my next piece.</p>
                            </div>


                            <div className="col s6 m6 l3 center-align">
                                <img className="int-logo bulge" src={GameLogo} alt="Game Logo" onClick={this.handleRotate} />
                                <p>Playing or creating games is always a good time. It's so much fun to go on adventures,
                                explore new worlds,
                                or reach that new high score. My favorite games include Gears of War, Final
                                Fantasy, and Super Smash Bros.</p>
                            </div>
                        </div>

                        <div className="spacer" />
                    </div>
                </div>
            </div >
        );
    }
}

export default About;