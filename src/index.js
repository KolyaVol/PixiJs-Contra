import { Application, Assets, Container } from "../libs/pixi.mjs";
import Collision from "./mechanics/Collision.js";
import PlatformFactory from "./components/Platforms/PlatformFactory.js";
import Shooting from "./mechanics/Shooting.js";
import Camera from "./mechanics/Camera.js";
import HeroFactory from "./components/Hero/HeroFactory.js";
import AssetsFactory from "./AssetsFactory.js";
import World from "./World.js";
import RunnerFactory from "./components/Enemies/Runner/RunnerFactory.js";

await Assets.load("../assets/atlas.json");
const app = new Application({ width: 1024, height: 768 });

const worldContainer = new World();
app.stage.addChild(worldContainer);

const assets = new AssetsFactory();

const heroFactory = new HeroFactory(worldContainer.game, assets);
const hero = heroFactory.createHero(300, 100);
const runnerFactory = new RunnerFactory(worldContainer.game, assets);
const runner = runnerFactory.createRunner(300, 100);

const platformFactory = new PlatformFactory(worldContainer, assets);

const bulletArr = [];

const col = new Collision();
const platformArr = [
  {
    lineWidth: 2,
    lineColor: 0xfffff,
    x: app.renderer.width / 2.2,
    y: 500,
    width: 1600,
    height: 30,
  },
  { type: "platform", x: 100, y: 200, width: 600, height: 10 },
  { type: "platform", x: 200, y: 350, width: 100, height: 20 },
  { type: "platform", x: 300, y: 500, width: 100, height: 30 },
  { type: "platform", x: 600, y: 400, width: 100, height: 400 },
  { type: "water", x: 0, y: 768, width: 10000, height: 30 },
  { type: "platform", x: 1600, y: 400, width: 100, height: 400 },
  {
    type: "platform",
    x: 1100,
    y: 340,
    width: 100,
    height: 40,
  },
];

document.body.appendChild(app.view);

platformFactory.createPlatforms(platformArr);

hero.startObserve();
// load the texture we need
// const texture = await Assets.load(icon);
//hero.x = app.renderer.width / 2;
//hero.y = app.renderer.height / 2;
// Setup the position of the hero
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
// Add the hero to the scene we are building
app.ticker.add(() => {
  hero.startMove(col.checkArrCollisionOrientation(hero, platformArr));
  runner.update(
    col.checkArrCollisionOrientation(runner, platformArr),
    col.checkArrCollisionOrientation(runner, bulletArr)
  );
  shooting.startShooting(platformArr);
  camera.update();
});
