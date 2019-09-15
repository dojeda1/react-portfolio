import React, { Component } from "react";
import M from 'materialize-css';

import MealPlannerMockup from "../../images/meal-planner/meal-planner-mockup.png"
import MealPlannerPaint from "../../images/meal-planner/meal-planner-paint.png"
import MealPlannerImg1 from "../../images/meal-planner/meal-planner-search.jpg"
import MealPlannerImg2 from "../../images/meal-planner/meal-planner-fav.jpg"
import MealPlannerImg3 from "../../images/meal-planner/meal-planner-cal.jpg"

import WizardWordsMockup from "../../images/wizard-words/wizard-words-mockup.png"
import WizardWordsPaint from "../../images/wizard-words/wizard-words-paint.png"
import WizardWordsImg1 from "../../images/wizard-words/wizard-words-guess.jpg"
import WizardWordsImg2 from "../../images/wizard-words/wizard-words-lose.jpg"
import WizardWordsImg3 from "../../images/wizard-words/wizard-words-win.jpg"

import ScifiRpgMockup from "../../images/scifi-rpg/scifi-rpg-mockup.png"
import ScifiRpgPaint from "../../images/scifi-rpg/scifi-rpg-paint.png"
import ScifiRpgImg1 from "../../images/scifi-rpg/scifi-rpg-lose.jpg"
import ScifiRpgImg2 from "../../images/scifi-rpg/scifi-rpg-win.jpg"
import ScifiRpgImg3 from "../../images/scifi-rpg/scifi-rpg-fight.jpg"

import SocratesMockup from "../../images/socrates/socrates-mockup.png"
import SocratesPaint from "../../images/socrates/socrates-paint.png"
import SocratesImg1 from "../../images/socrates/socrates-prompt.jpg"
import SocratesImg2 from "../../images/socrates/socrates-results.jpg"
import SocratesImg3 from "../../images/socrates/socrates-choices.jpg"

import TriviaMockup from "../../images/trivia-game/trivia-mockup.png"
import TriviaPaint from "../../images/trivia-game/trivia-paint.png"
import TriviaImg1 from "../../images/trivia-game/trivia-results.jpg"
import TriviaImg2 from "../../images/trivia-game/trivia-start.jpg"
import TriviaImg3 from "../../images/trivia-game/trivia-results.jpg"

import FurButlrMockup from "../../images/fur-butlr/fur-butlr-mockup.png"
import FurButlrPaint from "../../images/fur-butlr/fur-butlr-paint.png"
import FurButlrImg1 from "../../images/fur-butlr/fur-butlr-results.jpg"
import FurButlrImg2 from "../../images/fur-butlr/fur-butlr-update.jpg"
import FurButlrImg3 from "../../images/fur-butlr/fur-butlr-profile.jpg"

import BugMemoryMockup from "../../images/bug-memory/bug-memory-mockup.png"
import BugMemoryPaint from "../../images/bug-memory/bug-memory-paint.png"
import BugMemoryImg1 from "../../images/bug-memory/bug-memory-win.jpg"
import BugMemoryImg2 from "../../images/bug-memory/bug-memory-lose.jpg"
import BugMemoryImg3 from "../../images/bug-memory/bug-memory-cards.jpg"

import BookFinderMockup from "../../images/book-finder/book-finder-mockup.png"
import BookFinderPaint from "../../images/book-finder/book-finder-paint.png"
import BookFinderImg1 from "../../images/book-finder/book-finder-home.jpg"
import BookFinderImg2 from "../../images/book-finder/book-finder-results.jpg"
import BookFinderImg3 from "../../images/book-finder/book-finder-saved.jpg"

class Portfolio extends Component {
    state = {
        currentProject: {},
        currentList: [],
        allProjects: [
            {
                title: "Meal Planner",
                mockup: MealPlannerMockup,
                paint: MealPlannerPaint,
                img1: MealPlannerImg1,
                img2: MealPlannerImg2,
                img3: MealPlannerImg3,
                visit: "https://stephanfalcon.github.io/PlusUltraProject/",
                code: "https://github.com/stephanfalcon/PlusUltraProject",
                sum: "Using the Spoonacular API, Meal Planner allows you to look up recipes with optional dietary restrictions and save them to your favorites. You can view recipe cards to see a meal's ingredients and instructions. From the Calendar page, you can choose any recipe from your favorites, add it to a meal period on your weekly calendar, and save the plan for later. Both the favorites and the weekly meal plan are stored using Firebase's realtime database.",
                list: ["HTML", "CSS", "JavaScript", "jQuery", "Materialize", "Firebase", "Spoonacular API", "Heal Thru Words API"]
            }, {
                title: "Wizard Words",
                mockup: WizardWordsMockup,
                paint: WizardWordsPaint,
                img1: WizardWordsImg1,
                img2: WizardWordsImg2,
                img3: WizardWordsImg3,
                visit: "https://dojeda1.github.io/Word-Guess-Game/",
                code: "https://github.com/dojeda1/Word-Guess-Game",
                sum: "This version of the traditional Hangman game is fashioned after the wizarding world of Harry Potter. The game displays what letters you have previously guessed, how many guesses you have left, as well as your wins and losses. The design was inspired by the Marauder's Map and uses jQuery for a number of cool fade-in and fade-out animations.",
                list: ["HTML", "CSS", "JavaScript", "jQuery", "Bootstrap"]
            }, {
                title: "Sci-fi RPG",
                mockup: ScifiRpgMockup,
                paint: ScifiRpgPaint,
                img1: ScifiRpgImg1,
                img2: ScifiRpgImg2,
                img3: ScifiRpgImg3,
                visit: "https://dojeda1.github.io/Space-RPG-Game/",
                code: "https://github.com/dojeda1/Space-RPG-Game",
                sum: "Choose one of 4 classic Sci-fi characters to play as and try to defeat all of the remaining opponents. Each character has different health, strength, and leveling up stats and you must choose defenders in particular orders to obtain victory.",
                list: ["HTML", "CSS", "JavaScript", "jQuery", "Bootstrap"]
            }, {
                title: "Trial of Socrates",
                mockup: SocratesMockup,
                paint: SocratesPaint,
                img1: SocratesImg1,
                img2: SocratesImg2,
                img3: SocratesImg3,
                visit: "https://dojeda1.github.io/Socrates-Game/",
                code: "https://github.com/dojeda1/Socrates-Game",
                sum: "This is a text based adventure game inspired by the ancient tale of when Socrates was sentenced to death by a jury of his fellow Athenians. Playing as the philosopher himself, you make branching choices powered by IF/ELSE functions in JavaScript that lead to alternate endings. The goal is to find the historical ending or simply explore alternate timelines. ",
                list: ["HTML", "CSS", "JavaScript", "jQuery", "Bootstrap"]
            }, {
                title: "Trivia Game",
                mockup: TriviaMockup,
                paint: TriviaPaint,
                img1: TriviaImg1,
                img2: TriviaImg2,
                img3: TriviaImg3,
                visit: "https://dojeda1.github.io/TriviaGame/",
                code: "https://github.com/dojeda1/TriviaGame",
                sum: "Test your knowledge of both the metric and imperial units of measurement. Each question is timed and will move onto the next if left unanswered. After each question, a fun GIF is briefly displayed according to whether or not you were correct. At the end of the game, the number of right, wrong, and unanswered responses is displayed along side your overall score. Your high scores are also shown at the bottom of the results page.",
                list: ["HTML", "CSS", "JavaScript", "jQuery", "Bootstrap"]
            }, {
                title: "Fur Butlr",
                mockup: FurButlrMockup,
                paint: FurButlrPaint,
                img1: FurButlrImg1,
                img2: FurButlrImg2,
                img3: FurButlrImg3,
                visit: "https://fur-butlr-app.herokuapp.com/",
                code: "https://github.com/ApexPanda/FurButler",
                sum: "A place where pet owners can meet each other and search for pet services like walkers, groomers or sitters. Fur Butlr lets you create a profile, login in, edit your page, and show off your pets.",
                list: ["HTML", "CSS", "JavaScript", "jQuery", "Materialize", "MySQL", "Node.js", "Sequelize"]
            }, {
                title: "Bug Memory",
                mockup: BugMemoryMockup,
                paint: BugMemoryPaint,
                img1: BugMemoryImg1,
                img2: BugMemoryImg2,
                img3: BugMemoryImg3,
                visit: "https://memory-game-react-click.herokuapp.com/",
                code: "https://github.com/dojeda1/memory-game",
                sum: "Test your memory by selecting every bug card without choosing the same one twice. Each time one is chosen, the game will shuffle the cards and display them in a random order using REACT. If you select the same bug twice, you lose!",
                list: ["HTML", "CSS", "JavaScript", "Bootstrap", "React.js", "Node.js"]
            }, {
                title: "Book Finder",
                mockup: BookFinderMockup,
                paint: BookFinderPaint,
                img1: BookFinderImg1,
                img2: BookFinderImg2,
                img3: BookFinderImg3,
                visit: "https://google-books-mern.herokuapp.com/",
                code: "https://github.com/dojeda1/book-search",
                sum: "Search through a large database of books with the help of the Google Books API. User inputs the title of a book and results are displayed below. They can then visit the google URL, save the book in a MongoDB database for later, or delete it from saved books.",
                list: ["HTML", "CSS", "JavaScript", "React.js", "MongoDB", "Mongoose", "Google Books API"]
            }
        ]
    }

    componentDidMount() {
        this.setState({ currentProject: this.state.allProjects[0], currentList: this.state.allProjects[0].list })
        M.AutoInit();
    }

    handleSelect = (event) => {

        let tag = event.currentTarget.dataset.tag;
        console.log(tag);
        this.setState({ currentProject: this.state.allProjects[tag], currentList: this.state.allProjects[tag].list })

    }

    render() {

        return (

            <div id="portfolio" className="scrollspy">

                <div className=" row grey darken-4 z-depth-1">

                    <div className="col s12 center-align">
                        <h4 className="dom-green1-text font1">Portfolio</h4>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col s12">
                            <h5 className="dom-green1-text font2">Project Summary</h5>
                            <div className="divider" />
                        </div>
                    </div>

                    <div className="row">

                        <div className="col m12 l8">
                            <h5 id="p-title" className="font1">{this.state.currentProject.title}</h5>
                            <img id="p-mockup" src={this.state.currentProject.mockup} alt="Mockup" />

                            <br />
                            <div className="row">
                                <div className="col s12 left-align">
                                    <a id="p-visit-btn" href={this.state.currentProject.visit} target="blank">
                                        <button className="btn portfolio-btn waves-effect waves-light dom-green1 font2" type="button" name="action">
                                            Visit<i className="material-icons right">public</i>
                                        </button>
                                    </a>

                                    <a id="p-code-btn" href={this.state.currentProject.code} target="blank">
                                        <button className="btn portfolio-btn waves-effect waves-light dom-green1-dark font2" type="button" name="action">
                                            Code<i className="material-icons right">code</i>
                                        </button>
                                    </a>

                                </div>

                            </div>
                        </div>
                        <div className="col m12 l4">
                            <div className="row">
                                <div className="col s12 m8 l12">
                                    <h6 className="font1 dom-green1-text">- About the Project -</h6>
                                    <p id="p-about">{this.state.currentProject.sum}</p>
                                </div>
                                <div className="col s12 m4 l12">
                                    <h6 className="font1 dom-green1-text">- Made With -</h6>
                                    <ul id="p-list" className="grey-text">
                                        {(this.state.currentList).join(", ")}
                                    </ul>
                                </div>

                            </div>

                        </div>


                    </div>
                    <div id="info-pics" className="row">

                        <div id="move" className="col s12 m4">
                            <div className="col s12">
                                <div className="row"><img id="p-img-1" src={this.state.currentProject.img1} alt="Screenshot 1" className="z-depth-2 materialboxed" /></div>
                            </div>

                            <div className="col s12">
                                <div className="row"><img id="p-img-2" src={this.state.currentProject.img2} alt="Screenshot 2" className="z-depth-2 materialboxed" /></div>
                            </div>

                        </div>

                        <div className="col s12 m8"><img id="p-img-3" src={this.state.currentProject.img3} alt="Screenshot 3" className="z-depth-2 materialboxed" /></div>
                    </div>

                    <div className="row">
                    </div>

                    <div className="spacer" />

                    {/* Selection carousel */}

                    <div className="row">
                        <div className="col s12">
                            <h5 className="dom-green1-text font2 center-align">Select a Project</h5>
                            <div className="divider" />
                        </div>

                    </div>
                    <div className="carousel center-align">

                        {this.state.allProjects.map((project, index) => (
                            <button key={index} className="carousel-item" data-tag={index} onClick={this.handleSelect}>
                                <img className="paint-pic" src={project.paint} alt="Project" />
                                <h6 className="black-text font2">{project.title}</h6>
                            </button>
                        ))}

                    </div>

                    <div className="spacer" />

                </div>
            </div>
        );
    }
}

export default Portfolio;