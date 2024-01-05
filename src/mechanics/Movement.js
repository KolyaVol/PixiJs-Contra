import Gravitation from "./Gravitation";

export default class Movement {
  constructor(item, heroMaxSpeed, heroStartFallSpeed) {
    this.item = item;
    this.speed = heroMaxSpeed;
    this.isMoveRight = false;
    this.isMoveLeft = false;
    this.isArrowLeft = false;
    this.isArrowRight = false;
    this.IsArrowUp = false;
    this.grav = new Gravitation(item, heroStartFallSpeed);
  }
  hadleKeyDown(e) {
    switch (e.code) {
      case "ArrowRight":
        this.isArrowRight = true;
        if (this.isArrowLeft) {
          this.isMoveLeft = false;
          this.isMoveRight = true;
        } else {
          this.isMoveRight = true;
        }

        break;
      case "ArrowLeft":
        this.isArrowLeft = true;
        if (this.isArrowRight) {
          this.isMoveRight = false;
          this.isMoveLeft = true;
        } else {
          this.isMoveLeft = true;
        }
        break;
      case "ArrowUp":
        this.IsArrowUp = true;
        this.grav.jump();
        break;

      default:
        break;
    }
  }
  hadleKeyUp(e) {
    switch (e.code) {
      case "ArrowRight":
        this.isArrowRight = false;
        if (this.isArrowLeft) {
          this.isMoveLeft = true;
          this.isMoveRight = false;
        } else {
          this.isMoveRight = false;
          this.isMoveLeft = false;
        }

        break;
      case "ArrowLeft":
        this.isArrowLeft = false;
        if (this.isArrowRight) {
          this.isMoveRight = true;
          this.isMoveLeft = false;
        } else {
          this.isMoveRight = false;
          this.isMoveLeft = false;
        }
        break;
      case "ArrowUp":
        this.IsArrowUp = false;
        this.grav.fall();
        break;

      default:
        break;
    }
  }

  startObserve() {
    document.addEventListener("keydown", (e) => this.hadleKeyDown(e));
    document.addEventListener("keyup", (e) => this.hadleKeyUp(e));
  }
  startMove(isCollide) {
    if (isCollide) {
      this.grav.stay(isCollide);
      this.IsArrowUp ? this.grav.jump() : "";
    } else this.grav.fall();
    if (this.isMoveRight) {
      this.right();
    } else if (this.isMoveLeft) {
      this.left();
    }
  }
  right() {
    this.item.x += this.speed;
  }
  left() {
    this.item.x += -this.speed;
  }
}
