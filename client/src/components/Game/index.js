import React, { Component } from "react";
import monsters1 from "./monsters1.json";
class Game extends Component {

    state = {
        message: "",
        currentTask: "new or load",
        inputName: "",
        player: {
            name: "",
            race: "",
            class: "",
            special1: "",
            special2: "",
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

            totalKills: 0,
            totalDungeons: 0,
            totalGold: 0

        },
        gamePlayStates: {
            isInTown: false,
            isExploring: false,
            isFighting: false,
            isBuying: false,
            isSelling: false,
            isInDungeon: false,
            isInTavern: false
        },
        currentEnemy: {
            name: "",
            type: "common",
            maxHp: 0,
            hp: 0,
            maxMp: 0,
            mp: 0,
            strength: 0,
            speed: 0,
            xp: 0,
            inventory: [],
            gold: 0,
            isDead: false
        },
        monsters1,

    }
    componentDidMount() {
        this.setState({ message: "Choose an Option." })
    }
    //Utility Functions
    changePlayStates = (fighting, exploring, inTown, buying, selling, dungeon) => {
        this.setState({
            gamePlayStates: {
                ...this.state.gamePlayStates,
                isFighting: fighting,
                isExploring: exploring,
                isInTown: inTown,
                isBuying: buying,
                isSelling: selling,
                isInDungeon: dungeon
            },
        })
    }
    randNum = (x, y) => {
        return Math.floor(Math.random() * y) + x
    }
    aOrAn = (word) => {
        var firstLetter = word.charAt(0);
        var anA = "";
        if (firstLetter === "A" || firstLetter === "E" || firstLetter === "I" || firstLetter === "O" || firstLetter === "U") {
            anA = "an";
            return anA
        } else {
            anA = "a";
            return anA
        }
    }
    handleCheck = () => {
        console.log(this.state.player);
    }
    //Start Game Functions
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
        let maxHpA
        let hpA
        let maxMpA
        let mpA
        let strengthA
        let defenseA
        let speedA
        let luckA
        switch (event.target.value) {

            case "Human":
                maxHpA = 4
                hpA = 4
                maxMpA = 4
                mpA = 4
                strengthA = 1
                defenseA = 1
                speedA = 1
                luckA = 0
                break;

            case "Elf":
                maxHpA = 4
                hpA = 4
                maxMpA = 6
                mpA = 6
                strengthA = 0
                defenseA = 0
                speedA = 1
                luckA = 1
                break;

            case "Dwarf":
                maxHpA = 6
                hpA = 6
                maxMpA = 2
                mpA = 2
                strengthA = 2
                defenseA = 1
                speedA = 0
                luckA = 0
                break;

            default: console.log("error");

        }
        this.setState({
            player: {
                ...this.state.player,
                race: event.target.value,
                maxHp: this.state.player.maxHp + maxHpA,
                hp: this.state.player.hp + hpA,
                maxMp: this.state.player.maxMp + maxMpA,
                mp: this.state.player.mp + mpA,
                strength: this.state.player.strength + strengthA,
                defenseA: this.state.player.defense + defenseA,
                speed: this.state.player.speed + speedA,
                luck: this.state.player.luck + luckA
            },
            currentTask: "select class", message: "What is your class?"
        })
    }
    selectClass = (event) => {
        let maxHpA
        let hpA
        let maxMpA
        let mpA
        let strengthA
        let defenseA
        let speedA
        let luckA
        let special1A
        let special2A
        switch (event.target.value) {

            case "Warrior":
                maxHpA = 4
                hpA = 4
                maxMpA = 0
                mpA = 0
                strengthA = 2
                defenseA = 2
                speedA = 0
                luckA = 0
                special1A = "Axe Strike"
                special2A = "Berserk"
                break;

            case "Mage":
                maxHpA = 2
                hpA = 2
                maxMpA = 4
                mpA = 4
                strengthA = 0
                defenseA = 0
                speedA = 0
                luckA = 1
                special1A = "Fireball"
                special2A = "Heal"
                break;

            case "Rogue":
                maxHpA = 2
                hpA = 2
                maxMpA = 2
                mpA = 2
                strengthA = 1
                defenseA = 0
                speedA = 2
                luckA = 2
                special1A = "Dagger Slash"
                special2A = "Steal"
                break;

            default: console.log("error");
        }
        this.setState({
            player: {
                ...this.state.player,
                class: event.target.value,
                maxHp: this.state.player.maxHp + maxHpA,
                hp: this.state.player.hp + hpA,
                maxMp: this.state.player.maxMp + maxMpA,
                mp: this.state.player.mp + mpA,
                strength: this.state.player.strength + strengthA,
                defenseA: this.state.player.defense + defenseA,
                speed: this.state.player.speed + speedA,
                luck: this.state.player.luck + luckA,
                special1: this.state.player.special1 + special1A,
                special2: this.state.player.special2 + special2A
            },
            currentTask: "begin journey", message: ""
        })
        this.changePlayStates(false, true, false, false, false, false)
    }
    //to place functions
    selectToWild = () => {
        this.changePlayStates(false, true, false, false, false, false);
    }
    selectToTown = () => {
        this.changePlayStates(false, false, true, false, false, false);
    }
    selectExploreWild = () => {
        this.monsterEncounter();
    }
    //encounters
    monsterEncounter = () => {


        let floorNum = 0;
        let rangeNum = 0;
        let playerLevel = this.state.player.level

        if (playerLevel >= 5) {
            floorNum = playerLevel - 5;
            rangeNum = 5;
        } else {
            floorNum = 0;
            rangeNum = playerLevel;
        }

        let monNum = this.randNum(floorNum, rangeNum)
        console.log(monNum);

        this.setState({
            currentEnemy: {
                ...this.state.currentEnemy,
                name: monsters1[monNum].name,
                type: monsters1[monNum].type,
                maxHp: monsters1[monNum].maxHp,
                hp: monsters1[monNum].maxHp,
                maxMp: monsters1[monNum].maxMp,
                mp: monsters1[monNum].maxMp,
                strength: monsters1[monNum].strength,
                xp: monsters1[monNum].xp,
                inventory: monsters1[monNum].inventory,
                gold: monsters1[monNum].gold,
                isDead: false
            },
            gamePlayStates: {
                ...this.state.gamePlayStates,
                isFighting: true
            },
            message: "You encountered " + this.aOrAn(monsters1[monNum].name) + " " + monsters1[monNum].name + "."
        });
    };
    // Combat Functions
    selectAttack = () => {
        this.attack(this.state.player, this.state.currentEnemy);
        this.enemyDeathCheck(this.state.currentEnemy);
        this.gameOverCheck();
    }
    attack = function (attacker, defender) {
        const luckCheck = defender.speed - attacker.luck;
        const criticalCheck = this.randNum(1, luckCheck);
        if (criticalCheck !== 1) {

            defender.hp -= attacker.strength;
            console.log(defender.hp)
        } else {
            let criticalStrength = attacker.strength + Math.floor(attacker.strength / 2);
            defender.hp -= criticalStrength;
            console.log(defender.hp)
        }
        console.log("after:" + defender.hp);
        this.setState({
            defender: {
                ...this.state.defender,
                hp: defender.hp
            },
        });
        // attacker.berserkCheck();
    }
    enemyDeathCheck = (enemy) => {
        if (enemy.hp <= 0) {
            this.setState({
                gamePlayStates: {
                    ...this.state.gamePlayStates,
                    isFighting: false,
                },
                player: {
                    ...this.state.player,
                    totalKills: this.state.player.totalKills++
                },
                message: "You defeated " + enemy.name + "."
            });
            console.log(this.state.player.totalKills)
    } else {
    this.attack(enemy, this.state.player);
}
    }
gameOverCheck = () => {
    if (this.state.player.hp <= 0) {
        this.changePlayStates(false, false, false, false, false, false)
        this.setState({
            message: "You have died... Game over."
        });
    }
}
render() {
    return (
        <div className="game-container" >
            <div className="container white-text">
                <div className="row">
                    <h3 className="font2 center-align">FANTASY RPG</h3>
                    <p>{this.state.message}</p>
                    {this.state.gamePlayStates.isFighting ?
                        <p className="dom-green2-text font1"><i className="material-icons left">adb</i>{this.state.currentEnemy.name} | HP: {this.state.currentEnemy.hp}/ {this.state.currentEnemy.maxHp} | ATK: {this.state.currentEnemy.strength}</p>
                        : null}
                    <div>
                        <p className="dom-blue-text font1"><i className="material-icons left">person</i>{this.state.player.name} | HP: {this.state.player.hp}/ {this.state.player.maxHp} | MP: {this.state.player.mp}/ {this.state.player.maxMp} | XP: {this.state.player.xp}/ {this.state.player.nextLevel} | ${this.state.player.gold}</p>
                        {/* <button className="btn portfolio-btn waves-effect waves-light dom-green2 font2" type="button" onClick={this.handleCheck}>
                                Check stats
                                </button> */}
                    </div>
                    {this.state.currentTask === "new or load" ?
                        <div>
                            <button className="btn portfolio-btn waves-effect waves-light dom-green1 font2" type="button" onClick={this.newGame}>
                                New Game
                                </button>
                            <button className="btn portfolio-btn waves-effect waves-light dom-green1 font2" type="button" onClick={this.loadGame}>
                                Load Game
                                </button>
                        </div>
                        : this.state.currentTask === "input name" ?
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
                            : this.state.currentTask === "select race" ?
                                <div>
                                    <button className="btn btn-flat game-choice-btn font2" value="Human" onClick={this.selectRace}>
                                        Human
                                </button>
                                    <button className="btn btn-flat game-choice-btn font2" value="Elf" onClick={this.selectRace}>
                                        Elf
                                </button>
                                    <button className="btn btn-flat game-choice-btn font2" value="Dwarf" onClick={this.selectRace}>
                                        Dwarf
                                </button>
                                </div>
                                : this.state.currentTask === "select class" ?
                                    <div>
                                        <button className="btn btn-flat game-choice-btn font2" value="Warrior" onClick={this.selectClass}>
                                            Warrior
                                </button>
                                        <button className="btn btn-flat game-choice-btn font2" value="Mage" onClick={this.selectClass}>
                                            Mage
                                </button>
                                        <button className="btn btn-flat game-choice-btn font2" value="Rogue" onClick={this.selectClass}>
                                            Rogue
                                </button>
                                    </div>
                                    : null}

                    {this.state.gamePlayStates.isExploring && !this.state.gamePlayStates.isFighting ?
                        <div>
                            <p>Where to next?</p>
                            <button className="btn btn-flat game-choice-btn font2" onClick={this.selectExploreWild}>
                                Explore Wild
                                        </button>
                            <button className="btn btn-flat game-choice-btn font2" onClick={this.selectToTown}>
                                Go to town
                                        </button>
                            <button className="btn btn-flat game-choice-btn font2" onClick={this.selectUseItem}>
                                Use Item
                                        </button>
                        </div>
                        : this.state.gamePlayStates.isInTown ?
                            <div>
                                <p>What next?</p>
                                <button className="btn btn-flat game-choice-btn font2" onClick={this.selectToInn}>
                                    Stay at Inn
                                        </button>
                                <button className="btn btn-flat game-choice-btn font2" onClick={this.selectToTavern}>
                                    Visit Tavern
                                        </button>
                                <button className="btn btn-flat game-choice-btn font2" onClick={this.selectToShop}>
                                    Go to Shop
                                        </button>
                                <button className="btn btn-flat game-choice-btn font2" onClick={this.selectUseItem}>
                                    Use Item
                                        </button>
                                <button className="btn btn-flat game-choice-btn font2" onClick={this.selectToWild}>
                                    <i className="material-icons left">arrow_back</i>Leave Town
                                        </button>
                            </div>
                            : this.state.gamePlayStates.isFighting ?
                                <div>
                                    <p>What next?</p>
                                    <button className="btn btn-flat game-choice-btn font2" onClick={this.selectAttack}>
                                        Attack
                                        </button>
                                    <button className="btn btn-flat game-choice-btn font2 disabled" onClick={this.selectToTavern}>
                                        {this.state.player.special1}
                                    </button>
                                    <button className="btn btn-flat game-choice-btn font2 disabled" onClick={this.selectToShop}>
                                        {this.state.player.special2}
                                    </button>
                                    <button className="btn btn-flat game-choice-btn font2" onClick={this.selectUseItem}>
                                        Use Item
                                        </button>
                                    <button className="btn btn-flat game-choice-btn font2" onClick={this.selectToWild}>
                                        <i className="material-icons left">arrow_back</i>Run
                                        </button>
                                </div>
                                : null}

                </div>

            </div>
        </div>
    );
}
}
export default Game;