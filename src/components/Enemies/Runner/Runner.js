import Entity from "../../Entity.js";
import Gravitation from "../../../mechanics/Gravitation.js";

export default class Runner extends Entity {
  worldContainer;

  state = {
    isMoveRight: false,
    isMoveLeft: false,
    isJump: false,
    isFly: false,
  };

  #target;
  #timeCounter = 0;

  constructor(view, target) {
    super(view);
    this.type = "Runner";
    this.view = view;

    this.maxHp = 1;
    this.hp = this.maxHp;
    this.#target = target;
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
    let isCatchHero = false;

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
      if (result.area.type === "Hero" && result.isCollide) {
        isCatchHero = true;
      }
    });

    if (!verticalCollideArea && this.prevPoint.y !== this.y) {
      this.updatePrevPointY();
      this.state.isFly = true;
    }

    if (verticalCollideArea && !this.state.isJump) {
      this.grav.stay(this, verticalCollideArea);
      //RANDOM JUMP WHEN NEAR AT THE END OF THE PLATFORM
      if (
        ((this.x >= verticalCollideArea.x - 5 &&
          this.x <= verticalCollideArea.x + 5) ||
          (this.x >=
            verticalCollideArea.x +
              verticalCollideArea.view.collisionBox.width -
              5 &&
            this.x <=
              verticalCollideArea.x +
                verticalCollideArea.view.collisionBox.width +
                5)) &&
        Math.random() > 0.4
      ) {
        this.grav.jump(this);
      }
    } else this.grav.fall(this);

    if (horizontalCollideArea && !this.state.isFly) {
      this.view.x = this.prevPoint.x;
    }
    // START MOVE WHEN HERO MOVE CLOSER THAN 712PX
    if (this.#target && Math.abs(this.x - this.#target.x) < 712) {
      //DO DAMAGE TO HERO WHEN COLLIDE
      if (isCatchHero) {
        if (this.#timeCounter === 0) {
          this.#timeCounter++;
          this.#target.damage();
          this.speed--;

          return;
        }
      }

      if (this.#timeCounter === 150) {
        this.#timeCounter = 0;
        this.speed++;
      } else if (this.#timeCounter > 0) {
        this.#timeCounter++;
      }
      //MOVE TO HERO WITH DEBOUNCE WHEN COLLIDE
      if (
        (this.x > this.#target.x + this.#target.view.collisionBox.width ||
          this.x < this.#target.x) &&
        (this.#timeCounter === 0 || this.#timeCounter === 30)
      ) {
        if (this.x > this.#target.x) {
          this.state.isMoveLeft = true;
          this.state.isMoveRight = false;
        } else {
          this.state.isMoveLeft = false;
          this.state.isMoveRight = true;
        }
      }
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
