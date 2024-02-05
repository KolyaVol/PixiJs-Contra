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
    this.view = view;

    this.grav = new Gravitation();
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

    // if (this.x >= 700) {
    //   console.log(999999999999999999999999);
    //   this.grav.jump(this);
    // }

    if (!collisionResult.vertical && !collisionResult.horizontal) {
      this.prevPoint.y = this.view.y;
      this.state.isFly = true;
    }

    if (collisionResult.vertical) {
      if (collisionResult.area) {
        this.grav.stay(this, collisionResult.area);
      } else this.grav.stay(this, this.prevPoint);
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
