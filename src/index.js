import { Assets } from "../libs/pixi.mjs";

import Game from "./Game.js";

await Assets.load("../assets/atlas.json");

const game = new Game();

game.start();
