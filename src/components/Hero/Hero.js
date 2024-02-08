import Entity from "../Entity.js";
import Gravitation from "../../mechanics/Gravitation.js";

export default class Hero extends Entity {
  worldContainer;

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
    this.name = "Hero";
    
    this.maxHp = 1;
    this.hp = this.maxHp;

    this.grav = new Gravitation();
    this.isArrowLeft = false;
    this.isArrowRight = false;
    this.IsArrowUp = false;
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
    this.view.x += this.speed;
  }

  left() {
    this.view.x += -this.speed;
  }

  startMove(collisionResult) {
    if (this.fallSpeed > 0) {
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
