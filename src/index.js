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

const worldContainer = new World();
app.stage.addChild(worldContainer);
const platformWidth = 129;

const assets = new AssetsFactory();

const heroFactory = new HeroFactory(worldContainer.game, assets);
const hero = heroFactory.createHero(300, 100);
const enemyFactory = new EnemyFactory(worldContainer.game, assets);
const runner = enemyFactory.createRunner(300, 100);

const platformFactory = new PlatformFactory(worldContainer, assets);

const bulletArr = [];
const entityArr = [];

const col = new Collision();
const platformArr = [
  {
    type: "platform",
    x: platformWidth,
    y: 200,
    width: 6 * platformWidth,
    height: 10,
  },
  {
    type: "platform",
    x: 2 * platformWidth,
    y: 350,
    width: platformWidth,
    height: 20,
  },
  {
    type: "platform",
    x: 3 * platformWidth,
    y: 500,
    width: platformWidth,
    height: 30,
  },
  {
    type: "platform",
    x: 6 * platformWidth,
    y: 400,
    width: platformWidth,
    height: 400,
  },

  {
    type: "platform",
    x: 16 * platformWidth,
    y: 400,
    width: platformWidth,
    height: 400,
  },
  {
    type: "platform",
    x: 11 * platformWidth,
    y: 340,
    width: platformWidth,
    height: 40,
  },
  {
    type: "platform",
    x: 0,
    y: 500,
    width: 16 * platformWidth,
    height: 30,
  },
  { type: "water", x: 0, y: 768, width: 50 * platformWidth, height: 30 },
];

document.body.appendChild(app.view);

platformFactory.createPlatforms(platformArr);

hero.startObserve();

const cameraSettings = {
  target: hero,
  world: worldContainer,
  screenSize: app.screen,
  maxWorldWidth: worldContainer.width,
  isBackScrollX: true,
};
const camera = new Camera(cameraSettings);

const shooting = new Shooting(worldContainer.game, bulletArr, hero, camera);
shooting.startObserve();

app.ticker.add(() => {
  hero.update(col.checkArrCollisionOrientation(hero, platformArr));
  runner.update(
    col.checkArrCollisionOrientation(runner, platformArr),
    col.checkArrCollisionOrientation(runner, bulletArr)
  );
  shooting.startShooting(platformArr);
  camera.update();
});
