import { Application, Container } from "pixi.js";
import Hero from "./components/Hero";
import Collision from "./mechanics/Collision";
import Movement from "./mechanics/Movement";
import PlatformFactory from "./components/Platforms/PlatformFactory";
import Shooting from "./mechanics/Shooting";
import Camera from "./mechanics/Camera";

const app = new Application();
const worldContainer = new Container();
const hero = new Hero(worldContainer);

app.stage.addChild(worldContainer);
const platformFactory = new PlatformFactory(worldContainer);
const movement = new Movement(hero, hero.stats.speed);
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
];

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container

hero.drawHero();

// The application will create a canvas element for you that you
// can then insert into the DOM
document.body.appendChild(app.view);

platformFactory.createPlatforms(platformArr);

movement.startObserve();

// load the texture we need
// const texture = await Assets.load(icon);
hero.x = app.renderer.width / 2;
hero.y = app.renderer.height / 2;
// Setup the position of the hero
const cameraSettings = {
  target: hero,
  world: worldContainer,
  screenSize: app.screen,
  maxWorldWidth: worldContainer.width,
  isBackScrollX: true,
};
const camera = new Camera(cameraSettings);

const shooting = new Shooting(app, bulletArr, hero, camera);
shooting.startObserve();
// Add the hero to the scene we are building

app.ticker.add(() => {
  console.log(hero.x);
  //hero.update();
  movement.startMove(col.checkArrCollisionOrientation(hero, platformArr));

  shooting.startShooting(platformArr);
  camera.update();
});
