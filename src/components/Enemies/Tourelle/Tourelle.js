import Entity from "../../Entity.js";

export default class Tourelle extends Entity {
  #target;
  #bulletFactory;
  #timeCounter = 0;
  #health = 5;

  type = "Tourelle";

  constructor(view, target, bulletFactory, entityArr, bulletArr) {
    super(view);
    this.#target = target;
    this.#bulletFactory = bulletFactory;
    this.collisionBox = view.collisionBox;
    this.isActive = false;
    this.entityArr = entityArr;
    this.bulletArr = bulletArr;
    this.view = view;
  }

  update() {
    if (this.#target.isDead) {
      return;
    }

    if (this.isActive) {
      if (
        Math.abs(this.x - this.#target.x) >
        512 + this.collisionBox.width * 2
      ) {
        this.isActive = false;

        return;
      }
    } else {
      if (this.x - this.#target.x < 512 + this.collisionBox.width * 2) {
        this.isActive = true;
      }
      return;
    }

    let angle = Math.atan2(
      this.#target.y + this.#target.view.collisionBox.height / 3 - this.y,
      this.#target.x - this.x
    );
    this._view.gunRotation = angle;

    this.#fire(angle);
  }

  damage() {
    this.#health--;

    if (this.#health < 1) {
      this.#timeCounter = 0;
      const deadAnimation = this._view.showAndGetDeadAnimation();
      deadAnimation.onComplete = () => {
        this.dead();
      };
    }
  }

  #fire(angle) {
    if (!this.isDead) {
      this.#timeCounter++;

      if (this.#timeCounter < 50) {
        return;
      }

      const bulletContext = {};
      bulletContext.x = this.x;
      bulletContext.y = this.y;
      bulletContext.angle = (angle / Math.PI) * 180;
      bulletContext.type = "enemyBullet";

      const bullet = this.#bulletFactory.createBullet(bulletContext, this);
      this.#timeCounter = 0;
    }
  }
}
