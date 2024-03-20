import { Application, Assets } from "../libs/pixi.mjs";
import Collision from "./mechanics/Collision.js";
import PlatformFactory from "./components/Platforms/PlatformFactory.js";
import Shooting from "./mechanics/Shooting.js";
import Camera from "./mechanics/Camera.js";
import HeroFactory from "./components/Hero/HeroFactory.js";
import AssetsFactory from "./AssetsFactory.js";
import World from "./World.js";
import EnemyFactory from "./components/Enemies/EnemyFactory.js";
import PowerupsFactory from "./components/Powerups/PowerupsFactory.js";

//await Assets.load("../assets/atlas.json");
export default class Game {
  entityArr = [];
  worldContainer = new World();
  assets = new AssetsFactory();
  hero = null;
  constructor() {}

  createPlatforms() {
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
      hero
    );
    platformFactory.createPlatforms(platformArr, this.entityArr);

    const bridge = platformFactory.createBridge(10, 400);
    const bridge1 = platformFactory.createBridge(11, 400);
    const bridge2 = platformFactory.createBridge(12, 400);
    const bridge3 = platformFactory.createBridge(13, 400);
    const bridge4 = platformFactory.createBridge(14, 400);
  }

  createHero() {
    const heroFactory = new HeroFactory(
      this.worldContainer.game,
      this.assets,
      this.entityArr
    );
    this.hero = heroFactory.createHero(300, 100);
  }

  createPowerups() {
    const powerupsFactory = new PowerupsFactory(
      this.assets,
      this.worldContainer.game,
      this.hero,
      this.entityArr
    );
    const powerup1 = powerupsFactory.createPowerup(1000, 300);
  }

  createEnemies() {
    const enemyFactory = new EnemyFactory(
      this.worldContainer.game,
      this.assets,
      this.hero,
      this.entityArr,
      
    );
    const runner = enemyFactory.createRunner(1600, 100);
    const runner1 = enemyFactory.createRunner(2600, 100);
    const runner2 = enemyFactory.createRunner(3600, 100);
    //const tourelle = enemyFactory.createTourelle(1500, 50);
    const boss = enemyFactory.createBoss(5800, 300);
  }

  start() {
    const entityArr = [];
    const col = new Collision();
    const app = new Application({ width: 1024, height: 768 });

    //----NEED FIX---- Create one bulletFactory for entire game

    const cameraSettings = {
      target: hero,
      world: worldContainer,
      screenSize: app.screen,
      maxWorldWidth: worldContainer.width,
      isBackScrollX: true,
    };
    const camera = new Camera(cameraSettings);

    const shooting = new Shooting(worldContainer.game, hero, camera, entityArr);

    app.stage.addChild(worldContainer);
    document.body.appendChild(app.view);

    hero.startObserve();

    shooting.startObserve();

    app.ticker.add(() => {
      entityArr.forEach((entity, index) => {
        if (entity.isDead) {
          entityArr.splice(index, 1);
          return;
        }
        if (entity.view && entity.update) {
          entity.update(col.checkArrCollisionOrientation(entity, entityArr));
        }
      });

      shooting.startShooting();

      camera.update();
    });
  }
}
