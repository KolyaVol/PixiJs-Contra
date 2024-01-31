import Gun from "../Gun.js";
import Entity from "../Entity.js";
import { Graphics } from "../../../libs/pixi.mjs";
import Gravitation from "../../mechanics/Gravitation.js";

const heroGraphics = new Graphics();

export default class Hero extends Entity {
  worldContainer;

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

  constructor(view) {
    super(view);
    this.view = view;

    this.grav = new Gravitation();
    this.isArrowLeft = false;
    this.isArrowRight = false;
    this.IsArrowUp = false;
  }

  /*drawHero() {
    heroGraphics.lineStyle(
      this.stats.lineStyle.lineWidth,
      this.stats.lineStyle.lineColor
    );
    heroGraphics.drawRect(0, 0, this.stats.width - 2, this.stats.height - 2);
    // heroGraphics.transform.skew.x = -0.1;
    this.addChild(heroGraphics);
    this.worldContainer.addChild(this);
    this.width = this.stats.width;
    this.isActive = true;
    this.isDead = false;
    this.pivot.x = 11;
    const gun = new Gun(this);
    gun.drawGun(true);
  }*/

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
          this.state.isMoveLeft = true;
          //this.item.update();
        }
        break;
      case "ArrowUp":
        this.IsArrowUp = true;
        this.grav.jump(this);
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
        this.grav.fall(this);
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
    this.view.x += this.stats.speed;
  }

  left() {
    this.view.x += -this.stats.speed;
  }

  startMove(collisionResult) {
    if (this.stats.fallSpeed > 0) {
      this.state.isJump = false;
    }
    if (!collisionResult.vertical && !collisionResult.horizontal) {
      this.prevPoint.y = this.view.y;
      this.state.isFly = true;
    }

    if (collisionResult.vertical) {
      if (collisionResult.area) {
        this.grav.stay(this, collisionResult.area);
      } else this.grav.stay(this, this.prevPoint);

      this.IsArrowUp ? this.grav.jump(this) : "";
    } else this.grav.fall(this);

    if (collisionResult.horizontal) {
      this.view.x = this.prevPoint.x;
    }

    if (this.state.isMoveRight) {
      this.updatePrevPointX();
      this.right();
      //this.item.update();
    } else if (this.state.isMoveLeft) {
      this.updatePrevPointX();
      this.left();
      //this.item.update();
    }
  }

  update() {}
}
