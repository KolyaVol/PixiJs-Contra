import {
  Application,
  Sprite,
  Assets,
  Graphics,
  GraphicsGeometry,
  Rectangle,
} from "pixi.js";
import icon from "../asset/favicon.png";
import Hero from "./components/Hero";
import Gravitation from "./mechanics/Gravitation";
import Platform from "./components/Platform";
import Collision from "./mechanics/Collision";
import Movement from "./mechanics/Movement";

let isMoveRight = false;
let isMoveLeft = false;
const heroFallSpeed = 1;
const hero = new Hero();
const grav = new Gravitation(hero, heroFallSpeed);

function hadleKeyDown(e) {
  switch (e.code) {
    case "ArrowRight":
      isMoveRight = true;
      break;
    case "ArrowLeft":
      isMoveLeft = true;
      break;
    case "ArrowUp":
      grav.jump();
      break;

    default:
      break;
  }
}
function hadleKeyUp(e) {
  switch (e.code) {
    case "ArrowRight":
      isMoveRight = false;
      break;
    case "ArrowLeft":
      isMoveLeft = false;
      break;
    case "ArrowUp":
      grav.fall();
      break;

    default:
      break;
  }
}

document.addEventListener("keydown", (e) => hadleKeyDown(e));
document.addEventListener("keyup", (e) => hadleKeyUp(e));
// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app = new Application();

// The application will create a canvas element for you that you
// can then insert into the DOM
document.body.appendChild(app.view);

const platform = new Platform();
let movement = new Movement(hero, hero.maxSpeed);
// load the texture we need
const texture = await Assets.load(icon);

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
  if (isMoveRight) {
    movement.right();
  } else if (isMoveLeft) {
    movement.left();
  }
  if (col.isCollide()) {
    grav.stay(platform.y);
  } else grav.fall();
});
