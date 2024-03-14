import Entity from "../Entity.js";
import Gravitation from "../../mechanics/Gravitation.js";
import HeroWeaponUnit from "./HeroWeaponUnit.js";

export default class Hero extends Entity {
  worldContainer;
  #heroWeaponUnit;
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
    this.type = "Hero";

    this.maxHp = 1;
    this.hp = this.maxHp;

    this.#heroWeaponUnit = new HeroWeaponUnit(view);

    this.grav = new Gravitation();
    this.isArrowLeft = false;
    this.isArrowRight = false;
    this.isArrowUp = false;
    this.isArrowDown = false;
    this.isShift = false;
  }

  get bulletContext() {
    return this.#heroWeaponUnit.bulletContext;
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
          this.state.isMoveLeft = true;
          //this.item.update();
        }
        break;
      case "ArrowUp":
        this.isArrowUp = true;
        this.grav.jump(this);
        break;

      case "ArrowDown":
        this.isArrowDown = true;
        break;

      case "ShiftLeft":
        this.isShift = true;
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
        this.isArrowUp = false;
        this.grav.fall(this);
        break;

      case "ArrowDown":
        this.isArrowDown = false;
        break;

      case "ShiftLeft":
        this.isShift = false;

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
    this.view.x += this.speed;
  }

  left() {
    this.view.x += -this.speed;
  }

  startMove(collisionResult) {
    let verticalCollideArea = null;
    let horizontalCollideArea = null;

    if (this.fallSpeed > 0) {
      this.state.isJump = false;
    }

    collisionResult.forEach((result) => {
      if (
        (result.area?.type === "platform" || result.area?.type === "water") &&
        result.isCollide
      ) {
        if (result.vertical && !this.state.isJump) {
          verticalCollideArea = result.area;
        }
        if (result.horizontal) {
          horizontalCollideArea = result.area;
        }
      }
    });

    if (!verticalCollideArea && this.prevPoint.y !== this.y) {
      this.updatePrevPointY();
      this.state.isFly = true;
    }

    if (verticalCollideArea && !this.state.isJump) {
      this.grav.stay(this, verticalCollideArea);
      this.isArrowUp ? this.grav.jump(this) : "";
    } else {
      this.grav.fall(this);
      this.view.showFall();
    }

    if (horizontalCollideArea) {
      this.view.x = this.prevPoint.x;
    }

    if (this.state.isMoveRight) {
      this.view.flip(1);
      this.view.showRun();
      this.updatePrevPointX();
      this.right();
    } else if (this.state.isMoveLeft) {
      this.view.showRun();
      this.view.flip(-1);
      this.updatePrevPointX();
      this.left();
    } else this.view.showStay();

    if (this.isShift && this.isArrowDown) {
      this.grav.fall(this);
      this.view.showFall();
    } else if (this.isArrowDown) {
      this.view.showLay();
    } else if (this.isArrowDown && this.state.isFly) this.view.showFall();
    this.state.isJump ? this.view.showJump() : "";
  }

  update(collisionResult) {
    //this.destroyIfDead();
    this.startMove(collisionResult);
    this.#heroWeaponUnit.setBulletAngle(
      this.isArrowRight,
      this.isArrowLeft,
      this.isArrowDown,
      this.isArrowUp,
      this.state.isJump
    );
  }
}
