import { TextStyle, Text, Container } from "../libs/pixi.mjs";

export default class Menu {
  constructor(app, worldContainer, game) {
    this.worldContainer = worldContainer;
    this.app = app;
    this.game = game;

    this.style = new TextStyle({
      fontFamily: "Impact",
      fontSize: 50,
      fill: [0xffffff, 0xdd0000],
      stroke: 0x000000,
      strokeThickness: 5,
      letterSpacing: 30,
    });

    this.style1 = new TextStyle({
      fontFamily: "Impact",
      fontSize: 50,
      fill: [0x111111, 0xff0000],
      stroke: 0xaaaaaa,
      strokeThickness: 5,
      letterSpacing: 30,
    });

    this.newGameText = new Text("New Game", this.style);
    this.continueText = new Text("Continue", this.style);
  }

  handleKeyDown(e) {
    if (e.code === "Escape") {
      this.showMenu();
      this.game.pauseGame();
    }
  }

  createMenu() {
    document.addEventListener("keydown", (e) => this.handleKeyDown(e));

    const newGame = () => {
      this.newGameText._style = this.style1;
      this.continueText._style = this.style;
      setTimeout(() => {
        this.game.restartGame();
      }, 500);
    };
    const continueGame = () => {
      this.continueText._style = this.style1;
      this.newGameText._style = this.style;
      setTimeout(() => {
        this.game.continueGame();
      }, 500);
    };

    this.newGameText.x = this.app.screen.width / 2 - this.newGameText.width / 2;
    this.newGameText.y =
      this.app.screen.height / 2 - this.newGameText.height / 2;
    this.continueText.x =
      this.app.screen.width / 2 - this.continueText.width / 2;
    this.continueText.y =
      this.app.screen.height / 2 +
      this.continueText.height +
      20 -
      this.continueText.height / 2;

    this.newGameText.eventMode = "dynamic";
    this.continueText.eventMode = "dynamic";
    this.newGameText.on("pointerdown", newGame);
    this.continueText.on("pointerdown", continueGame);

    this.worldContainer.foreground.addChild(this.newGameText);
    this.worldContainer.foreground.addChild(this.continueText);
    setTimeout(() => {
      this.hideMenu();
    }, 500);
    setTimeout(() => {
      this.showMenu();
    }, 1000);
  }

  hideMenu() {
    this.continueText.alpha = 0.5;
    this.newGameText.alpha = 0.5;
    console.log(11111);
  }

  showMenu() {
    this.newGameText.eventMode = "dynamic";
    this.continueText.eventMode = "dynamic";
    this.continueText.alpha = 1;
    this.newGameText.alpha = 1;
    console.log(this.newGameText);
  }
}
