import Entity from "../../Entity.js";
import Gravitation from "../../../mechanics/Gravitation.js";

export default class Runner extends Entity {
  worldContainer;

  state = {
    isMoveRight: true,
    isMoveLeft: false,
    isJump: false,
    isFly: false,
  };

  constructor(view) {
    super(view);
    this.type = "Runner";
    this.view = view;

    this.maxHp = 1;
    this.hp = this.maxHp;

    this.grav = new Gravitation();
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

      if (
        ((this.x >= verticalCollideArea.x - 20 &&
          this.x <= verticalCollideArea.x + 20) ||
          (this.x >=
            verticalCollideArea.x +
              verticalCollideArea.view.collisionBox.width -
              20 &&
            this.x <=
              verticalCollideArea.x +
                verticalCollideArea.view.collisionBox.width +
                20)) &&
        Math.random() > 0.4
      ) {
        this.grav.jump(this);
      }
    } else this.grav.fall(this);

    if (horizontalCollideArea && !this.state.isFly) {
      this.view.x = this.prevPoint.x;
    }

    if (this.state.isMoveRight) {
      this.view.flip(1);
      this.updatePrevPointX();
      this.right();
    } else if (this.state.isMoveLeft) {
      this.view.flip(-1);
      this.updatePrevPointX();
      this.left();
    }
  }

  update(collisionResult) {
    this.startMove(collisionResult);
    this.destroyIfDead();
  }
}
