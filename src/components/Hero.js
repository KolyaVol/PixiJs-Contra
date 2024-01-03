import { Container, Graphics } from "pixi.js";

let graphics = new Graphics();

export default class Hero extends Container {
  maxSpeed = 4;
  state = { isJump: false };
  constructor() {
    super();

    graphics.lineStyle(2, 0xff0000);
    graphics.drawRect(0, 0, 20, 60);
    this.addChild(graphics);
  }
}
