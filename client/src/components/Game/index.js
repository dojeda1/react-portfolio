import React, { Component } from "react";
import M from 'materialize-css';
import DLogo from "../../images/D_logo_final.png"
import playerDefault from "./playerDefault.json";
import regions from "./regions.json";

import monsters1 from "./monsters1.json";
import monsters2 from "./monsters2.json";
import monsters3 from "./monsters3.json";

import bosses1 from "./bosses1.json";
import bosses2 from "./bosses2.json";
import bosses3 from "./bosses3.json";
import endBosses from "./endBosses.json";

import items1 from "./items1.json";
import items2 from "./items2.json";
import items3 from "./items3.json";

import quests1 from "./quests1.json";
import quests2 from "./quests2.json";
import quests3 from "./quests3.json";

class Game extends Component {

    state = {
        message: "",
        messageSub: "",
        infoText: [],
        region: regions[0],
        location: "title screen",
        task: "new or load",
        step: null,
        inputName: "",
        movingForward: false,
        player: playerDefault,
        currentEnemy: {},
        quests: [],
        tavernQuests: [],
        merchant: [],
        dungeonCount: 0,
        castleCount: 0,
        meadCount: 0,
        bosses1: bosses1,
        bosses2: bosses2,
        bosses3: bosses3,
        endBosses: endBosses,
        showSave: false,
        showStats: false,
        showQuests: false,
        showQuit: false
    }
    componentDidMount() {
        this.setState({ message: "Choose an Option." });
        M.AutoInit();
    }
    toggleGame = () => {
        this.props.endGame();
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
        return Math.floor(Math.random() * y) + x;
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
        };
    }
    atkText = (attacker, attackMessage) => {
        console.log("atk txt: " + attackMessage)
        let text;
        if (attacker.name === this.state.player.name) {
            console.log("empty mes arr")
            text = [];
        } else {
            console.log("do not empty mes arr")
            text = this.state.infoText;
        };
        text.push(attackMessage);
        let berserkNum = attacker.berserkCount;
        if (berserkNum === 3) {
            attacker.berserkCount = 0;
            attacker.isBerserk = false;
            text.push("Berserk has run out.")
        }
        console.log("atk text: " + text)
        this.setState({
            player: this.state.player,
            currentEnemy: this.state.currentEnemy,
            infoText: text,
        }, () => {
            console.log("after attack A: " + this.state.infoText);
            this.gameOverCheck();
        });
    }
    handleCheck = () => {
        console.log(this.state.player);
        console.log(this.state.currentEnemy);
    }
    hasItem = (inventory, itemName) => {
        let inInventory = false;
        inventory.forEach(element => {
            if (itemName === element.name) {
                inInventory = true;
            };
        });
        return inInventory
    };
    addItem = (array, item) => {
        const newItem = {
            name: item.name,
            order: item.order,
            qty: 1,
            buy: item.buy,
            sell: item.sell,
            info: item.info
        };
        let inInventory = false;
        array.forEach(element => {
            if (newItem.name === element.name) {
                inInventory = true;
                element.qty++
            };
        });
        if (inInventory === false) {
            array.push(newItem);
        }
        function compare(a, b) {
            const orderA = a.order;
            const orderB = b.order;

            let comparison = 0;
            if (orderA > orderB) {
                comparison = 1;
            } else if (orderA < orderB) {
                comparison = -1;
            }
            return comparison;
        }

        array.sort(compare);
        this.setState({
            player: this.state.player,
            currentEnemy: this.state.currentEnemy,
            merchant: this.state.merchant
        }, this.fetchQuestCheck(item.name));
    }
    removeItem = (array, itemName) => {
        array.forEach((element, i) => {
            if (itemName === element.name) {
                element.qty--
            };
            if (element.qty <= 0) {
                console.log("item zeroed out.")
                array.splice(i, 1);
            };
        });
        this.setState({
            player: this.state.player,
            currentEnemy: this.state.currentEnemy,
            merchant: this.state.merchant
        }, this.fetchQuestCheck(itemName));
    };
    transferItem = (fromArr, toArr, item) => {
        var transferItem = {
            name: item.name,
            order: item.order,
            qty: 1,
            buy: item.buy,
            sell: item.sell,
            info: item.info
        }
        this.addItem(toArr, transferItem);
        this.removeItem(fromArr, transferItem.name);
    }
    addQuest = (fromArr, toArr, index) => {
        let newQuest = {};
        newQuest.name = fromArr[index].name;
        newQuest.info = fromArr[index].info;
        newQuest.amount = fromArr[index].amount;
        newQuest.reward = fromArr[index].reward;
        newQuest.type = fromArr[index].type;
        newQuest.task = fromArr[index].task;
        newQuest.count = fromArr[index].count;
        newQuest.goal = fromArr[index].goal;
        newQuest.region = fromArr[index].region;
        newQuest.rarity = fromArr[index].rarity;
        newQuest.itemIndex = fromArr[index].itemIndex;
        newQuest.completed = fromArr[index].completed;
        newQuest.index = index;
        toArr.push(newQuest);
        if (newQuest.type === "fetch") {
            this.fetchQuestCheck(newQuest.task);
        }
    }
    removeQuest = (array, index) => {
        console.log("quest removed.")
        array.splice(index, 1);
    }
    hasRegionQuest = () => {
        let hasQuest = false
        this.state.quests.forEach(quest => {
            if (quest.region === this.state.region.name) {
                hasQuest = true
            }
        })
        return hasQuest
    }
    //Menu Functions
    showSave = () => {
        if (this.state.showSave === false) {
            this.setState({
                showSave: true,
                showStats: false,
                showQuests: false,
                showQuit: false
            })
        } else {
            this.setState({
                showSave: false
            })
        }
    }
    showStats = () => {
        if (this.state.showStats === false) {
            this.setState({
                showSave: false,
                showStats: true,
                showQuests: false,
                showQuit: false
            })
        } else {
            this.setState({
                showStats: false
            })
        }
    }
    showQuests = () => {
        if (this.state.showQuests === false) {
            this.setState({
                showSave: false,
                showStats: false,
                showQuests: true,
                showQuit: false
            })
        } else {
            this.setState({
                showQuests: false
            })
        }
    }
    showQuit = () => {
        if (this.state.showQuit === false) {
            this.setState({
                showSave: false,
                showStats: false,
                showQuests: false,
                showQuit: true
            })
        } else {
            this.setState({
                showQuit: false
            })
        }
    }
    selectExit = () => {
        this.setState({
            showSave: false,
            showStats: false,
            showQuests: false,
            showQuit: false
        })
    }
    //Start Game Functions
    loadGame = () => {
        console.log("Loaded Character.");
        this.setState({ task: "playing game" });
    }
    newGame = () => {
        console.log("Creating New Character.")
        this.setState({
            task: "create character",
            step: "name",
            message: "Hello Adventurer! What is your name?"
        });
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
                    name: "Killgore"
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
        let maxHpA;
        let maxMpA;
        let strengthA;
        let defenseA;
        let manaA;
        let speedA;
        let luckA;
        switch (event.target.value) {

            case "Human":
                maxHpA = 4;
                maxMpA = 4;
                strengthA = 1;
                defenseA = 1;
                manaA = 1;
                speedA = 1;
                luckA = 0;
                break;

            case "Elf":
                maxHpA = 4;
                maxMpA = 6;
                strengthA = 0;
                defenseA = 0;
                manaA = 2;
                speedA = 1;
                luckA = 1;
                break;

            case "Dwarf":
                maxHpA = 6;
                maxMpA = 2;
                strengthA = 2;
                defenseA = 1;
                manaA = 0;
                speedA = 0;
                luckA = 0;
                break;

            default: console.log("error");

        }

        let newPlayer = this.state.player;
        newPlayer.race = event.target.value;
        newPlayer.maxHp = newPlayer.maxHp + maxHpA;
        newPlayer.hp = newPlayer.hp + maxHpA;
        newPlayer.maxMp = newPlayer.maxMp + maxMpA;
        newPlayer.mp = newPlayer.mp + maxMpA;
        newPlayer.strength = newPlayer.strength + strengthA;
        newPlayer.defenseA = newPlayer.defense + defenseA;
        newPlayer.manaA = newPlayer.mana + manaA;
        newPlayer.speed = newPlayer.speed + speedA;
        newPlayer.luck = newPlayer.luck + luckA;

        this.setState({
            player: newPlayer,
            step: "class",
            message: "What is your class?"
        });
    }
    selectClass = (event) => {
        let maxHpA;
        let maxMpA;
        let strengthA;
        let defenseA;
        let manaA;
        let speedA;
        let luckA;
        let special1A
        let special2A
        let special1CostA
        let special2CostA
        switch (event.target.value) {

            case "Warrior":
                maxHpA = 4
                maxMpA = 0
                strengthA = 2
                defenseA = 2
                manaA = 0
                speedA = 0
                luckA = 0
                special1A = "Axe Strike"
                special2A = "Berserk"
                special1CostA = 6
                special2CostA = 8
                break;

            case "Mage":
                maxHpA = 2
                maxMpA = 6
                strengthA = 0
                defenseA = 0
                manaA = 7
                speedA = 0
                luckA = 1
                special1A = "Fireball"
                special2A = "Heal"
                special1CostA = 6
                special2CostA = 10
                break;

            case "Rogue":
                maxHpA = 2
                maxMpA = 2
                strengthA = 1
                defenseA = 0
                manaA = 1
                speedA = 2
                luckA = 2
                special1A = "Dagger Slash"
                special2A = "Steal"
                special1CostA = 6
                special2CostA = 5
                break;

            default: console.log("error");
        }

        let newPlayer = this.state.player;
        newPlayer.class = event.target.value;
        newPlayer.maxHp = newPlayer.maxHp + maxHpA;
        newPlayer.hp = newPlayer.hp + maxHpA;
        newPlayer.maxMp = newPlayer.maxMp + maxMpA;
        newPlayer.mp = newPlayer.mp + maxMpA;
        newPlayer.strength = newPlayer.strength + strengthA;
        newPlayer.defenseA = newPlayer.defense + defenseA;
        newPlayer.manaA = newPlayer.mana + manaA;
        newPlayer.speed = newPlayer.speed + speedA;
        newPlayer.luck = newPlayer.luck + luckA;
        newPlayer.special1 = special1A;
        newPlayer.special2 = special2A;
        newPlayer.special1Cost = special1CostA;
        newPlayer.special2Cost = special2CostA;
        this.levelUpCheck(newPlayer);

        this.setState({
            player: newPlayer,
            message: "Your adventure Begins..."
        })
        this.addItem(this.state.player.inventory, items1[0]);
        // this.addItem(this.state.player.inventory, items3[3]);
        this.selectToWild();
    }
    selectUseItem = () => {
        let useMessage = "Select an item."
        if (!this.state.player.inventory.length) {
            useMessage = "You have no items..."
        }
        this.setState({
            step: "use item",
            subMessage: useMessage
        })
    }
    selectItem = (event) => {
        const index = event.target.getAttribute("data-index");
        const name = event.target.value
        console.log("chosen item: " + name + " " + index)
        if (this.state.task === "fight" || this.state.task === "select where") {
            if (name.includes("Health Potion") && this.state.player.hp >= this.state.player.maxHp) {
                this.setState({
                    message: "You are already at full Health."
                })
            } else if (name.includes("Mana Potion") && this.state.player.mp >= this.state.player.maxMp) {
                this.setState({
                    message: "You are already at full Mana."
                })
            } else {
                this.activateItem(this.state.player, this.state.currentEnemy, name, index);
            }
        }
    }
    buyItem = (event) => {
        const player = this.state.player
        const shop = this.state.merchant
        const index = event.target.getAttribute("data-index");
        const price = event.target.getAttribute("data-price");
        const name = event.target.value;
        if (price <= player.gold) {
            player.gold -= price
            this.transferItem(this.state.merchant, this.state.player.inventory, this.state.merchant[index])
            if (!this.state.merchant.length) {
                this.setState({
                    player: player,
                    merchant: shop,
                    message: "You purchased " + this.aOrAn(name) + " " + name + ".",
                    subMessage: "There is nothing to buy."
                })
            } else {
                this.setState({
                    player: player,
                    merchant: shop,
                    message: "You purchased " + this.aOrAn(name) + " " + name + "."
                })
            }
        } else {
            this.setState({
                message: "You don't have enough gold..."
            })
        }
    }
    sellItem = (event) => {
        const player = this.state.player
        const shop = this.state.merchant
        const index = event.target.getAttribute("data-index");
        const price = event.target.getAttribute("data-price");
        const name = event.target.value;
        player.gold += parseInt(price);
        this.transferItem(this.state.player.inventory, this.state.merchant, this.state.player.inventory[index])
        if (!this.state.player.inventory.length) {
            this.setState({
                player: player,
                merchant: shop,
                message: "You sold " + this.aOrAn(name) + " " + name + ".",
                subMessage: "You have no items..."
            });
        } else {
            this.setState({
                player: player,
                merchant: shop,
                message: "You sold " + this.aOrAn(name) + " " + name + "."
            });
        };
    }
    showItemInfo = (event) => {
        const info = event.target.getAttribute("data-info")
        this.setState({
            subMessage: info
        })
    }
    showItemPrice = (event) => {
        const cost = event.target.getAttribute("data-price")
        let shopWord
        if (this.state.step === "buy") {
            shopWord = "Buy";
        } else if (this.state.step === "sell") {
            shopWord = "Sell";
        }
        this.setState({
            subMessage: shopWord + " for " + cost + " gold."
        })
    }
    showSelectItem = () => {
        this.setState({
            subMessage: "Select an Item."
        })
    }
    activateItem = (user, opponent, name, index) => {
        console.log("item: " + name + " " + index)
        let amount;
        switch (name) {
            case "Health Potion":
                amount = Math.floor(user.maxHp * 0.5);
                user.hp += amount;
                if (user.hp > user.maxHp) {
                    user.hp = user.maxHp
                }
                this.removeItem(user.inventory, user.inventory[index].name);
                if (this.state.task === "fight") {
                    this.atkText(user, user.name + " recovered " + amount + " HP.")
                    if (user.name === this.state.player.name) {
                        this.setState({
                            user: user,
                        }, () => this.enemyTurn(this.state.player, this.state.currentEnemy));
                    }
                } else {
                    this.setState({
                        user: user,
                        message: user.name + " recovered " + amount + " HP."
                    });
                }
                break;

            case "Greater Health Potion":
                amount = Math.floor(user.maxHp * 0.75);
                user.hp += amount;
                if (user.hp > user.maxHp) {
                    user.hp = user.maxHp
                }
                this.removeItem(user.inventory, user.inventory[index].name);
                if (this.state.task === "fight") {
                    this.atkText(user, user.name + " recovered " + amount + " HP.")
                    this.setState({
                        user: user,
                    }, () => this.enemyTurn(this.state.player, this.state.currentEnemy));
                } else {
                    this.setState({
                        user: user,
                        message: user.name + " recovered " + amount + " HP."
                    });
                }
                break;

            case "Superior Health Potion":
                amount = user.maxHp;
                user.hp += amount;
                if (user.hp > user.maxHp) {
                    user.hp = user.maxHp
                }
                this.removeItem(user.inventory, user.inventory[index].name);
                if (this.state.task === "fight") {
                    this.atkText(user, user.name + " recovered " + amount + " HP.")
                    this.setState({
                        user: user,
                    }, () => this.enemyTurn(this.state.player, this.state.currentEnemy));
                } else {
                    this.setState({
                        user: user,
                        message: user.name + " recovered " + amount + " HP."
                    });
                }
                break;

            case "Mana Potion":
                amount = Math.floor(user.maxMp * 0.5);
                user.mp += amount;
                if (user.mp > user.maxMp) {
                    user.mp = user.maxMp
                }
                this.removeItem(user.inventory, user.inventory[index].name);
                if (this.state.task === "fight") {
                    this.atkText(user, user.name + " recovered " + amount + " MP.")
                    this.setState({
                        user: user,
                    }, () => this.enemyTurn(this.state.player, this.state.currentEnemy));
                } else {
                    this.setState({
                        user: user,
                        message: user.name + " recovered " + amount + " MP."
                    });
                }
                break;

            case "Greater Mana Potion":
                amount = Math.floor(user.maxMp * 0.75);
                user.mp += amount;
                if (user.mp > user.maxMp) {
                    user.mp = user.maxMp
                }
                this.removeItem(user.inventory, user.inventory[index].name);
                if (this.state.task === "fight") {
                    this.atkText(user, user.name + " recovered " + amount + " MP.")
                    this.setState({
                        user: user,
                    }, () => this.enemyTurn(this.state.player, this.state.currentEnemy));
                } else {
                    this.setState({
                        user: user,
                        message: user.name + " recovered " + amount + " MP."
                    });
                }
                break;

            case "Superior Mana Potion":
                amount = user.maxMp;
                user.mp += amount;
                if (user.mp > user.maxMp) {
                    user.mp = user.maxMp
                }
                this.removeItem(user.inventory, user.inventory[index].name);
                if (this.state.task === "fight") {
                    this.atkText(user, user.name + " recovered " + amount + " MP.")
                    this.setState({
                        user: user,
                    }, () => this.enemyTurn(this.state.player, this.state.currentEnemy));
                } else {
                    this.setState({
                        user: user,
                        message: user.name + " recovered " + amount + " MP."
                    });
                }
                break;

            case "Old Hat":
                this.setState({
                    message: "It looks good on you..."
                })
                break;

            case "Death Scroll":
                if (this.state.task === "fight") {
                    opponent.hp = 0;
                    this.removeItem(user.inventory, user.inventory[index].name);
                    this.atkText(user, user.name + " read from the Death Scroll.")
                    this.setState({
                        user: user,
                    }, () => this.enemyTurn(this.state.player, this.state.currentEnemy));
                } else {
                    this.setState({
                        user: user,
                        message: "Death Scroll can only be used in battle."
                    });
                }
                break;

            default:
                // Nothing
                this.setState({
                    message: "SOMETHING WENT WRONG"
                })
        }
    }
    //to place functions
    selectToWild = () => {
        this.changePlayStates("wild", "select where", null)
    }
    goToTown = () => {
        // give shop random set of items each town visit

        let player = this.state.player;
        player.isBerserk = false;
        let randItem;
        let randQuest;
        let merchant = [];
        let questArr;
        let tavernQuests = [];
        for (let i = 0; i < 4; i++) {
            randItem = this.randNum(0, items1.length);
            this.addItem(merchant, items1[randItem]);
        }
        for (let i = 0; i < 2; i++) {
            randItem = this.randNum(0, items2.length);
            this.addItem(merchant, items2[randItem]);
        }
        for (let i = 0; i < 1; i++) {
            randItem = this.randNum(0, items3.length);
            this.addItem(merchant, items3[randItem]);
        }
        switch (this.state.region.index) {
            case 1:
                questArr = quests1
                break;
            case 2:
                questArr = quests2
                break;
            case 3:
                questArr = quests3
                break;
            default:
            // code block

        }
        for (let i = 0; i < 3; i++) {
            randQuest = this.randNum(0, questArr.length);
            this.addQuest(questArr, tavernQuests, randQuest)
        }

        this.setState({
            player: player,
            location: "town",
            task: "select where",
            step: null,
            meadCount: 0,
            merchant: merchant,
            tavernQuests: tavernQuests
        })
    }
    selectToInn = () => {
        const cost = 10 + (this.state.player.level - 2) * 2;
        if (this.state.player.hp < this.state.player.maxHp || this.state.player.mp < this.state.player.maxMp) {
            this.setState({
                message: "Staying the night will cost " + cost + " gold.",
                messageSub: "Pay for the room?",
            }, () => this.changePlayStates("town", "inn", "accept"))
        } else {
            this.setState({
                message: "You are already at full Health and Mana."
            }, () => this.changePlayStates("town", "select where", null))
        }
    }
    selectToTown = () => {
        const eventCheck = this.randNum(1, 10);
        if (eventCheck === 1) {
            this.monsterEncounter("You were ambushed!!!");
        } else {
            this.setState({
                message: "You arrived to town safely."
            }, () => this.goToTown())
        }
    }
    selectYesInn = () => {
        const cost = 10 + (this.state.player.level - 2) * 2;
        if (this.state.player.gold >= cost) {
            let player = this.state.player;
            player.gold = player.gold - cost;
            player.hp = player.maxHp;
            player.mp = player.maxMp;
            this.setState({
                player: player,
                message: "You feel well rested.",
                task: "select where",
                step: null
            });
        } else {
            this.setState({
                message: "You can't afford to stay here.",
                task: "select where",
                step: null
            })
        }
    }
    selectNoInn = () => {
        this.setState({
            message: "You decided against it.",
            task: "select where",
            step: null
        })
    }
    selectToShop = () => {
        this.setState({
            message: "You entered the shop.",
            task: "shop",
            step: "buy or sell"
        })
    }
    selectBuy = () => {
        let shopMessage = "Select an item."
        if (!this.state.merchant.length) {
            shopMessage = "There is nothing to buy."
        }
        this.setState({
            step: "buy",
            subMessage: shopMessage
        })
    }
    selectSell = () => {
        let shopMessage = "Select an item."
        if (!this.state.merchant.length) {
            shopMessage = "You have no items..."
        }
        this.setState({
            step: "sell",
            subMessage: shopMessage
        })
    }
    selectToTavern = () => {
        this.setState({
            message: "You entered the tavern.",
            task: "tavern",
            step: "select next"
        })
    }
    selectGrabMead = () => {
        this.setState({
            message: "That will be 5 gold.",
            messageSub: "Pay for the Mead?",
            step: "accept mead"
        });
    }
    selectYesMead = () => {
        const cost = 5;
        if (this.state.player.gold >= cost) {
            let player = this.state.player;
            player.gold = player.gold - 5
            player.hp = player.hp + 5;
            if (player.hp > player.maxHp) {
                player.hp = player.maxHp
            }
            player.mp = player.mp + 3;
            if (player.mp > player.maxMp) {
                player.mp = player.maxMp
            }
            let meadNum = this.state.meadCount + 1;

            if (meadNum < 3) {
                this.setState({
                    player: player,
                    message: "It was refreshing.",
                    task: "tavern",
                    step: "select next",
                    meadCount: meadNum
                });
            } else if (meadNum < 4) {
                this.setState({
                    player: player,
                    message: "You are starting to feel drunk...",
                    task: "tavern",
                    step: "select next",
                    meadCount: meadNum
                });
            } else if (meadNum < 5) {
                this.setState({
                    player: player,
                    message: "Maaaysssbe wwuuun meerrrrr...",
                    task: "tavern",
                    step: "select next",
                    meadCount: meadNum
                });
            } else if (meadNum >= 5) {
                player.hp = 3
                player.mp = 0
                this.setState({
                    player: player,
                    message: "You blacked out, waking hours later inside a dungeon.",
                    location: "dungeon",
                    task: "select where",
                    step: null,
                    meadCount: 0,
                    dungeonCount: 0
                });
            }
        } else {
            this.setState({
                message: "You don't have enough gold.",
                task: "tavern",
                step: "select next"
            })
        }
    }
    selectNoMead = () => {
        this.setState({
            message: "You decided against it.",
            task: "tavern",
            step: "select next"
        })
    }
    selectGetQuest = () => {
        this.setState({
            message: "You viewed the Quest board.",
            task: "tavern",
            step: "select quest"
        })
    }
    selectYesQuest = (event) => {
        if (this.state.quests.length < 3) {
            const index = event.target.getAttribute("data-index");
            let quests = this.state.quests
            let tavernQuests = this.state.tavernQuests
            this.addQuest(tavernQuests, quests, index);
            this.removeQuest(tavernQuests, index);
            this.setState({
                quests: quests,
                tavernQuests: tavernQuests,
                message: "You got a new quest!",
                step: "select quest"
            })
        } else {
            this.setState({
                message: "You can only have 3 quests at a time.",
            })
        }
    }
    selectNoQuest = () => {
        this.setState({
            message: "You decided against it.",
            task: "tavern",
            step: "select quest"
        })
    }
    selectCashQuest = () => {
        this.setState({
            message: this.state.region.name + " Quest Rewards.",
            task: "tavern",
            step: "cash quest"
        })
    }
    selectRedeemReward = (event) => {
        let player = this.state.player
        let index = event.target.getAttribute("data-index");
        let type = event.target.getAttribute("data-type");
        let task = event.target.getAttribute("data-task");
        let goal = event.target.getAttribute("data-goal");
        let amount = event.target.getAttribute("data-amount");
        let reward = event.target.getAttribute("data-reward");
        let rarity = event.target.getAttribute("data-rarity");
        let itemIndex = event.target.getAttribute("data-item");
        if (reward === "gold") {
            player.gold += parseInt(amount)
            player.totalGold += parseInt(amount)
            player.totalQuests++
        } else {
            let itemArray = [];
            switch (rarity) {
                case "1":
                    itemArray = items1;
                    break;
                case "2":
                    itemArray = items2;
                    break;
                case "3":
                    itemArray = items3;
                    break;

                default:
                // code block
            }
            console.log("Item Array")
            console.log(itemArray)
            for (let i = 0; i < amount; i++) {
                this.addItem(player.inventory, itemArray[parseInt(itemIndex)]);
            }
            console.log("item reward.")
        }
        if (type === "fetch") {
            for (let i = 0; i < goal; i++) {
                this.removeItem(player.inventory, task)
            }
        }
        this.setState({
            message: "You earned " + amount + " " + reward + ".",
            player: player
        })
        this.removeQuest(this.state.quests, index);
    }
    selectAbandonQuest = (event) => {
        const index = event.target.getAttribute("data-index");
        let questArr = this.state.quests
        this.removeQuest(questArr, index);
        this.setState({
            quests: questArr
        });
    }


    killQuestCheck = (enemyName) => {
        let playerQuests = this.state.quests;
        playerQuests.forEach(quest => {
            if (quest.type === "kill" && !quest.completed) {
                console.log("kill Quest: " + enemyName);
                console.log(enemyName + ":" + quest.task)
                if (enemyName === quest.task) {
                    quest.count++;
                    if (quest.count >= quest.goal) {
                        quest.completed = true
                    }
                    console.log("QC: " + quest.count)
                } else {
                    console.log("not correct enemy.")
                }
            }
        });
        this.setState({
            quests: playerQuests
        })
    }

    fetchQuestCheck = (itemName) => {
        let player = this.state.player;
        let playerQuests = this.state.quests;
        playerQuests.forEach(quest => {
            if (quest.type === "fetch" && itemName === quest.task) {
                let qty = 0;
                console.log("fetch Quest: " + itemName);
                console.log(itemName + ":" + quest.task)
                if (this.hasItem(player.inventory, itemName)) {
                    player.inventory.forEach(item => {
                        if (item.name === itemName) {
                            qty = item.qty;
                            if (qty >= quest.goal) {
                                qty = quest.goal
                                quest.completed = true
                            } else {
                                quest.completed = false
                            }
                        }
                    })
                } else {
                    quest.completed = false;
                }
                quest.count = qty
                console.log("quest count: " + quest.count)
            }
        });
        console.log(playerQuests);
        this.setState({
            quests: playerQuests
        })
    }
    selectExplore = () => {
        const exploreCheck = this.randNum(1, 10)
        if (exploreCheck === 1) {
            this.chestEncounter();
        } else if (exploreCheck === 2) {
            this.dungeonEncounter();
        } else if (exploreCheck === 3) {
            this.viciousEncounter();
        } else {
            this.monsterEncounter();
        }
    }
    selectVentureDeeper = () => {
        const exploreCheck = this.randNum(1, 10)
        if (exploreCheck <= 2) {
            this.chestEncounter();
        } else if (this.state.location === "castle") {
            this.darkEncounter();
        } else {
            this.viciousEncounter();
        }
    }
    selectFightBoss = () => {
        const regionIndex = this.state.region.index;
        let bossArray = [];

        switch (regionIndex) {
            case 1:
                bossArray = this.state.bosses1;
                break;
            case 2:
                bossArray = this.state.bosses2;
                break;
            case 3:
                bossArray = this.state.bosses3;
                break;

            default:
            // code block
        };
        if (bossArray.length) {
            this.bossEncounter();
        } else {
            this.darkEncounter();
        };
    }
    selectEndBoss = () => {
        this.endBossEncounter();
    }
    selectNext = () => {
        if (this.state.movingForward === true) {
            this.setState({
                movingForward: false,
                region: regions[this.state.region.index],
                task: "select where",
                step: null,
                message: "You have reached the " + regions[this.state.region.index].name + "."
            });
        } else if (this.state.task === "chest") {
            this.setState({
                task: "select where",
                step: null,
                message: "You decided against it."
            });
        } else if (this.state.location === "dungeon" && this.state.dungeonCount >= this.state.region.dungeonGoal) {
            this.setState({
                location: "wild",
                task: "select where",
                step: null,
                message: "Dungeon Complete!"
            });
        } else if (this.state.location === "castle" && this.state.castleCount >= this.state.region.dungeonGoal) {
            this.setState({
                location: "wild",
                task: "select where",
                step: null,
                message: "Final Boss Vanquished!"
            });
        } else {
            this.setState({
                task: "select where",
                step: null,
                infoText: []
            });
        }
    }
    selectBack = () => {
        if (this.state.task === "select where") {
            this.setState({
                step: null
            });
        } else if (this.state.task === "fight") {
            this.setState({
                step: "select move"
            });
        } else if (this.state.step === "buy" || this.state.step === "sell") {
            this.setState({
                step: "buy or sell"
            });
        } else if (this.state.task === "shop") {
            this.setState({
                message: "You left the shop.",
                task: "select where",
                step: null
            });
        } else if (this.state.step === "select quest" || this.state.step === "cash quest") {
            this.setState({
                task: "tavern",
                step: "select next"
            });
        } else if (this.state.task === "tavern") {
            this.setState({
                message: "You left the tavern.",
                task: "select where",
                step: null
            });
        } else if (this.state.task === "dungeon") {
            this.setState({
                message: "You left the dungeon behind.",
                task: "select where",
                step: null
            });
        } else if (this.state.task === "castle") {
            this.setState({
                message: "You left the castle behind.",
                task: "select where",
                step: null
            });
        } else if (this.state.task === "forward" || this.state.task === "backward") {
            this.setState({
                message: "You stayed in the " + this.state.region.name + ".",
                task: "select where",
                step: null
            });
        } else {
            this.setState({
                message: "You decided against it.",
                task: "select where",
                step: null
            });
        }
    }
    selectLeaveDungeon = () => {
        this.setState({
            location: "wild",
            message: "You left the dungeon..."
        })
    }
    selectLeaveCastle = () => {
        this.setState({
            location: "wild",
            message: "You left the castle..."
        })
    }
    selectTravelForward = () => {
        this.setState({
            task: "forward",
            step: "accept",
            message: "The path ahead is dangerous..."
        });
    }
    selectYesTravelForward = () => {
        this.travelForward();
    }
    travelForward = () => {
        const endIndex = this.state.region.index - 1;
        console.log(this.state.endBosses[endIndex]);
        console.log("Boss is Dead: " + this.state.endBosses[endIndex].isDead);

        this.setState({
            movingForward: true,
        }, () => {
            if (this.state.endBosses[endIndex].isDead === false) {
                this.endBossEncounter();
            } else {
                this.darkEncounter("As you near the " + regions[this.state.region.index].name + ", you are attacked.");
            }
        });
    }
    travelForwardSuccess = () => {
        this.setState({
            region: regions[this.state.region.index],
            movingForward: false,
        });
    }
    selectTravelBackward = () => {
        this.setState({
            task: "backward",
            step: "accept",
            message: "The see the " + regions[this.state.region.index - 2].name + " behind you..."
        });
    }
    selectYesTravelBackward = () => {
        this.setState({
            region: regions[this.state.region.index - 2],
            message: "You traveled back to the " + regions[this.state.region.index - 2].name + ".",
            task: "select where",
            step: null
        })
    }
    addEnemyItems = (enemy) => {
        let randItem = this.randNum(0, items3.length)
        this.addItem(enemy.inventory, items3[randItem]);
        this.addItem(enemy.inventory, items1[0]);
        this.addItem(enemy.inventory, items1[1]);
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
                break;
            case 2:
                monsterArray = monsters2;
                break;
            case 3:
                monsterArray = monsters3;
                break;

            default:
            // code block
        };
        if (playerLevel <= regionLevel) {
            rangeNum = 1;

        } else if (playerLevel > regionLevel && playerLevel < regionTarget) {
            rangeNum = Math.ceil(monsterArray.length * (playerLevel / regionTarget));
        } else {
            rangeNum = monsterArray.length;
        };
        let monNum = this.randNum(0, rangeNum);
        const message = alternateMessage || "You encountered " + this.aOrAn(monsterArray[monNum].name) + " " + monsterArray[monNum].name + ".";
        console.log("message: " + message)
        var newEnemy = this.state.currentEnemy
        newEnemy.name = monsterArray[monNum].name;
        newEnemy.type = monsterArray[monNum].type;
        newEnemy.maxHp = monsterArray[monNum].maxHp;
        newEnemy.hp = monsterArray[monNum].maxHp;
        newEnemy.maxMp = monsterArray[monNum].maxMp;
        newEnemy.mp = monsterArray[monNum].maxMp;
        newEnemy.strength = monsterArray[monNum].strength;
        newEnemy.defense = monsterArray[monNum].defense;
        newEnemy.speed = monsterArray[monNum].speed;
        newEnemy.luck = monsterArray[monNum].luck;
        newEnemy.xp = monsterArray[monNum].xp;
        newEnemy.inventory = [];
        newEnemy.gold = monsterArray[monNum].gold;
        newEnemy.isDead = false
        this.addEnemyItems(newEnemy);
        let text = [];
        this.setState({
            currentEnemy: newEnemy,
            task: "fight",
            step: "select move",
            message: message,
            infoText: text
        });
        console.log(this.state.currentEnemy);
    };
    bossEncounter = () => {

        let rangeNum = 0;
        let playerLevel = this.state.player.level;

        const regionIndex = this.state.region.index;
        console.log("RI:" + regionIndex)
        const regionLevel = this.state.region.level;
        const regionTarget = this.state.region.targetLevel;

        let monsterArray;

        switch (regionIndex) {
            case 1:
                monsterArray = this.state.bosses1;
                break;
            case 2:
                monsterArray = this.state.bosses2;
                break;
            case 3:
                monsterArray = this.state.bosses3;
                break;

            default:
            // code block
        };
        if (playerLevel <= regionLevel) {
            rangeNum = 1;

        } else if (playerLevel > regionLevel && playerLevel < regionTarget) {
            rangeNum = Math.ceil(monsterArray.length * (playerLevel / regionTarget));
        } else {
            rangeNum = monsterArray.length;
        };
        let monNum = this.randNum(0, rangeNum);
        const message = "You encountered " + monsterArray[monNum].name + ", " + monsterArray[monNum].title + ".";
        console.log("message: " + message)
        var newEnemy = this.state.currentEnemy
        newEnemy.index = monNum;
        newEnemy.name = monsterArray[monNum].name;
        newEnemy.title = monsterArray[monNum].title;
        newEnemy.type = monsterArray[monNum].type;
        newEnemy.maxHp = monsterArray[monNum].maxHp;
        newEnemy.hp = monsterArray[monNum].maxHp;
        newEnemy.maxMp = monsterArray[monNum].maxMp;
        newEnemy.mp = monsterArray[monNum].maxMp;
        newEnemy.strength = monsterArray[monNum].strength;
        newEnemy.defense = monsterArray[monNum].defense;
        newEnemy.speed = monsterArray[monNum].speed;
        newEnemy.luck = monsterArray[monNum].luck;
        newEnemy.xp = monsterArray[monNum].xp;
        newEnemy.inventory = [];
        newEnemy.gold = monsterArray[monNum].gold;
        newEnemy.isDead = false;
        this.addEnemyItems(newEnemy);
        let text = [];
        this.setState({
            currentEnemy: newEnemy,
            task: "fight",
            step: "select move",
            message: message,
            infoText: text
        });
        console.log(this.state.currentEnemy);
    };
    endBossEncounter = () => {
        const bossIndex = this.state.region.index - 1;
        let message = "You face " + endBosses[bossIndex].name + ", " + endBosses[bossIndex].title + ".";
        if (this.state.movingForward === true) {
            message = endBosses[bossIndex].name + ", " + endBosses[bossIndex].title + " blocks your path."
        };
        console.log("message: " + message)
        var newEnemy = this.state.currentEnemy
        newEnemy.index = endBosses[bossIndex].index;
        newEnemy.name = endBosses[bossIndex].name;
        newEnemy.title = endBosses[bossIndex].title;
        newEnemy.type = endBosses[bossIndex].type;
        newEnemy.maxHp = endBosses[bossIndex].maxHp;
        newEnemy.hp = endBosses[bossIndex].maxHp;
        newEnemy.maxMp = endBosses[bossIndex].maxMp;
        newEnemy.mp = endBosses[bossIndex].maxMp;
        newEnemy.strength = endBosses[bossIndex].strength;
        newEnemy.defense = endBosses[bossIndex].defense;
        newEnemy.speed = endBosses[bossIndex].speed;
        newEnemy.luck = endBosses[bossIndex].luck;
        newEnemy.xp = endBosses[bossIndex].xp;
        newEnemy.inventory = [];
        newEnemy.gold = endBosses[bossIndex].gold;
        newEnemy.isDead = false
        this.addEnemyItems(newEnemy);
        let text = [];
        this.setState({
            currentEnemy: newEnemy,
            task: "fight",
            step: "select move",
            message: message,
            infoText: text
        });
        console.log(this.state.currentEnemy);
    };
    viciousEncounter = (alternateMessage) => {

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
                break;
            case 2:
                monsterArray = monsters2;
                break;
            case 3:
                monsterArray = monsters3;
                break;

            default:
            // code block
        };
        if (this.state.movingForward === true) {
            rangeNum = monsterArray.length;
        } else if (playerLevel <= regionLevel) {
            rangeNum = 1;
        } else if (playerLevel > regionLevel && playerLevel < regionTarget) {
            rangeNum = Math.ceil(monsterArray.length * (playerLevel / regionTarget));
        } else {
            rangeNum = monsterArray.length;
        };
        let monNum = this.randNum(0, rangeNum);
        const message = alternateMessage || "You encountered a Vicious " + monsterArray[monNum].name + ".";
        var newEnemy = this.state.currentEnemy
        newEnemy.name = "Vicious " + monsterArray[monNum].name;
        newEnemy.type = "vicious";
        newEnemy.maxHp = monsterArray[monNum].maxHp + 5;
        newEnemy.hp = monsterArray[monNum].maxHp + 5;
        newEnemy.maxMp = monsterArray[monNum].maxMp + 5;
        newEnemy.mp = monsterArray[monNum].maxMp + 5;
        newEnemy.strength = monsterArray[monNum].strength + 3;
        newEnemy.defense = monsterArray[monNum].defense + 3;
        newEnemy.speed = monsterArray[monNum].speed + 2;
        newEnemy.luck = monsterArray[monNum].luck;
        newEnemy.xp = monsterArray[monNum].xp + 10;
        newEnemy.inventory = [];
        newEnemy.gold = monsterArray[monNum].gold + 30;
        newEnemy.isDead = false;
        this.addEnemyItems(newEnemy)
        let text = [];
        this.setState({
            currentEnemy: newEnemy,
            task: "fight",
            step: "select move",
            message: message,
            infoText: text
        });
    };
    darkEncounter = (alternateMessage) => {

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
                break;
            case 2:
                monsterArray = monsters2;
                break;
            case 3:
                monsterArray = monsters3;
                break;

            default:
            // code block
        };
        if (this.state.movingForward === true) {
            rangeNum = monsterArray.length;
        } else if (playerLevel <= regionLevel) {
            rangeNum = 1;
        } else if (playerLevel > regionLevel && playerLevel < regionTarget) {
            rangeNum = Math.ceil(monsterArray.length * (playerLevel / regionTarget));
        } else {
            rangeNum = monsterArray.length;
        };
        let monNum = this.randNum(0, rangeNum);
        let message = "You encountered a Dark " + monsterArray[monNum].name + ".";
        if (this.state.movingForward === true) {
            message = "A Dark " + monsterArray[monNum].name + " blocks your path."
        };
        var newEnemy = this.state.currentEnemy
        newEnemy.name = "Dark " + monsterArray[monNum].name;
        newEnemy.type = "dark";
        newEnemy.maxHp = monsterArray[monNum].maxHp + 10;
        newEnemy.hp = monsterArray[monNum].maxHp + 10;
        newEnemy.maxMp = monsterArray[monNum].maxMp + 10;
        newEnemy.mp = monsterArray[monNum].maxMp + 10;
        newEnemy.strength = monsterArray[monNum].strength + 5;
        newEnemy.defense = monsterArray[monNum].defense + 5;
        newEnemy.speed = monsterArray[monNum].speed + 5;
        newEnemy.luck = monsterArray[monNum].luck + 5;
        newEnemy.xp = monsterArray[monNum].xp + 20;
        newEnemy.inventory = [];
        newEnemy.gold = monsterArray[monNum].gold + 340;
        newEnemy.isDead = false;
        this.addEnemyItems(newEnemy)
        let text = [];
        this.setState({
            currentEnemy: newEnemy,
            task: "fight",
            step: "select move",
            message: message,
            infoText: text
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
        var newEnemy = this.state.currentEnemy
        newEnemy.name = "Mimic"
        newEnemy.type = "mimic";
        newEnemy.maxHp = (regionLevel * 5) + 20;
        newEnemy.hp = (regionLevel * 5) + 20;
        newEnemy.maxMp = 10;
        newEnemy.mp = 10;
        newEnemy.strength = regionLevel * 2 + 2;
        newEnemy.defense = regionLevel * 2;
        newEnemy.speed = regionLevel + 2;
        newEnemy.luck = regionLevel * 2 + 2;
        newEnemy.xp = regionLevel * 5 + 5;
        newEnemy.inventory = [];
        newEnemy.gold = 60 + regionLevel * 5;
        newEnemy.isDead = false
        this.addEnemyItems(newEnemy);
        let text = [];
        this.setState({
            currentEnemy: newEnemy,
            task: "fight",
            step: "select move",
            message: "You were tricked by a Mimic!",
            infoText: text
        });
    }
    selectYesChest = () => {
        const player = this.state.player;
        const openCheck = this.randNum(1, 5);
        if (openCheck !== 1) {
            const goldNum = this.randNum(10, 30);
            player.gold += goldNum;
            player.totalGold += goldNum;

            let text = [];
            text.push("--- RESULTS ---");
            text.push("Chest contained " + goldNum + " gold.");

            for (let i = 0; i < 2; i++) {
                const itemNum = this.randNum(0, items1.length)
                const item = items1[itemNum];
                this.addItem(this.state.player.inventory, item);
                text.push("You got " + this.aOrAn(item.name) + " " + item.name + ".");
            }
            let uncommonCheck = this.randNum(0, 2);
            for (let i = 0; i < uncommonCheck; i++) {
                const itemNum = this.randNum(0, items2.length)
                const item = items2[itemNum];
                this.addItem(this.state.player.inventory, item);
                text.push("You got " + this.aOrAn(item.name) + " " + item.name + ".");
            }
            this.setState({
                step: "results",
                message: "You opened it!",
                infoText: text
            });
        } else {
            this.mimicEncounter();
        }
    }
    dungeonEncounter = () => {
        this.setState({
            task: "dungeon",
            step: "accept",
            message: "You discovered an old dungeon."
        })
    }
    selectYesDungeon = () => {
        this.setState({
            location: "dungeon",
            task: "select where",
            step: null,
            dungeonCount: 0,
            message: "You step into the dungeon."
        })
    }
    selectToCastle = () => {
        this.setState({
            task: "castle",
            step: "accept",
            message: "The Castle emits an evil aura..."
        })
    }
    selectYesCastle = () => {
        this.setState({
            location: "castle",
            task: "select where",
            step: null,
            castleCount: 0,
            message: "You step into the castle."
        })
    }
    // Combat Functions
    selectAttack = () => {
        let player = this.state.player;
        let enemy = this.state.currentEnemy
        this.attack(player, enemy);
        this.enemyTurn(player, enemy);
    }
    enemyTurn = (player, enemy) => {
        setTimeout(() => {
            if (enemy.hp <= 0) {
                let regionIndex = this.state.region.index;
                player.totalKills++;
                let text = this.state.infoText;
                text.push("You killed " + enemy.name + "!")
                text.push("--- RESULTS ---")
                this.setState({
                    task: "fight",
                    step: "results",
                    message: enemy.name + " defeated.",
                    infoText: text
                });
                this.dropGold();
                this.dropLoot(enemy)
                this.gainXp(enemy.xp, player);
                this.killQuestCheck(enemy.name);
                console.log("total kills: " + player.totalKills);
                if (enemy.type === "endBoss") {
                    const endBosses = this.state.endBosses;
                    endBosses[enemy.index].isDead = true;
                    this.setState({
                        endBosses: endBosses
                    });
                } else if (enemy.type === "boss") {
                    let bossArray = [];
                    switch (regionIndex) {
                        case 1:
                            bossArray = this.state.bosses1;
                            break;
                        case 2:
                            bossArray = this.state.bosses2;
                            break;
                        case 3:
                            bossArray = this.state.bosses3;
                            break;

                        default:
                        // code block
                    };
                    bossArray.splice(enemy.index, 1);
                }
                if (this.state.location === "dungeon") {
                    this.setState({
                        dungeonCount: this.state.dungeonCount + 1
                    }, () => {
                        if (this.state.dungeonCount >= this.state.region.dungeonGoal) {
                            player.totalDungeons++
                            this.setState({
                                player: player
                            })
                        }
                    })
                }
                if (this.state.location === "castle") {
                    this.setState({
                        castleCount: this.state.castleCount + 1
                    }, () => {
                        if (this.state.castleCount > this.state.region.dungeonGoal) {
                            player.totalDungeons++
                            this.setState({
                                player: player
                            })
                        }
                    })
                }

                // enemy can use health potion

                // } else if (this.hasItem(enemy.inventory, "Health Potion") && enemy.hp < enemy.maxHp * 0.25) {
                //     let thisIndex;
                //     enemy.inventory.forEach((element, index) => {
                //         if ("Health Potion" === element.name) {
                //             thisIndex = index;
                //         };
                //     });
                //     this.setState({
                //         step: "select move"
                //     }, () => this.activateItem(enemy, player, "Health Potion", thisIndex));

            } else {
                this.setState({
                    step: "select move"
                }, () => this.attack(enemy, player));
            }
        }, 1);
    }
    selectSpecial = (event) => {
        const specialCost = event.target.getAttribute("data-cost");
        const specialName = event.target.value;
        console.log("Special: " + specialName + " " + specialCost);
        if (specialName === "Heal" && this.state.player.hp >= this.state.player.maxHp) {
            this.setState({
                message: "You are already at full health."
            });
        } else if (specialName === "Steal" && !this.state.currentEnemy.inventory.length) {
            this.setState({
                message: "There is nothing to steal."
            });
        } else {
            this.special(this.state.player, this.state.currentEnemy, specialName, specialCost);
            this.enemyTurn(this.state.player, this.state.currentEnemy);
        }
    }

    attack = function (attacker, defender) {
        let berserkNum = 0;
        if (attacker.isBerserk) {
            attacker.berserkCount++
            berserkNum = Math.floor(attacker.strength / 2)
        }

        if (this.isBerserk === true) {
            this.berserkCount++;
            // console.log(this.berserkCount);
            if (this.berserkCount > 2) {
                this.berserkCount = 0;
                this.isBerserk = false;
                this.strength = this.berserkAtkHold
                console.log(" - Berserk has run out. - \n")
            }
        }

        console.log(attacker.name + " attacked " + defender.name)
        let attackMessage;
        let damage = 0;
        let defense = Math.floor(defender.defense / 3);
        let criticalCheck = this.randNum(1, 100);
        let missCheck = this.randNum(1, 100);
        let luckCheck = (attacker.luck - defender.luck) + 10;
        if (luckCheck > 95) {
            luckCheck = 95;
        } else if (luckCheck < 5) {
            luckCheck = 5;
        }
        let speedCheck = (defender.speed - attacker.speed + 5);
        if (speedCheck > 95) {
            speedCheck = 95;
        } else if (speedCheck < 5) {
            speedCheck = 5;
        }
        console.log("rand/CritCheck: " + criticalCheck + "/" + luckCheck);
        console.log("rand/MissCheck: " + missCheck + "/" + speedCheck);
        if (missCheck < speedCheck) {
            attackMessage = attacker.name + " missed...";
        } else if (criticalCheck >= luckCheck) {
            damage = attacker.strength + berserkNum - defense;
            if (damage < 1) {
                damage = 1;
            }
            attackMessage = attacker.name + " did " + damage + " damage.";
        } else {
            damage = attacker.strength + Math.floor(attacker.strength * 0.25) + berserkNum;
            attackMessage = "Critical hit! " + attacker.name + " did " + damage + " damage.";
        }
        defender.hp -= damage;
        this.atkText(attacker, attackMessage);
        // attacker.berserkCheck();
    }
    special = function (attacker, defender, name, cost) {
        let attackMessage;
        let damage;
        let defense = defender.defense;
        let criticalCheck = this.randNum(1, 100);
        let missCheck = this.randNum(1, 100);
        let luckCheck = (attacker.luck - defender.luck) + 10;
        if (luckCheck > 95) {
            luckCheck = 95;
        } else if (luckCheck < 5) {
            luckCheck = 5;
        };
        let speedCheck = (defender.speed - attacker.speed + 2);
        if (speedCheck > 95) {
            speedCheck = 95;
        } else if (speedCheck < 3) {
            speedCheck = 3;
        };

        switch (name) {
            case "Axe Strike":
                console.log("rand/CritCheck: " + criticalCheck + "/" + luckCheck);
                console.log("rand/MissCheck: " + missCheck + "/" + speedCheck);
                if (missCheck < speedCheck) {
                    attackMessage = "Axe missed...";
                } else if (criticalCheck >= luckCheck) {
                    defense = Math.floor(defense / 4);
                    damage = attacker.strength + Math.floor(attacker.strength * 0.25) - defense;
                    if (damage < 1) {
                        damage = 1
                    }
                    attackMessage = "Axe did " + damage + " damage.";
                } else {
                    damage = attacker.strength + Math.floor(attacker.strength * 0.5);
                    attackMessage = "Critical hit! Axe did " + damage + " damage.";
                }
                defender.hp -= damage;
                attacker.mp -= cost;
                this.atkText(attacker, attackMessage);
                break;

            case "Berserk":
                attacker.mp -= cost;
                attacker.isBerserk = true;
                attacker.berserkCount = 0;
                this.atkText(attacker, attacker.name + " is now Berserk!");
                // attacker.berserkCheck();
                break;

            case "Fireball":
                console.log("rand/CritCheck: " + criticalCheck + "/" + luckCheck);
                console.log("rand/MissCheck: " + missCheck + "/" + speedCheck);
                if (missCheck < speedCheck) {
                    attackMessage = "Fire missed...";
                } else if (criticalCheck >= luckCheck) {
                    defense = Math.floor(defense / 4);
                    damage = attacker.mana + Math.floor(attacker.mana * 0.25) - defense;
                    if (damage < 1) {
                        damage = 1
                    }
                    attackMessage = "Fire did " + damage + " damage.";
                } else {
                    damage = attacker.mana + Math.floor(attacker.mana * 0.5);
                    attackMessage = "Critical hit! Fire did " + damage + " damage.";
                }
                defender.hp -= damage;
                attacker.mp -= cost;
                this.atkText(attacker, attackMessage);

                // attacker.berserkCheck();
                break;

            case "Heal":
                luckCheck = attacker.luck + 8;
                if (luckCheck > 95) {
                    luckCheck = 95;
                } else if (luckCheck < 5) {
                    luckCheck = 5;
                }
                console.log("rand/CritCheck: " + criticalCheck + "/" + luckCheck);
                if (criticalCheck >= luckCheck) {
                    damage = Math.floor(attacker.maxHp * 0.75);
                    attackMessage = attacker.name + " recovered " + damage + " HP.";
                } else {
                    damage = attacker.maxHp;
                    attackMessage = "Wow! " + attacker.name + " recovered max HP.";
                }
                attacker.hp += damage;
                if (attacker.hp > attacker.maxHp) {
                    attacker.hp = attacker.maxHp;
                }
                attacker.mp -= cost;
                this.atkText(attacker, attackMessage);

                // attacker.berserkCheck();
                break;

            case "Dagger Slash":
                console.log("rand/CritCheck: " + criticalCheck + "/" + luckCheck);
                console.log("rand/MissCheck: " + missCheck + "/" + speedCheck);
                if (missCheck < speedCheck) {
                    attackMessage = "Dagger missed...";
                } else if (criticalCheck >= luckCheck) {
                    defense = Math.floor(defense / 4);
                    damage = attacker.strength + Math.floor(attacker.strength * 0.25) - defense;
                    if (damage < 1) {
                        damage = 1
                    }
                    attackMessage = "Dagger did " + damage + " damage.";
                } else {
                    damage = attacker.mana + Math.floor(attacker.strength * 0.5);
                    attackMessage = "Critical hit! Dagger did " + damage + " damage.";
                }
                defender.hp -= damage;
                attacker.mp -= cost;
                this.atkText(attacker, attackMessage);

                // attacker.berserkCheck();
                break;

            case "Steal":
                speedCheck = (attacker.speed - defender.speed) + 60;
                if (speedCheck > 95) {
                    speedCheck = 95;
                } else if (speedCheck < 5) {
                    speedCheck = 5;
                }
                console.log("rand/CritCheck: " + criticalCheck + "/" + speedCheck);
                if (criticalCheck <= speedCheck) {
                    const itemNum = this.randNum(0, defender.inventory.length);
                    const item = defender.inventory[itemNum];
                    this.transferItem(defender.inventory, attacker.inventory, item);
                    this.atkText(attacker, attacker.name + " stole " + this.aOrAn(item.name) + " " + item.name + ".");
                } else {
                    this.atkText(attacker, attacker.name + " failed to steal anything.");
                }

                attacker.mp -= cost;
                // attacker.berserkCheck();
                break;

            default:
            // code block
        };
    }

    gameOverCheck = () => {
        if (this.state.player.hp <= 0) {
            let text = this.state.infoText;
            text.push(this.state.currentEnemy.name + " killed you.");
            text.push("--- RESULTS ---");
            text.push("Monsters Killed: " + this.state.player.totalKills);
            text.push("Gold Collected: " + this.state.player.totalGold);
            text.push("Quests Completed: " + this.state.player.totalQuests);
            text.push("Dungeons Completed: " + this.state.player.totalDungeons);
            this.setState({
                message: "Game over.",
                step: "game over",
                infoText: text
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
        let text = this.state.infoText;
        text.push("You gained " + xpNum + " XP.");
        this.setState({
            player: player,
            xpResult: xpNum,
            infoText: text
        }, () => this.levelUpCheck(this.state.player))
    };
    levelUpCheck = (player) => {
        if (player.xp >= player.nextLevel) {
            player.level++;
            player.nextLevel += player.level * 50;
            player.strength += 2;
            player.defense += 1;
            player.speed += 1;
            player.mana += 2;
            player.luck += 1;
            player.maxHp += 5;
            player.hp = player.maxHp;
            player.maxMp += 2;
            player.mp = player.maxMp;

            let text = this.state.infoText;
            text.push("You are now lv. " + player.level + "!!!");
            if (player.level === 2) {
                text.push("You learned " + player.special1 + "!!!!!");
            } else if (player.level === 6) {
                text.push("You learned " + player.special2 + "!!!!!");
            }

            this.setState({
                player: player,
                infoText: text
            });
            this.levelUpCheck(player);
        };
    };
    selectRun = () => {
        const player = this.state.player
        const lostGold = this.randNum(0, Math.floor(player.gold / 2));
        player.gold -= lostGold;
        const lostHp = this.randNum(0, 3);
        player.hp -= lostHp;
        this.gameOverCheck();
        this.setState({
            task: "select where",
            step: null,
            movingForward: false,
            message: "You lost " + lostGold + " gold and " + lostHp + " HP.",
        });

    }
    dropGold = () => {
        const amount = this.randNum(0, this.state.currentEnemy.gold);
        let text = this.state.infoText;
        text.push(this.state.currentEnemy.name + " dropped " + amount + " gold.")
        let player = this.state.player;
        player.gold = player.gold + amount;
        player.totalGold = player.totalGold + amount;
        this.setState({
            player: player,
            infoText: text,
            goldResult: amount
        });
    };
    dropLoot = (enemy) => {
        if (enemy.name === "Mimic") {
            let text = this.state.infoText;
            enemy.inventory.forEach(item => {
                this.transferItem(enemy.inventory, this.state.player.inventory, item)
                text.push(enemy.name + " dropped " + this.aOrAn(item.name) + " " + item.name + ".");
            });
            this.setState({
                infoText: text
            })
        } else {
            const lootCheck = this.randNum(1, 5);
            if (lootCheck === 1) {
                if (enemy.inventory.length) {
                    const itemNum = this.randNum(0, enemy.inventory.length);
                    const item = enemy.inventory[itemNum];
                    this.transferItem(enemy.inventory, this.state.player.inventory, item)
                    let text = this.state.infoText;
                    text.push(enemy.name + " dropped " + this.aOrAn(item.name) + " " + item.name + ".");
                    this.setState({
                        infoText: text
                    })
                } else {
                    console.log("enemy has no items")
                }
            }
        }
    }
    //town functions
    render() {
        const code = "< / >"
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
        if (this.state.player.hp <= 0) {
            playerMpStyle = "grey-text"
        } else if (this.state.player.mp <= 0) {
            playerMpStyle = "grey-text"
        } else if (this.state.player.mp > 0 && this.state.player.mp < (this.state.player.maxMp * 0.25)) {
            playerMpStyle = "red-text"
        } else {
            playerMpStyle = "dom-blue-text"
        }
        let playerXpStyle;
        if (this.state.player.xp === 0 || this.state.player.hp <= 0) {
            playerXpStyle = "grey-text"
        } else {
            playerXpStyle = "dom-blue-text"
        }
        let playerGoldStyle;
        if (this.state.player.hp <= 0 || this.state.player.gold === 0) {
            playerGoldStyle = "grey-text"
        } else if (this.state.player.gold <= 10 && this.state.player.gold > 0) {
            playerGoldStyle = "red-text"
        } else {
            playerGoldStyle = "dom-blue-text"
        }

        let enemyStyle;
        if (this.state.currentEnemy.hp > 0) {
            enemyStyle = "dom-green1-text font1"
        } else {
            enemyStyle = "grey-text font1"
        }
        let enemyHpStyle;
        if (this.state.currentEnemy.hp > (this.state.currentEnemy.maxMp * 0.25)) {
            enemyHpStyle = "dom-green1-text font1"
        } else if (this.state.currentEnemy.hp > 0) {
            enemyHpStyle = "red-text font1"
        } else {
            enemyHpStyle = "grey-text font1"
        }

        let specialBtnStyle1;
        if (this.state.player.level < 2) {
            specialBtnStyle1 = "hide"
        } else if (this.state.player.mp >= this.state.player.special1Cost) {
            specialBtnStyle1 = ""
        } else {
            specialBtnStyle1 = "disabled-div"
        }

        let specialBtnStyle2;
        if (this.state.player.level < 5) {
            specialBtnStyle2 = "hide"
        } else if (this.state.player.mp >= this.state.player.special2Cost) {
            specialBtnStyle2 = ""
        } else {
            specialBtnStyle2 = "disabled-div"
        }

        return (
            <div>
                {/* <!-- TOP NAVBAR --> */}
                <div id="top-nav-container" className="navbar-fixed">
                    <nav id="top-nav" className="nav-wrapper navbar-fixed grey darken-4">

                        <div className="container">
                            <a href="#!" className="sidenav-trigger left" data-target="side-modal-game">
                                <i className="material-icons">menu</i>
                            </a>

                            <a href="/" className="brand-logo">
                                <img src={DLogo} id="logo-top" className="left valign-wrapper" alt="D Logo" />
                            </a>
                        </div>
                    </nav>
                </div>

                {/* <!-- Modal side navbar --> */}
                <ul id="side-modal-game" className="sidenav center-align font1">
                    <li>
                        <a className="white-text" onClick={this.showSave}>Save</a>
                    </li>
                    <li>
                        <a className="white-text" onClick={this.showQuests}>Quests</a>
                    </li>
                    <li>
                        <a className="white-text" onClick={this.showStats}>Stats</a>
                    </li>
                    <li>
                        <a className="lime-text" onClick={this.showQuit}>{code}</a>
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
                            <a className={this.state.showSave ? "white-text active" : "white-text"} onClick={this.showSave}>Save</a>
                        </li>
                        <li>
                            <a className={this.state.showQuests ? "white-text active" : "white-text"} onClick={this.showQuests}>Quests</a>
                        </li>
                        <li>
                            <a className={this.state.showStats ? "white-text active" : "white-text"} onClick={this.showStats}>Stats</a>
                        </li>
                        <li>
                            <a className={this.state.showQuit ? "grey-text active" : "white-text"} onClick={this.showQuit}>{code}</a>
                        </li>
                    </div>
                </ul>

                <div id="game-container" >
                    <div className="container white-text fade">
                        <div className="row">
                            <h3 className="font2 center-align">FANTASY RPG</h3>

                            {this.state.showSave ?
                                <div>
                                    <p className="font1 center-align">- Save Game -</p>
                                    <p>Do you wish to save?</p>
                                    <button className="btn btn-flat game-blue-btn font2" onClick={this.saveGame}>
                                        Save
                                        </button>
                                    <button className="btn btn-flat game-blue-btn font2" onClick={this.selectExit}>
                                        Back
                                        </button>
                                </div>
                                : this.state.showQuests ?
                                    <div>
                                        <p className="font1 center-align">- Quests -</p>
                                        {this.state.quests.length ? this.state.quests.map((quest, index) => (

                                            <div key={index} className="game-info">
                                                <h5>{quest.name}</h5>
                                                <p>{quest.info}</p>
                                                <p>Region: {quest.region}</p>
                                                <p>Reward: {quest.amount} {quest.reward}</p>
                                                <p className={quest.completed ? "dom-green1-text" : null}>Progress: {quest.count}/{quest.goal}</p>
                                                <br />
                                                <button className="btn btn-flat game-blue-btn font2" data-index={index} onClick={this.selectAbandonQuest}>
                                                    Abandon Quest
                                                    </button>
                                            </div>
                                        )) : <p>You have no quests...</p>}
                                        <button className="btn btn-flat game-blue-btn font2" onClick={this.selectExit}>
                                            <i className="material-icons left">arrow_back</i>Back
                                        </button>
                                    </div>
                                    : this.state.showStats ?
                                        <div>
                                            <p className="font1 center-align">- Player Stats -</p>
                                            <p>{this.state.player.name} | Lv. {this.state.player.level} | {this.state.player.race} | {this.state.player.class} | ${this.state.player.gold}</p>
                                            <p>HP: {this.state.player.hp}/{this.state.player.maxHp} | MP: {this.state.player.mp}/{this.state.player.maxMp} | XP: {this.state.player.xp}/{this.state.player.nextLevel}</p>
                                            <p>ATK: {this.state.player.strength} | DEF: {this.state.player.defense} | MANA: {this.state.player.mana}</p>
                                            <p>SPD: {this.state.player.speed} | LUCK: {this.state.player.luck}</p>
                                            <p className="font1 center-align">- Inventory -</p>
                                            {this.state.player.inventory.length ? this.state.player.inventory.map((item, index) => (
                                                <p key={index}>{item.name} x {item.qty}</p>
                                            )) : <p>You have no items...</p>}
                                            <button className="btn btn-flat game-blue-btn font2" onClick={this.selectExit}>
                                                <i className="material-icons left">arrow_back</i>Back
                                            </button>
                                        </div>
                                        : this.state.showQuit ?
                                            <div>
                                                <p className="font1 center-align">- Quit Game -</p>
                                                <p>Quit Game? All unsaved progress will be lost.</p>
                                                <button className="btn btn-flat game-blue-btn font2" onClick={this.toggleGame.bind(this)}>
                                                    Quit
                                            </button>
                                                <button className="btn btn-flat game-blue-btn font2" onClick={this.selectExit}>
                                                    Back
                                            </button>
                                            </div>
                                            :
                                            <div>
                                                <p className="font1 center-align">- {this.state.region.name} | {this.state.location} -</p>
                                                <h5>{this.state.message}</h5>
                                                {this.state.task === "fight" ?
                                                    <p className={enemyStyle}><i className="material-icons left">adb</i>{this.state.currentEnemy.name}<span className="white-text"> | </span><span className={enemyHpStyle}>HP: {this.state.currentEnemy.hp}/{this.state.currentEnemy.maxHp}</span><span className="white-text"> | </span>ATK: {this.state.currentEnemy.strength} <span className="white-text"> | </span>DEF: {this.state.currentEnemy.defense}</p>
                                                    : null}
                                                {this.state.location !== "title screen" ?
                                                    <div>
                                                        <p className={playerStyle}>
                                                            <i className="material-icons left">person</i>{this.state.player.name}<span className="white-text"> | </span>
                                                            <span className={playerHpStyle}>HP: {this.state.player.hp}/{this.state.player.maxHp}</span><span className="white-text"> | </span>
                                                            <span className={playerMpStyle}>MP: {this.state.player.mp}/{this.state.player.maxMp}</span><span className="white-text"> | </span>
                                                            <span className={playerXpStyle}>XP: {this.state.player.xp}/{this.state.player.nextLevel}</span><span className="white-text"> | </span>
                                                            <span className={playerGoldStyle}>${this.state.player.gold}</span>
                                                            {this.state.player.isBerserk ? <span><span className="white-text"> - </span>Berserk</span> : null}
                                                        </p>
                                                    </div>
                                                    : null}
                                                {this.state.task === "fight" || this.state.task === "chest" && this.state.step === "results" || this.state.step === "game over" ?
                                                    <div className="game-info">
                                                        {this.state.infoText.map((text, index) => (
                                                            <p key={index}>{text}</p>
                                                        ))}
                                                    </div>
                                                    : null}
                                                {this.state.location === "title screen" && this.state.task === "new or load" ?
                                                    <div>
                                                        <button className="btn btn-flat game-blue-btn font2" type="button" onClick={this.newGame}>
                                                            New Game
                                    </button>
                                                        {/* <button className="btn btn-flat game-blue-btn font2" type="button" onClick={this.loadGame}>
                                        Load Game
                                    </button> */}
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
                                                        <button className="btn btn-flat game-choice-btn font2" onClick={this.selectExplore}>
                                                            Explore
                                            </button>
                                                        <button className="btn btn-flat game-choice-btn font2" onClick={this.selectToTown}>
                                                            Go to town
                                            </button>
                                                        <button className="btn btn-flat game-choice-btn font2" onClick={this.selectUseItem}>
                                                            Use Item
                                            </button>
                                                    </div>
                                                    : this.state.location === "dungeon" && this.state.task === "select where" && this.state.step === null ?
                                                        <div>
                                                            <p>What next?</p>
                                                            {this.state.dungeonCount < this.state.region.dungeonGoal - 1 ?
                                                                <button className="btn btn-flat game-choice-btn font2" onClick={this.selectVentureDeeper}>
                                                                    Venture Deeper
                                                            </button>
                                                                : <button className="btn btn-flat game-choice-btn font2" onClick={this.selectFightBoss}>
                                                                    Fight Boss
                                                            </button>
                                                            }

                                                            <button className="btn btn-flat game-choice-btn font2" onClick={this.selectUseItem}>
                                                                Use Item
                                                            </button>
                                                            <button className="btn btn-flat game-choice-btn font2" onClick={this.selectLeaveDungeon}>
                                                                <i className="material-icons left">arrow_back</i>Leave Dungeon
                                                            </button>
                                                        </div>
                                                        : this.state.location === "castle" && this.state.task === "select where" && this.state.step === null ?
                                                            <div>
                                                                <p>What next?</p>
                                                                {this.state.castleCount < this.state.region.dungeonGoal - 1 ?
                                                                    <button className="btn btn-flat game-choice-btn font2" onClick={this.selectVentureDeeper}>
                                                                        Venture Deeper
                                                                </button>
                                                                    : <button className="btn btn-flat game-choice-btn font2" onClick={this.selectEndBoss}>
                                                                        Fight Boss
                                                                </button>
                                                                }
                                                                <button className="btn btn-flat game-choice-btn font2" onClick={this.selectUseItem}>
                                                                    Use Item
                                                                </button>
                                                                <button className="btn btn-flat game-choice-btn font2" onClick={this.selectLeaveCastle}>
                                                                    <i className="material-icons left">arrow_back</i>Leave Castle
                                                                </button>
                                                            </div>
                                                            : this.state.step === "use item" ?
                                                                <div>
                                                                    <p>{this.state.subMessage}</p>
                                                                    {this.state.player.inventory.map((item, index) => (
                                                                        <div key={index}>
                                                                            <button value={item.name} data-index={index} data-info={item.info} className="btn btn-flat game-item-btn font2" onMouseOver={this.showItemInfo} onMouseOut={this.showSelectItem} onClick={this.selectItem}>
                                                                                {item.name}
                                                                            </button>
                                                                            <span className="font1 fontSmall"> x {item.qty}</span>
                                                                        </div>
                                                                    ))}
                                                                    <button className="btn btn-flat game-choice-btn font2" onClick={this.selectBack}>
                                                                        <i className="material-icons left">arrow_back</i>Back
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
                                                                            <button className="btn btn-flat game-blue-btn font2" onClick={this.selectNoInn}>
                                                                                No
                                                                    </button>
                                                                        </div>
                                                                        : this.state.location === "town" && this.state.task === "tavern" && this.state.step === "select next" ?
                                                                            <div>
                                                                                <p>What next?</p>
                                                                                <button className="btn btn-flat game-choice-btn font2" onClick={this.selectGrabMead}>
                                                                                    Grab a Mead
                                                                        </button>
                                                                                <button className="btn btn-flat game-choice-btn font2" onClick={this.selectGetQuest}>
                                                                                    Quest Board
                                                                        </button>
                                                                                <button className="btn btn-flat game-choice-btn font2" onClick={this.selectCashQuest}>
                                                                                    Rewards
                                                                        </button>

                                                                                {/* <button className="btn btn-flat game-choice-btn font2" onClick={this.selectPlayGame}>
                                                            Play Game
                                                        </button> */}
                                                                                <button className="btn btn-flat game-choice-btn font2" onClick={this.selectUseItem}>
                                                                                    Use Item
                                                                        </button>
                                                                                <button className="btn btn-flat game-choice-btn font2" onClick={this.selectBack}>
                                                                                    <i className="material-icons left">arrow_back</i>Leave Tavern
                                                                        </button>
                                                                            </div>
                                                                            : this.state.task === "tavern" && this.state.step === "accept mead" ?
                                                                                <div>
                                                                                    <p>{this.state.messageSub}</p>
                                                                                    <button className="btn btn-flat game-blue-btn font2" onClick={this.selectYesMead}>
                                                                                        Yes
                                                                            </button>
                                                                                    <button className="btn btn-flat game-blue-btn font2" onClick={this.selectNoMead}>
                                                                                        No
                                                                            </button>
                                                                                </div>
                                                                                : this.state.task === "tavern" && this.state.step === "select quest" ?
                                                                                    <div>
                                                                                        {this.state.tavernQuests.length ?
                                                                                            <div>
                                                                                                <p>Which quest intrigues you?</p>
                                                                                                {this.state.tavernQuests.map((quest, index) => (
                                                                                                    <div key={index} className="game-info">
                                                                                                        <h5>{quest.name}</h5>
                                                                                                        <p>{quest.info}</p>
                                                                                                        <p>Region: {quest.region}</p>
                                                                                                        <p>Reward: {quest.amount} {quest.reward}</p>
                                                                                                        <button className="btn btn-flat game-blue-btn font2" data-index={index} onClick={this.selectYesQuest}>
                                                                                                            Accept Quest
                                                                                                </button>
                                                                                                    </div>
                                                                                                ))}
                                                                                            </div>
                                                                                            : <p>Board is currently empty.</p>}
                                                                                        <button className="btn btn-flat game-choice-btn font2" onClick={this.selectBack}>
                                                                                            <i className="material-icons left">arrow_back</i>Back
                                                                                </button>
                                                                                    </div>
                                                                                    : this.state.task === "tavern" && this.state.step === "cash quest" ?
                                                                                        <div>
                                                                                            {!this.state.quests.length ?
                                                                                                <p>You currently have no quests.</p>
                                                                                                : this.hasRegionQuest() ?
                                                                                                    <div>
                                                                                                        <p>Cash in which quest?</p>
                                                                                                        {this.state.quests.map((quest, index) => (
                                                                                                            <div key={index}>
                                                                                                                {quest.region === this.state.region.name ?
                                                                                                                    <div className={quest.completed && quest.region === this.state.region.name ?
                                                                                                                        null
                                                                                                                        : "disabled-div"}>
                                                                                                                        <button
                                                                                                                            data-index={index}
                                                                                                                            data-type={quest.type}
                                                                                                                            data-task={quest.task}
                                                                                                                            data-goal={quest.goal}
                                                                                                                            data-amount={quest.amount}
                                                                                                                            data-reward={quest.reward}
                                                                                                                            data-rarity={quest.rarity}
                                                                                                                            data-item={quest.itemIndex}
                                                                                                                            className="btn btn-flat game-item-btn font2"
                                                                                                                            onClick={this.selectRedeemReward}>
                                                                                                                            {quest.amount} {quest.reward} | {quest.name}
                                                                                                                        </button>
                                                                                                                        <span className="font1 fontSmall"> - {quest.count}/{quest.goal}</span>
                                                                                                                    </div>
                                                                                                                    : null}
                                                                                                            </div>
                                                                                                        ))}
                                                                                                    </div>
                                                                                                    : <p>You currently have no quests for this region.</p>}
                                                                                            <button className="btn btn-flat game-choice-btn font2" onClick={this.selectBack}>
                                                                                                <i className="material-icons left">arrow_back</i>Back
                                                                                </button>
                                                                                        </div>
                                                                                        : null}

                                                {this.state.location === "wild" && this.state.task === "select where" && this.state.step === null && this.state.region.index !== 1 ?
                                                    <button className="btn btn-flat game-travel-btn font2" onClick={this.selectTravelBackward}>
                                                        <i className="material-icons left">arrow_back</i>To {regions[this.state.region.index - 2].name}
                                                    </button>
                                                    : null}
                                                {this.state.location === "wild" && this.state.task === "select where" && this.state.step === null && this.state.region.index < regions.length ?
                                                    <button className="btn btn-flat game-travel-btn font2" onClick={this.selectTravelForward}>
                                                        <i className="material-icons right">arrow_forward</i>To {regions[this.state.region.index].name}
                                                    </button>
                                                    : this.state.location === "wild" && this.state.task === "select where" && this.state.step === null && this.state.region.index === regions.length ?
                                                        <button className="btn btn-flat game-travel-btn font2" onClick={this.selectToCastle}>
                                                            <i className="material-icons right">arrow_forward</i>To Dark Castle
                                                        </button>
                                                        : null}
                                                {this.state.task === "fight" && this.state.step === "select move" ?
                                                    <div>
                                                        <p>What next?</p>
                                                        <button className="btn btn-flat game-choice-btn font2" onClick={this.selectAttack}>
                                                            Attack
                                    </button>
                                                        <div className={specialBtnStyle1}>
                                                            <button className="btn btn-flat game-item-btn font2" value={this.state.player.special1} data-cost={this.state.player.special1Cost} onClick={this.selectSpecial}>
                                                                {this.state.player.special1}
                                                            </button>
                                                            <span className="font1 fontSmall"> - {this.state.player.special1Cost} MP</span>
                                                        </div>
                                                        <div className={specialBtnStyle2}>
                                                            <button className="btn btn-flat game-item-btn font2" value={this.state.player.special2} data-cost={this.state.player.special2Cost} onClick={this.selectSpecial}>
                                                                {this.state.player.special2}
                                                            </button>
                                                            <span className="font1 fontSmall"> - {this.state.player.special2Cost} MP</span>
                                                        </div>
                                                        {/* <button className={specialBtnStyle2} value={this.state.player.special2} data-cost={this.state.player.special2Cost} onClick={this.selectSpecial}>
                                        {this.state.player.special2}<span className="font1 fontSmall"> - {this.state.player.special2Cost} MP</span>
                                    </button> */}
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
                                                                : this.state.step === "game over" ?
                                                                    <button className="btn btn-flat game-blue-btn font2" onClick={this.selectReset}>
                                                                        End
                                            </button>
                                                                    : this.state.task === "dungeon" && this.state.step === "accept" ?
                                                                        <div>
                                                                            <p>Do you dare to enter?</p>
                                                                            <button className="btn btn-flat game-blue-btn font2" onClick={this.selectYesDungeon}>
                                                                                Yes
                                                                            </button>
                                                                            <button className="btn btn-flat game-blue-btn font2" onClick={this.selectBack}>
                                                                                No
                                                                            </button>
                                                                        </div>
                                                                        : this.state.task === "forward" && this.state.step === "accept" ?
                                                                            <div>
                                                                                <p>Continue forward?</p>
                                                                                <button className="btn btn-flat game-blue-btn font2" onClick={this.selectYesTravelForward}>
                                                                                    Yes
                                                                                </button>
                                                                                <button className="btn btn-flat game-blue-btn font2" onClick={this.selectBack}>
                                                                                    No
                                                                                </button>
                                                                            </div>
                                                                            : this.state.task === "backward" && this.state.step === "accept" ?
                                                                                <div>
                                                                                    <p>Head back?</p>
                                                                                    <button className="btn btn-flat game-blue-btn font2" onClick={this.selectYesTravelBackward}>
                                                                                        Yes
                                                                                </button>
                                                                                    <button className="btn btn-flat game-blue-btn font2" onClick={this.selectBack}>
                                                                                        No
                                                                                </button>
                                                                                </div>
                                                                                : this.state.task === "castle" && this.state.step === "accept" ?
                                                                                    <div>
                                                                                        <p>Do you dare to enter?</p>
                                                                                        <button className="btn btn-flat game-blue-btn font2" onClick={this.selectYesCastle}>
                                                                                            Yes
                                                                                </button>
                                                                                        <button className="btn btn-flat game-blue-btn font2" onClick={this.selectBack}>
                                                                                            No
                                                                                </button>
                                                                                    </div>
                                                                                    : this.state.step === "game over" ?
                                                                                        <button className="btn btn-flat game-blue-btn font2" onClick={this.selectReset}>
                                                                                            End
                                                                                </button>
                                                                                        : null}
                                                {this.state.task === "shop" && this.state.step === "buy or sell" ?
                                                    <div>
                                                        <p>What next?</p>
                                                        <button className="btn btn-flat game-choice-btn font2" onClick={this.selectBuy}>
                                                            Buy
                                            </button>
                                                        <button className="btn btn-flat game-choice-btn font2" onClick={this.selectSell}>
                                                            Sell
                                            </button>
                                                        <button className="btn btn-flat game-choice-btn font2" onClick={this.selectBack}>
                                                            <i className="material-icons left">arrow_back</i>Back
                                            </button>
                                                    </div>
                                                    : this.state.task === "shop" && this.state.step === "buy" ?
                                                        <div>
                                                            <p>{this.state.subMessage}</p>
                                                            {this.state.merchant.map((item, index) => (
                                                                <div key={index}>
                                                                    <button value={item.name} data-index={index} data-price={item.buy} className="btn btn-flat game-item-btn font2" onMouseOver={this.showItemPrice} onMouseOut={this.showSelectItem} onClick={this.buyItem}>
                                                                        {item.name}
                                                                    </button>
                                                                    <span className="font1 fontSmall"> ${item.buy} x {item.qty}</span>
                                                                </div>
                                                            ))}
                                                            <button className="btn btn-flat game-choice-btn font2" onClick={this.selectBack}>
                                                                <i className="material-icons left">arrow_back</i>Back
                                        </button>
                                                        </div>
                                                        : this.state.task === "shop" && this.state.step === "sell" ?
                                                            <div>
                                                                <p>{this.state.subMessage}</p>
                                                                {this.state.player.inventory.map((item, index) => (
                                                                    <div key={index}>
                                                                        <button value={item.name} data-index={index} data-price={item.sell} className="btn btn-flat game-item-btn font2" onMouseOver={this.showItemPrice} onMouseOut={this.showSelectItem} onClick={this.sellItem}>
                                                                            {item.name}
                                                                        </button>
                                                                        <span className="font1 fontSmall"> ${item.sell} x {item.qty}</span>
                                                                    </div>
                                                                ))}
                                                                <button className="btn btn-flat game-choice-btn font2" onClick={this.selectBack}>
                                                                    <i className="material-icons left">arrow_back</i>Back
                                        </button>
                                                            </div>
                                                            : null}
                                            </div>}
                        </div>
                    </div>
                    <div className="spacer" />
                </div>
            </div>
        );
    }
}
export default Game;