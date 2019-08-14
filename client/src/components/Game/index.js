import React, { Component } from "react";

class Game extends Component {

    state = {
        message: "",
        player: {
            name: "",
            race: "",
            class: "",
            strength: 4,
            defense: 2,
            luck: 3,
            speed: 2,
            maxHp: 20,
            hp: 20,
            maxMp: 4,
            mp: 4,
            level: 1,
            xp: 0,
            nextLevel: 50,
            inventory: ["Health Potion"],
            gold: 0,
            goldCount: 0,
            killCount: 0,
            dungeonCount: 0,
            isDead: false,
            isBerserk: false,
            berserkCount: 0,
            baseAtkHold: 0,
        },
        currentTask: "new or load",
        inputName: ""
    }
    componentDidMount() {
        this.setState({ message: "Choose an Option." })
    }

    loadGame = () => {
        console.log("Loaded Character.");
        this.setState({ currentTask: "playing game" })
    }
    newGame = () => {
        console.log("Creating New Character.")
        this.setState({
            currentTask: "input name", message: "Hello Adventurer! What is your name?"
        })
    }
    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    }
    handleName = (event) => {
        event.preventDefault();

        if (this.state.inputName === "") {
            this.setState({
                message: "Surely, you must have a name..."
            });
        } else {
            let newName = this.state.inputName.trim();
            newName = newName.charAt(0).toUpperCase() + newName.slice(1);

            this.setState({
                player: {
                    ...this.state.player,
                    name: newName
                },
                message: "What is your race?",
                currentTask: "select race"
            });
        }
    }
    selectRace = (event) => {
        this.setState({
            player: {
                ...this.state.player,
                race: event.target.value
            },
            currentTask: "select class", message: "What is your class?"
        })
    }
    selectClass = (event) => {
        this.setState({
            player: {
                ...this.state.player,
                class: event.target.value
            },
            currentTask: "begin journey", message: "Your adventure begins."
        })
    }
    handleCheck = () => {
        console.log(this.state.player);
    }

    render() {
        return (
            <div className="game-container" >
                <div className="container white-text">
                    <div className="row">
                        <h3 className="font2">FANTASY RPG</h3>
                        <p>{this.state.message}</p>
                        {this.state.currentTask === "new or load" ?
                            <div>
                                <button className="btn portfolio-btn waves-effect waves-light dom-green1 font2" type="button" onClick={this.newGame}>
                                    New Game
                                </button>
                                <button className="btn portfolio-btn waves-effect waves-light dom-green1 font2" type="button" onClick={this.loadGame}>
                                    Load Game
                                </button>
                            </div>
                            : null}
                        {this.state.currentTask === "input name" ?
                            <div>
                                <form id="game-form" onSubmit={this.handleName}>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input type="text" className="form-input" name="inputName" value={this.state.inputName} onChange={this.handleInputChange} />
                                            <label htmlFor="inputName" className="font1">Name</label>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col m12">
                                            <button
                                                className="btn contact-btn small waves-effect waves-light dom-blue font2 right"
                                                type="submit" name="action" value="Send">Enter</button>
                                        </div>
                                    </div>
                                </form>

                            </div>
                            : null}
                        {this.state.currentTask === "select race" ?
                            <div>
                                <button className="btn portfolio-btn waves-effect waves-light dom-green1 font2" value="Human" onClick={this.selectRace}>
                                    Human
                                </button>
                                <button className="btn portfolio-btn waves-effect waves-light dom-green1 font2" value="Elf" onClick={this.selectRace}>
                                    Elf
                                </button>
                                <button className="btn portfolio-btn waves-effect waves-light dom-green1 font2" value="Dwarf" onClick={this.selectRace}>
                                    Dwarf
                                </button>
                            </div>
                            : null}

                        {this.state.currentTask === "select class" ?
                            <div>
                                <button className="btn portfolio-btn waves-effect waves-light dom-green1 font2" value="Warrior" onClick={this.selectClass}>
                                    Warrior
                                </button>
                                <button className="btn portfolio-btn waves-effect waves-light dom-green1 font2" value="Mage" onClick={this.selectClass}>
                                    Mage
                                </button>
                                <button className="btn portfolio-btn waves-effect waves-light dom-green1 font2" value="Rogue" onClick={this.selectClass}>
                                    Rogue
                                </button>
                            </div>
                            : null}





                        <div>
                            <p className="dom-green1-text">{this.state.player.name} | HP: {this.state.player.hp}/ {this.state.player.maxHp} | MP: {this.state.player.mp}/ {this.state.player.maxMp} | XP: {this.state.player.xp}/ {this.state.player.nextLevel} | ${this.state.player.gold}</p>
                            <button className="btn portfolio-btn waves-effect waves-light dom-green2 font2" type="button" onClick={this.handleCheck}>
                                Check stats
                                </button>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}
export default Game;