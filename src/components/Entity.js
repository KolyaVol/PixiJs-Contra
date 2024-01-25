import { Container } from "pixi.js";

export default class Entity extends Container {
  _view;

  isDead;
  isActive;
  gravitable = false;
  prevPoint = { x: 0, y: 0 };
  constructor(view) {
    super();
    this._view = view;
  }
  /*get x() {
    return this._view.x;
  }
  set x(value) {
    this._view.x = value;
  }

  get y() {
    return this._view.y;
  }
  set y(value) {
    this._view.y = value;
  }*/

  dead() {
    this.isDead = true;
  }

  resuraction() {
    this.isDead = false;
  }

  removeFromStage() {
    if (this._view.parent != null) {
      this._view.removeFromParent();
    }
  }

  updatePrevPointX() {
    this.prevPoint.x = this.x;
  }
  updatePrevPointY() {
    this.prevPoint.y = this.y;
  }
}
