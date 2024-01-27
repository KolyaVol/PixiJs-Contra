import Gravitation from "./Gravitation.js";

export default class Movement {
  constructor(item, itemSpeed) {
    this.item = item;
    this.speed = itemSpeed;
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
          this.item.state.isMoveLeft = false;
          this.item.state.isMoveRight = true;
          this.item.update();
        } else {
          this.item.state.isMoveRight = true;
          this.item.update();
        }

        break;
      case "ArrowLeft":
        this.isArrowLeft = true;
        if (this.isArrowRight) {
          this.item.state.isMoveRight = false;
          this.item.state.isMoveLeft = true;
          this.item.update();
        } else {
          this.item.state.isMoveLeft = true;
          this.item.update();
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
          this.item.state.isMoveLeft = true;
          this.item.state.isMoveRight = false;
        } else {
          this.item.state.isMoveRight = false;
          this.item.state.isMoveLeft = false;
        }

        break;
      case "ArrowLeft":
        this.isArrowLeft = false;
        if (this.isArrowRight) {
          this.item.state.isMoveRight = true;

          this.item.state.isMoveLeft = false;
        } else {
          this.item.state.isMoveRight = false;
          this.item.state.isMoveLeft = false;
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
      } else this.grav.stay(this.item, this.item.prevPoint);

      this.IsArrowUp ? this.grav.jump(this.item) : "";
    } else this.grav.fall(this.item);

    if (collisionResult.horizontal) {
      this.item.x = this.item.prevPoint.x;
    }

    if (this.item.state.isMoveRight) {
      this.item.updatePrevPointX();
      this.right();
      this.item.update();
    } else if (this.item.state.isMoveLeft) {
      this.item.updatePrevPointX();
      this.left();
      this.item.update();
    }
  }
}
