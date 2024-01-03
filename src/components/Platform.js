import { Container, Graphics } from "pixi.js";

let graphics = new Graphics();

export default class Platform extends Container {
  constructor() {
    super();

    graphics.lineStyle(2, 0x22222);
    graphics.drawRect(0, 0, 200, 30);
    this.addChild(graphics);
  }
}
