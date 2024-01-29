import { Container } from "../../libs/pixi.mjs";
import Gravitation from "../mechanics/Gravitation.js";

export default class Entity extends Container {
  _view;

  stats = {
    lineStyle: { lineWidth: 2, lineColor: 0xff0000 },
    width: 20,
    height: 60,
    speed: 4,
    fallSpeed: 0,
    jumpPower: -8,
  };

  state = {
    isMoveRight: false,
    isMoveLeft: false,
    isJump: false,
    isFly: false,
    isWithGun: false,
  };

  isDead;
  isActive;
  gravitable = false;
  prevPoint = { x: 0, y: 0 };

  constructor(view) {
    super();

    this.isArrowLeft = false;
    this.isArrowRight = false;
    this.IsArrowUp = false;

    this.grav = new Gravitation();
    this._view = view;
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

  hadleKeyDown(e) {
    switch (e.code) {
      case "ArrowRight":
        this.isArrowRight = true;
        if (this.isArrowLeft) {
          this.state.isMoveLeft = false;
          this.state.isMoveRight = true;
          //this.item.update();
        } else {
          this.state.isMoveRight = true;
          //this.item.update();
        }

        break;
      case "ArrowLeft":
        this.isArrowLeft = true;
        if (this.isArrowRight) {
          this.state.isMoveRight = false;
          this.state.isMoveLeft = true;
          // this.item.update();
        } else {
          this.item.state.isMoveLeft = true;
          //this.item.update();
        }
        break;
      case "ArrowUp":
        this.IsArrowUp = true;
        this.grav.jump(this._view);
        break;

      default:
        console.log(e.code);
        break;
    }
  }

  hadleKeyUp(e) {
    switch (e.code) {
      case "ArrowRight":
        this.isArrowRight = false;
        if (this.isArrowLeft) {
          this.state.isMoveLeft = true;
          this.state.isMoveRight = false;
        } else {
          this.state.isMoveRight = false;
          this.state.isMoveLeft = false;
        }

        break;
      case "ArrowLeft":
        this.isArrowLeft = false;
        if (this.isArrowRight) {
          this.state.isMoveRight = true;

          this.state.isMoveLeft = false;
        } else {
          this.state.isMoveRight = false;
          this.state.isMoveLeft = false;
        }
        break;
      case "ArrowUp":
        this.IsArrowUp = false;
        this.grav.fall(this._view);
        break;

      default:
        break;
    }
  }

  startObserve() {
    document.addEventListener("keydown", (e) => this.hadleKeyDown(e));
    document.addEventListener("keyup", (e) => this.hadleKeyUp(e));
  }

  right() {
    this._view.x += this.speed;
  }

  left() {
    this._view.x += -this.speed;
  }

  startMove(collisionResult) {
    if (this.stats.fallSpeed > 0) {
      this.state.isJump = false;
    }
    if (!collisionResult.vertical && !collisionResult.horizontal) {
      this.prevPoint.y = this._view.y;
      this.state.isFly = true;
    }

    if (collisionResult.vertical) {
      if (collisionResult.area) {
        this.grav.stay(this._view, collisionResult.area);
      } else this.grav.stay(this._view, this.prevPoint);

      this.IsArrowUp ? this.grav.jump(this._view) : "";
    } else this.grav.fall(this._view);

    if (collisionResult.horizontal) {
      this._view.x = this.prevPoint.x;
    }

    if (this.state.isMoveRight) {
      this.updatePrevPointX();
      this.right();
      //this.item.update();
    } else if (this.item.state.isMoveLeft) {
      this.item.updatePrevPointX();
      this.left();
      //this.item.update();
    }
  }
}
