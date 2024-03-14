import { Application, Assets } from "../libs/pixi.mjs";
import Collision from "./mechanics/Collision.js";
import PlatformFactory from "./components/Platforms/PlatformFactory.js";
import Shooting from "./mechanics/Shooting.js";
import Camera from "./mechanics/Camera.js";
import HeroFactory from "./components/Hero/HeroFactory.js";
import AssetsFactory from "./AssetsFactory.js";
import World from "./World.js";
import EnemyFactory from "./components/Enemies/EnemyFactory.js";

await Assets.load("../assets/atlas.json");
const app = new Application({ width: 1024, height: 768 });
const platformWidth = 129;
const platformArr = [
  {
    type: "platform",
    x: 0,
    y: 240,
    width: platformWidth,
    height: 20000,
  },
  {
    type: "platform",
    x: platformWidth,
    y: 500,
    width: 16 * platformWidth,
    height: 40,
  },
  {
    type: "bPlatform",
    x: 6 * platformWidth,
    y: 420,
    width: platformWidth,
    height: 40,
  },
  {
    type: "bPlatform",
    x: 7 * platformWidth,
    y: 350,
    width: platformWidth,
    height: 40,
  },
  {
    type: "bPlatform",
    x: 8 * platformWidth,
    y: 400,
    width: platformWidth * 2,
    height: 40,
  },
  { type: "water", x: 0, y: 768, width: 50 * platformWidth, height: 30 },
];
//----NEED FIX---- Create one bulletFactory for entire game

const worldContainer = new World();
app.stage.addChild(worldContainer);

const assets = new AssetsFactory();

const bulletArr = [];
const entityArr = [];

const heroFactory = new HeroFactory(worldContainer.game, assets, entityArr);
const hero = heroFactory.createHero(300, 100);
const enemyFactory = new EnemyFactory(
  worldContainer.game,
  assets,
  hero,
  entityArr,
  bulletArr
);
const runner = enemyFactory.createRunner(1600, 100);
const runner1 = enemyFactory.createRunner(2600, 100);
const runner2 = enemyFactory.createRunner(3600, 100);
//const tourelle = enemyFactory.createTourelle(1500, 50);
const boss = enemyFactory.createBoss(5800, 300);

const platformFactory = new PlatformFactory(worldContainer, assets, entityArr);

const col = new Collision();

document.body.appendChild(app.view);

platformFactory.createPlatforms(platformArr, entityArr);

hero.startObserve();

const cameraSettings = {
  target: hero,
  world: worldContainer,
  screenSize: app.screen,
  maxWorldWidth: worldContainer.width,
  isBackScrollX: true,
};
const camera = new Camera(cameraSettings);

const shooting = new Shooting(
  worldContainer.game,
  bulletArr,
  hero,
  camera,
  entityArr
);
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

  shooting.startShooting(platformArr, hero);

  camera.update();
});
