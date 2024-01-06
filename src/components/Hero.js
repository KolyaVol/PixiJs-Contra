import { Container, Graphics } from "pixi.js";

let heroGraphics = new Graphics();
let gunGraphics = new Graphics();

export default class Hero extends Container {
  maxSpeed = 4;
  startFallSpeed = 1;
  state = { isJump: false, isWithGun: false };
  constructor() {
    super();

    heroGraphics.lineStyle(2, 0xff0000);
    heroGraphics.drawRect(0, 0, 20, 60);

    this.addChild(heroGraphics);
    if (!this.state.isWithGun) {
      gunGraphics.lineStyle(10, 0xff0000);
      gunGraphics.drawRect(10, 30, 30, 0);
      gunGraphics.rotation = -0.1

      this.addChild(gunGraphics);
    }
  }
}
