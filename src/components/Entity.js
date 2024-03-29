import { Container } from "../../libs/pixi.mjs";

export default class Entity extends Container {
  view;
  isDead = false;
  isActive;
  gravitable = false;
  prevPoint = { x: 0, y: 0 };
  speed = 4;
  fallSpeed = 0;
  jumpPower = -8;
  type = "Entity";
  group = "Empty";
  maxHp = 999;
  hp;

  constructor(view) {
    super();

    this._view = view;
    this.hp = this.maxHp;
  }

  get x() {
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
  }

  get width() {
    return this._view.collisionBox.width;
  }
  set width(value) {
    this._view.collisionBox.width = value;
  }

  get height() {
    return this._view.collisionBox.height;
  }
  set height(value) {
    this._view.collisionBox.height = value;
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

  damage() {
    this.hp -= 1;
  }

  destroyIfDead() {
    if (this.hp <= 0 || this.isDead) {
      this.dead();
      this.removeFromStage();
    }
  }

  updatePrevPointX() {
    this.prevPoint.x = this._view.x;
  }
  updatePrevPointY() {
    if (this.prevPoint.y === this._view.y) {
      return;
    } else {
      this.prevPoint.y = this._view.y;
    }
  }
}
