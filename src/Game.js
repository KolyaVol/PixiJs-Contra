import { Application, TextStyle, Text } from "../libs/pixi.mjs";
import Collision from "./mechanics/Collision.js";
import PlatformFactory from "./components/Platforms/PlatformFactory.js";
import Shooting from "./mechanics/Shooting.js";
import Camera from "./mechanics/Camera.js";
import HeroFactory from "./components/Hero/HeroFactory.js";
import AssetsFactory from "./AssetsFactory.js";
import World from "./World.js";
import EnemyFactory from "./components/Enemies/EnemyFactory.js";
import PowerupsFactory from "./components/Powerups/PowerupsFactory.js";
import Menu from "./Menu.js";

export default class Game {
  entityArr = [];
  worldContainer = new World();
  assets = new AssetsFactory();
  hero = null;
  #pixiApp = null;
  #isBossDead = false;
  #gameStage = "Ready to start";
  constructor() {}

  #createPlatforms() {
    const platformArr = [
      {
        type: "platform",
        x: 0,
        y: 240,
        width: 1,
        height: 20000,
      },
      {
        type: "platform",
        x: 1,
        y: 500,
        width: 9,
        height: 400,
      },
      {
        type: "bPlatform",
        x: 6,
        y: 420,
        width: 1,
        height: 40,
      },
      {
        type: "bPlatform",
        x: 7,
        y: 350,
        width: 1,
        height: 40,
      },
      {
        type: "bPlatform",
        x: 8,
        y: 400,
        width: 2,
        height: 40,
      },
      {
        type: "platform",
        x: 10,
        y: 500,
        width: 9,
        height: 400,
      },
      { type: "water", x: 0, y: 768, width: 50, height: 30 },
    ];

    const platformFactory = new PlatformFactory(
      this.worldContainer,
      this.assets,
      this.entityArr,
      this.hero
    );
    platformFactory.createPlatforms(platformArr, this.entityArr);

    const bridge = platformFactory.createBridge(10, 400);
    const bridge1 = platformFactory.createBridge(11, 400);
    const bridge2 = platformFactory.createBridge(12, 400);
    const bridge3 = platformFactory.createBridge(13, 400);
    const bridge4 = platformFactory.createBridge(14, 400);
  }

  #createHero() {
    const heroFactory = new HeroFactory(
      this.worldContainer.game,
      this.assets,
      this.entityArr
    );
    this.hero = heroFactory.createHero(300, 100);
  }

  #createPowerups() {
    const powerupsFactory = new PowerupsFactory(
      this.assets,
      this.worldContainer.game,
      this.hero,
      this.entityArr
    );
    const powerup1 = powerupsFactory.createPowerup(1000, 300);
  }

  #createEnemies() {
    const enemyFactory = new EnemyFactory(
      this.worldContainer.game,
      this.assets,
      this.hero,
      this.entityArr
    );
    const runner = enemyFactory.createRunner(1600, 100);
    const runner1 = enemyFactory.createRunner(2600, 100);
    const runner2 = enemyFactory.createRunner(3600, 100);
    //const tourelle = enemyFactory.createTourelle(1500, 50);
    const boss = enemyFactory.createBoss(1600, 300);
  }

  #showEndGame() {
    const style = new TextStyle({
      fontFamily: "Impact",
      fontSize: 50,
      fill: [0xffffff, 0xdd0000],
      stroke: 0x000000,
      strokeThickness: 5,
      letterSpacing: 30,
    });

    const text = new Text("STAGE CLEAR", style);
    text.x = this.#pixiApp.screen.width / 2 - text.width / 2;
    text.y = this.#pixiApp.screen.height / 2 - text.height / 2;

    this.#pixiApp.stage.addChild(text);
  }

  get gameStage() {
    return this.#gameStage;
  }
  set gameStage(value) {
    this.#gameStage = value;
  }

  restartGame() {
    this.#pixiApp.stop();
    document.body.removeChild(this.#pixiApp.view);
    this.entityArr = [];
    this.hero = null;
    this.worldContainer = null;
    this.#pixiApp = null;
    this.#isBossDead = false;
    this.start();
  }

  start() {
    this.worldContainer = new World();
    this.#gameStage = "In progress";

    this.#pixiApp = new Application({ width: 1024, height: 768 });

    this.#createHero();
    this.#createPlatforms();
    this.#createEnemies();
    this.#createPowerups();

    //----NEED FIX---- Create one bulletFactory for entire game

    const cameraSettings = {
      target: this.hero,
      world: this.worldContainer,
      screenSize: this.#pixiApp.screen,
      maxWorldWidth: this.worldContainer.width,
      isBackScrollX: true,
    };
    const camera = new Camera(cameraSettings);

    const shooting = new Shooting(
      this.worldContainer.game,
      this.hero,
      this.entityArr
    );

    this.#pixiApp.stage.addChild(this.worldContainer);
    document.body.appendChild(this.#pixiApp.view);

    const menu = new Menu(this.#pixiApp, this.worldContainer, this);

    menu.showMenu();

    this.hero.startObserve();

    shooting.startObserve();

    const col = new Collision();

    const f = () => {
      if (this.#gameStage === "In progress") {
        this.entityArr.forEach((entity, index) => {
          if (entity.type === "Boss" && !this.#isBossDead && entity.isDead) {
            this.#isBossDead = true;
            this.#showEndGame();
            this.#gameStage = "Complited";
            this.hero.state.isPaused = true;
          }

          // if (this.#isBossDead && entity.group === "Enemy") {
          //   entity.dead();
          // }

          if (entity.isDead) {
            this.entityArr.splice(index, 1);
            return;
          }

          if (entity.view && entity.update) {
            entity.update(
              col.checkArrCollisionOrientation(entity, this.entityArr)
            );
          }
        });
      }

      shooting.startShooting();

      camera.update();
    };

    this.#pixiApp.ticker.add(f);
  }
}
