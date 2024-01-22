/* eslint-disable no-dupe-class-members */
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
