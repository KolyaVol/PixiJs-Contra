import { Container } from "pixi.js";

export default class Entity extends Container {
  prevPoint = { x: 0, y: 0 };
  constructor() {
    super();
  }

  updatePrevPointX() {
    this.prevPoint.x = this.x;
  }
  updatePrevPointY() {
    this.prevPoint.y = this.y;
  }
}
