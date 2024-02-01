import { Application, Assets, Container } from "../libs/pixi.mjs";
import Collision from "./mechanics/Collision.js";
import PlatformFactory from "./components/Platforms/PlatformFactory.js";
import Shooting from "./mechanics/Shooting.js";
import Camera from "./mechanics/Camera.js";
import HeroFactory from "./components/Hero/HeroFactory.js";
import AssetsFactory from "./AssetsFactory.js";
//import HeroFactory from "./components/Hero/HeroFactory";

await Assets.load("../assets/atlas.json");

const app = new Application();
const worldContainer = new Container();
app.stage.addChild(worldContainer);

const assets = new AssetsFactory();

//const hero = new Hero(worldContainer);
const heroFactory = new HeroFactory(worldContainer, assets);
const hero = heroFactory.createHero(100, 100);

const platformFactory = new PlatformFactory(worldContainer);

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
  { lineWidth: 1, lineColor: 0xff1111, x: 100, y: 300, width: 600, height: 10 },
  { lineWidth: 1, lineColor: 0xf22221, x: 200, y: 400, width: 100, height: 20 },
  { lineWidth: 1, lineColor: 0xf33331, x: 300, y: 500, width: 100, height: 30 },
  { lineWidth: 4, lineColor: 0x77777, x: 600, y: 400, width: 100, height: 400 },
  {
    lineWidth: 4,
    lineColor: 0x77777,
    x: 1600,
    y: 400,
    width: 100,
    height: 400,
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

const shooting = new Shooting(worldContainer, bulletArr, hero, camera);
shooting.startObserve();
// Add the hero to the scene we are building

app.ticker.add(() => {
  //hero.update();

  hero.startMove(col.checkArrCollisionOrientation(hero, platformArr));

  shooting.startShooting(platformArr);
  camera.update();
});
