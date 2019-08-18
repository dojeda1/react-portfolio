import React, { Component } from "react";
import playerDefault from "./playerDefault.json";
import regions from "./regions.json";
import monsters1 from "./monsters1.json";
import monsters2 from "./monsters2.json";
import monsters3 from "./monsters3.json";
class Game extends Component {

    state = {
        messages: "",
        messageSub: "",
        xpResult: 0,
        goldResult: 0,
        itemResult: [],
        region: regions[0],
        location: "title screen",
        task: "new or load",
        step: null,
        inputName: "",
        player: playerDefault,
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
        }
    }
    componentDidMount() {
        this.setState({ message: "Choose an Option." })
    }
    //Utility Functions
    changePlayStates = (location, task, step) => {
        this.setState({
            location: location,
            task: task,
            step: step
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
        this.setState({ task: "playing game" })
    }
    newGame = () => {
        console.log("Creating New Character.")
        this.setState({
            task: "create character",
            step: "name",
            message: "Hello Adventurer! What is your name?"
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
            // this.setState({
            //     message: "Surely, you must have a name..."
            // });
            this.setState({
                player: {
                    ...this.state.player,
                    name: "Bob"
                },
                message: "What is your race?",
                step: "race"
            });
        } else {
            let newName = this.state.inputName.trim();
            newName = newName.charAt(0).toUpperCase() + newName.slice(1);
            // document.getElementById('game-form').reset();

            this.setState({
                player: {
                    ...this.state.player,
                    name: newName
                },
                message: "What is your race?",
                step: "race"
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
            step: "class",
            message: "What is your class?"
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
        let special1CostA
        let special2CostA
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
                special1CostA = 6
                special2CostA = 8
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
                special1CostA = 6
                special2CostA = 10
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
                special1CostA = 6
                special2CostA = 5
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
                special2: this.state.player.special2 + special2A,
                special1Cost: special1CostA,
                special2Cost: special2CostA
            },
            message: "Your adventure Begins..."
        })
        this.selectToWild();
    }
    //to place functions
    selectToWild = () => {
        this.changePlayStates("wild", "select where", null)
    }
    selectToTown = () => {
        this.changePlayStates("town", "select where", null);
    }
    selectToInn = () => {
        const cost = 10 + (this.state.player.level - 2) * 2;
        if (this.state.player.hp < this.state.player.maxHp || this.state.player.mp < this.state.player.maxMp) {
            this.setState({
                message: "Staying the night will cost " + cost + " gold.",
                messageSub: "Pay for the room?",
            })
            this.changePlayStates("town", "inn", "accept");
        } else {
            this.setState({
                message: "You are already at full Health and Mana."
            })
            this.changePlayStates("town", "select where", null);
        }
    }
    selectSafeTripCheck = () => {
        const safeTripCheck = this.randNum(1, 10 + Math.floor(this.state.player.luck / 3));
        if (safeTripCheck === 1) {
            this.monsterEncounter("You were ambushed!!!");
        } else {
            this.selectToTown();
            this.setState({
                message: "You arrived to town safely."
            })
        }
    }
    selectYesInn = () => {
        const cost = 10 + (this.state.player.level - 2) * 2;
        if (this.state.player.gold >= cost) {
            this.setState({
                player: {
                    ...this.state.player,
                    gold: this.state.player.gold - cost,
                    hp: this.state.player.maxHp,
                    mp: this.state.player.maxMp,
                },
                message: "You feel well rested."
            });
        } else {
            this.setState({
                message: "You can't afford to stay here."
            })
        }
        this.selectToTown();
    }
    selectExploreWild = () => {
        const exploreCheck = this.randNum(1, 10)
        if (exploreCheck === 1) {
            this.chestEncounter();
            // } else if (battleCheck === 2) {            
            //     this.dungeonEncounter();
        } else {
            this.monsterEncounter();
        }
    }
    selectNext = () => {
        this.setState({
            task: "select where",
            step: null
        });
    }
    selectTravelForward = () => {
        this.setState({
            region: regions[this.state.region.index],
            message: "You traveled to the next region."
        })
    }
    selectTravelBackward = () => {
        this.setState({
            region: regions[this.state.region.index - 2],
            message: "You traveled to the previous region."
        })
    }
    //encounters
    monsterEncounter = (alternateMessage) => {

        let rangeNum = 0;
        let playerLevel = this.state.player.level;

        const regionIndex = this.state.region.index;
        console.log("RI:" + regionIndex)
        const regionLevel = this.state.region.level;
        const regionTarget = this.state.region.targetLevel;

        let monsterArray;

        switch (regionIndex) {
            case 1:
                monsterArray = monsters1;
                console.log("Case 1");
                break;
            case 2:
                monsterArray = monsters2;
                console.log("Case 2");
                break;
            case 3:
                monsterArray = monsters3;
                console.log("Case 3");
                break;

            default:
            // code block
        };
        console.log(monsterArray)
        if (playerLevel <= regionLevel) {
            rangeNum = 1;
            console.log("A:" + rangeNum);

        } else if (playerLevel > regionLevel && playerLevel < regionTarget) {
            rangeNum = Math.ceil(monsterArray.length * (playerLevel / regionTarget));
            console.log("B:" + rangeNum);

        } else {
            rangeNum = monsterArray.length;
            console.log("C:" + rangeNum);

        };
        let monNum = this.randNum(0, rangeNum);
        const message = alternateMessage || "You encountered " + this.aOrAn(monsterArray[monNum].name) + " " + monsterArray[monNum].name + ".";

        this.setState({
            currentEnemy: {
                ...this.state.currentEnemy,
                name: monsterArray[monNum].name,
                type: monsterArray[monNum].type,
                maxHp: monsterArray[monNum].maxHp,
                hp: monsterArray[monNum].maxHp,
                maxMp: monsterArray[monNum].maxMp,
                mp: monsterArray[monNum].maxMp,
                strength: monsterArray[monNum].strength,
                xp: monsterArray[monNum].xp,
                inventory: monsterArray[monNum].inventory,
                gold: monsterArray[monNum].gold,
                isDead: false
            },
            task: "fight",
            step: "select move",
            message: message
        });
    };
    chestEncounter = () => {
        this.setState({
            task: "chest",
            step: "accept",
            message: "You found a chest!"
        })
    }
    mimicEncounter = () => {
        const regionLevel = this.state.region.level;
        this.setState({
            currentEnemy: {
                ...this.state.currentEnemy,
                name: "Mimic",
                type: "mimic",
                maxHp: (regionLevel * 5) + 20,
                hp: (regionLevel * 5) + 20,
                maxMp: 10,
                mp: 10,
                strength: regionLevel * 2 + 2,
                xp: regionLevel * 5 + 5,
                inventory: [],
                gold: 60,
                isDead: false
            },
            task: "fight",
            step: "select move",
            message: "You were tricked by a Mimic!"
        });
    }
    selectYesChest = () => {
        const player = this.state.player;
        const openCheck = this.randNum(1, 5);
        if (openCheck !== 1) {
            const goldNum = this.randNum(10, 30);
            player.gold += goldNum;
            player.totalGold += goldNum;
            this.setState({
                step: "results",
                message: "You opened it!",
                goldResult: goldNum
            });
            // for (i = 0; i < 2; i++) {
            //     var itemNum = randNum(0, chestInventory.length)
            //     var item = chestInventory[itemNum];
            //     player.inventory.push(chestInventory[itemNum]);
            //     removeItem(item, chestInventory);


            //     var anA = aOrAn(item)

            //     console.log("You got " + anA + " " + item + ".");

            // }

        } else {
            this.mimicEncounter();
        }
    }
    // Combat Functions
    selectAttack = () => {
        this.attack(this.state.player, this.state.currentEnemy);
        this.enemyDeathCheck(this.state.player, this.state.currentEnemy);
        this.gameOverCheck();
    }
    attack = function (attacker, defender) {
        const luckCheck = defender.speed - attacker.luck;
        const criticalCheck = this.randNum(1, luckCheck);
        if (criticalCheck !== 1) {
            defender.hp -= attacker.strength;
        } else {
            let criticalStrength = attacker.strength + Math.floor(attacker.strength / 2);
            defender.hp -= criticalStrength;
        }
        this.setState({
            defender: {
                ...this.state.defender,
                hp: defender.hp
            },
        });
        // attacker.berserkCheck();
    }
    enemyDeathCheck = (player, enemy) => {
        if (enemy.hp <= 0) {
            player.totalKills++;
            this.setState({
                task: "fight",
                step: "results",
                message: "You killed " + enemy.name + "!"
            });
            this.gainXp(enemy.xp, this.state.player);
            this.dropGold();
            console.log("total kills: " + this.state.player.totalKills);
        } else {
            this.attack(enemy, this.state.player);
        }
    }
    gameOverCheck = () => {
        if (this.state.player.hp <= 0) {
            this.changePlayStates("title screen", "game over")
            this.setState({
                message: "You have died... Game over."
            });
        }
    };
    selectReset = () => {
        this.changePlayStates("title screen", "new or load");
        this.setState({
            player: playerDefault,
            message: "Start again?"
        });
    }
    gainXp = (xpNum, player) => {
        player.xp += xpNum;
        this.setState({
            xpResult: xpNum
        })
        this.levelUpCheck(this.state.player);
    };
    levelUpCheck = (player) => {
        if (player.xp >= player.nextLevel) {
            player.level++;
            player.nextLevel += player.level * 50;
            player.strength += 2;
            player.defense += 1;
            player.speed += 1;
            player.luck += 1;
            player.maxHp += 5;
            player.hp = player.maxHp;
            player.maxMp += 3;
            player.mp = player.maxMp;

            this.setState({
                message: "You are now lv." + this.state.player.level + "!!!"
            });
            console.log("actual level: " + this.state.player.level);
            this.levelUpCheck(this.state.player);
        };
    };
    selectRun = () => {
        const player = this.state.player
        console.log(player.gold)
        const lostGold = this.randNum(0, Math.floor(player.gold / 2));
        console.log(lostGold)
        player.gold -= lostGold;
        const lostHp = this.randNum(0, 3);
        player.hp -= lostHp;
        this.setState({
            message: "You lost " + lostGold + " gold and " + lostHp + " HP."
        });
        this.selectToWild();
        this.gameOverCheck();
    }
    dropGold = () => {
        const amount = this.randNum(0, this.state.currentEnemy.gold);
        this.setState({
            player: {
                ...this.state.player,
                gold: this.state.player.gold + amount,
                totalGold: this.state.player.gold + amount,
            },
            goldResult: amount
        });
    };
    //town functions
    Select
    render() {
        let playerStyle;
        if (this.state.player.hp > 0) {
            playerStyle = "dom-blue-text font1"
        } else {
            playerStyle = "grey-text font1"
        }
        let playerHpStyle;
        if (this.state.player.hp > (this.state.player.maxHp * 0.25)) {
            playerHpStyle = "dom-blue-text"
        } else if (this.state.player.hp > 0) {
            playerHpStyle = "red-text"
        } else {
            playerHpStyle = "grey-text"
        }
        let playerMpStyle;
        if (this.state.player.mp > (this.state.player.maxMp * 0.25)) {
            playerMpStyle = "dom-blue-text"
        } else if (this.state.player.mp > 0) {
            playerMpStyle = "red-text"
        } else {
            playerMpStyle = "grey-text"
        }
        let playerXpStyle;
        if (this.state.player.xp > 0) {
            playerXpStyle = "dom-blue-text"
        } else {
            playerXpStyle = "grey-text"
        }
        let playerGoldStyle;
        if (this.state.player.gold > 10) {
            playerGoldStyle = "dom-blue-text"
        } else if (this.state.player.gold > 0) {
            playerGoldStyle = "red-text"
        } else {
            playerGoldStyle = "grey-text"
        }

        let enemyStyle;
        if (this.state.currentEnemy.hp > 0) {
            enemyStyle = "dom-green2-text font1"
        } else {
            enemyStyle = "grey-text font1"
        }
        let enemyHpStyle;
        if (this.state.currentEnemy.hp > (this.state.currentEnemy.maxMp * 0.25)) {
            enemyHpStyle = "dom-green2-text font1"
        } else if (this.state.currentEnemy.hp > 0) {
            enemyHpStyle = "red-text font1"
        } else {
            enemyHpStyle = "grey-text font1"
        }

        let specialBtnStyle1;
        if (this.state.player.level < 2) {
            specialBtnStyle1 = "hide"
        } else if (this.state.player.mp > this.state.player.special1Cost) {
            specialBtnStyle1 = "btn btn-flat game-choice-btn font2"
        } else {
            specialBtnStyle1 = "btn btn-flat game-choice-btn font2 disabled"
        }

        let specialBtnStyle2;
        if (this.state.player.level < 6) {
            specialBtnStyle2 = "hide"
        } else if (this.state.player.mp > this.state.player.special1Cost) {
            specialBtnStyle2 = "btn btn-flat game-choice-btn font2"
        } else {
            specialBtnStyle2 = "btn btn-flat game-choice-btn font2 disabled"
        }

        return (
            <div className="game-container" >
                <div className="container white-text">
                    <div className="row">
                        <h3 className="font2 center-align">FANTASY RPG</h3>
                        <p className="font1 center-align">- {this.state.region.name} -</p>
                        <p>{this.state.message}</p>
                        {this.state.task === "fight" ?
                            <p className={enemyStyle}><i className="material-icons left">adb</i>{this.state.currentEnemy.name}<span className="white-text"> | </span><span className={enemyHpStyle}>HP: {this.state.currentEnemy.hp}/{this.state.currentEnemy.maxHp}</span><span className="white-text"> | </span>ATK: {this.state.currentEnemy.strength}</p>
                            : null}
                        {this.state.task === "fight" && this.state.step === "results" ?
                            <div>
                                <p>You gained {this.state.xpResult} XP.</p>
                                <p>{this.state.currentEnemy.name} dropped {this.state.goldResult} gold.</p>
                            </div>
                            : this.state.task === "chest" && this.state.step === "results" ?
                                <div>
                                    <p>Chest contained {this.state.goldResult} gold.</p>
                                </div>
                                : this.state.location === "title screen" && this.state.task === "game over" ?
                                    <div>
                                        <p>Monsters Killed: {this.state.player.totalKills}</p>
                                        <p>Gold Collected: {this.state.player.totalGold}</p>
                                        <p>Dungeons Completed: {this.state.player.totalDungeons}</p>
                                    </div>
                                    : null}

                        {this.state.location !== "title screen" ?
                            <div>
                                <p className={playerStyle}>
                                    <i className="material-icons left">person</i>{this.state.player.name}<span className="white-text"> | </span>
                                    <span className={playerHpStyle}>HP: {this.state.player.hp}/{this.state.player.maxHp}</span><span className="white-text"> | </span>
                                    <span className={playerMpStyle}>MP: {this.state.player.mp}/{this.state.player.maxMp}</span><span className="white-text"> | </span>
                                    <span className={playerXpStyle}>XP: {this.state.player.xp}/{this.state.player.nextLevel}</span><span className="white-text"> | </span>
                                    <span className={playerGoldStyle}>${this.state.player.gold}</span>
                                </p>
                            </div>
                            : null}
                        {this.state.location === "title screen" && this.state.task === "new or load" ?
                            <div>
                                <button className="btn btn-flat game-blue-btn font2" type="button" onClick={this.newGame}>
                                    New Game
                                </button>
                                <button className="btn btn-flat game-blue-btn font2 disabled" type="button" onClick={this.loadGame}>
                                    Load Game
                                </button>
                            </div>
                            : this.state.location === "title screen" && this.state.task === "create character" && this.state.step === "name" ?
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
                                                    className="btn btn-flat game-blue-btn font2"
                                                    type="submit" name="action" value="Send">Enter</button>
                                            </div>
                                        </div>
                                    </form>

                                </div>
                                : this.state.location === "title screen" && this.state.task === "create character" && this.state.step === "race" ?
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
                                    : this.state.location === "title screen" && this.state.task === "create character" && this.state.step === "class" ?
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

                        {this.state.location === "wild" && this.state.task === "select where" && this.state.step === null ?
                            <div>
                                <p>Where to next?</p>
                                <button className="btn btn-flat game-choice-btn font2" onClick={this.selectExploreWild}>
                                    Explore Wild
                                        </button>
                                <button className="btn btn-flat game-choice-btn font2" onClick={this.selectSafeTripCheck}>
                                    Go to town
                                        </button>
                                <button className="btn btn-flat game-choice-btn font2" onClick={this.selectUseItem}>
                                    Use Item
                                        </button>
                            </div>
                            : this.state.location === "town" && this.state.task === "select where" && this.state.step === null ?
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
                                : this.state.location === "town" && this.state.task === "inn" && this.state.step === "accept" ?
                                    <div>
                                        <p>{this.state.messageSub}</p>
                                        <button className="btn btn-flat game-blue-btn font2" onClick={this.selectYesInn}>
                                            Yes
                                        </button>
                                        <button className="btn btn-flat game-blue-btn font2" onClick={this.selectToTown}>
                                            No
                                        </button>
                                    </div>
                                    : null}
                        {this.state.location === "wild" && this.state.task === "select where" && this.state.region.index === 1 ?
                            <button className="btn btn-flat game-choice-btn font2" onClick={this.selectTravelForward}>
                                Travel Onward
                            </button>
                            : this.state.location === "wild" && this.state.task === "select where" && this.state.region.index > 1 && this.state.region.index < regions.length ?
                                <div>
                                    <button className="btn btn-flat game-choice-btn font2" onClick={this.selectTravelForward}>
                                        Travel Onward
                                    </button>
                                    <button className="btn btn-flat game-choice-btn font2" onClick={this.selectTravelBackward}>
                                        Head Back
                                    </button>
                                </div>
                                : this.state.location === "wild" && this.state.task === "select where" && this.state.region.index > 1 && this.state.region.index === regions.length ?
                                    <div>
                                        <button className="btn btn-flat game-choice-btn font2" onClick={this.selectTravelBackward}>
                                            Head Back
                                        </button>
                                    </div>
                                    : null}
                        {this.state.task === "fight" && this.state.step === "select move" ?
                            <div>
                                <p>What next?</p>
                                <button className="btn btn-flat game-choice-btn font2" onClick={this.selectAttack}>
                                    Attack
                                        </button>
                                <button className={specialBtnStyle1} onClick={this.selectSpecial1}>
                                    {this.state.player.special1} - {this.state.player.special1Cost} MP
                                </button>
                                <button className={specialBtnStyle2} onClick={this.selectSpecial2}>
                                    {this.state.player.special2} - {this.state.player.special2Cost} MP
                                </button>
                                <button className="btn btn-flat game-choice-btn font2" onClick={this.selectUseItem}>
                                    Use Item
                                        </button>
                                <button className="btn btn-flat game-choice-btn font2" onClick={this.selectRun}>
                                    <i className="material-icons left">arrow_back</i>Run
                                        </button>
                            </div>
                            : this.state.task === "fight" && this.state.step === "results" ?
                                <div>
                                    <button className="btn btn-flat game-blue-btn font2" onClick={this.selectNext}>
                                        Next
                                        </button>
                                </div>
                                : this.state.task === "chest" && this.state.step === "results" ?
                                    <div>
                                        <button className="btn btn-flat game-blue-btn font2" onClick={this.selectNext}>
                                            Next
                                        </button>
                                    </div>
                                    : this.state.task === "chest" && this.state.step === "accept" ?
                                        <div>
                                            <p>Do you wish to open it?</p>
                                            <button className="btn btn-flat game-blue-btn font2" onClick={this.selectYesChest}>
                                                Yes
                                            </button>
                                            <button className="btn btn-flat game-blue-btn font2" onClick={this.selectNext}>
                                                No
                                            </button>
                                        </div>
                                        : this.state.location === "title screen" && this.state.task === "game over" ?
                                            <button className="btn btn-flat game-blue-btn font2" onClick={this.selectReset}>
                                                End
                                        </button>
                                            : null}

                    </div>
                    <button className="btn btn-flat dom-green2-text font2" type="button" onClick={this.handleCheck}>
                        Check stats
                    </button>
                </div>
            </div>
        );
    }
}
export default Game;