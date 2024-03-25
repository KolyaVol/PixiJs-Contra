import { TextStyle, Text, Container } from "../libs/pixi.mjs";

export default class Menu {
  constructor(app, worldContainer, game) {
    this.worldContainer = worldContainer;
    this.app = app;
    this.game = game;
  }

  showMenu() {
    console.log(this.game);
    const style = new TextStyle({
      fontFamily: "Impact",
      fontSize: 50,
      fill: [0xffffff, 0xdd0000],
      stroke: 0x000000,
      strokeThickness: 5,
      letterSpacing: 30,
    });
    const style1 = new TextStyle({
      fontFamily: "Impact",
      fontSize: 50,
      fill: [0x111111, 0xff0000],
      stroke: 0xaaaaaa,
      strokeThickness: 5,
      letterSpacing: 30,
    });

    const newGame = () => {
      newGameText._style = style1;
      continueText._style = style;
      setTimeout(() => {
        this.game.restartGame();
      }, 500);
    };
    function ll() {
      continueText._style = style1;
      newGameText._style = style;
    }

    const container = new Container();

    const newGameText = new Text("New Game", style);
    const continueText = new Text("Continue", style);

    newGameText.x = this.app.screen.width / 2 - newGameText.width / 2;
    newGameText.y = this.app.screen.height / 2 - newGameText.height / 2;
    continueText.x = this.app.screen.width / 2 - continueText.width / 2;
    continueText.y =
      this.app.screen.height / 2 +
      continueText.height +
      20 -
      continueText.height / 2;

    container.addChild(newGameText);
    container.addChild(continueText);

    newGameText.eventMode = "dynamic";
    continueText.eventMode = "dynamic";
    newGameText.on("pointerdown", newGame);
    continueText.on("pointerdown", ll);

    this.worldContainer.foreground.addChild(container);
  }
}
