import { Application } from "pixi.js";
import Hero from "./components/Hero";
import Platform from "./components/Platform";
import Collision from "./mechanics/Collision";
import Movement from "./mechanics/Movement";

const hero = new Hero();

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app = new Application();

// The application will create a canvas element for you that you
// can then insert into the DOM
document.body.appendChild(app.view);

const platform = new Platform();
let movement = new Movement(hero, hero.maxSpeed, hero.startFallSpeed);
movement.startObserve();
// load the texture we need
// const texture = await Assets.load(icon);

// This creates a texture from a 'bunny.png' image

// Setup the position of the bunny
hero.x = app.renderer.width / 2;
hero.y = app.renderer.height / 2;
platform.x = app.renderer.width / 2.2;
platform.y = 400;

// Rotate around the center

// Add the bunny to the scene we are building
app.stage.addChild(hero);
app.stage.addChild(platform);

app.ticker.add(() => {
  let col = new Collision(hero, platform);
  movement.startMove(col.isCollide());
});
