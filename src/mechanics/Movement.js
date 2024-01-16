import Gravitation from "./Gravitation";

export default class Movement {
  constructor(item, itemSpeed) {
    this.item = item;
    this.speed = itemSpeed;
    this.isMoveRight = false;
    this.isMoveLeft = false;
    this.isArrowLeft = false;
    this.isArrowRight = false;
    this.IsArrowUp = false;
    this.grav = new Gravitation();
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
        this.grav.jump(this.item);
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
        this.grav.fall(this.item);
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
    this.item.x += this.speed;
  }

  left() {
    this.item.x += -this.speed;
  }

  startMove(collisionResult) {
    if (this.item.stats.fallSpeed > 0) {
      this.item.state.isJump = false;
    }
    if (!collisionResult.vertical && !collisionResult.horizontal) {
      this.item.prevPoint.y = this.item.y;
      this.item.state.isFly = true;
    }

    if (collisionResult.vertical) {
      if (collisionResult.area) {
        this.grav.stay(this.item, collisionResult.area);
      } else
        this.grav.stay(
          this.item,
          this.item.prevPoint
        );

      this.IsArrowUp ? this.grav.jump(this.item) : "";
    } else this.grav.fall(this.item);
  
    if (collisionResult.horizontal) {
      this.item.x = this.item.prevPoint.x;
    }

    if (this.isMoveRight) {
      this.item.prevPoint.x = this.item.x;
      this.right();
    } else if (this.isMoveLeft) {
      this.item.prevPoint.x = this.item.x;
      this.left();
    }
  }
}
