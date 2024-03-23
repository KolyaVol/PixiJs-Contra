import Entity from "../../Entity.js";

export default class BossGun extends Entity {
  #target;
  #bulletFactory;
  #timeCounter = 0;
  #health = 5;

  type = "BossGun";
  group = "Enemy";

  constructor(view, target, bulletFactory) {
    super(view);
    this.view = view;
    this.#target = target;
    this.#bulletFactory = bulletFactory;

    this.isActive = false;
  }

  update() {
    if (this.#target.isDead) {
      return;
    }

    if (!this.isActive) {
      if (this.x - this.#target.x < 512 + this.view.collisionBox.width * 2) {
        this.isActive = true;
      }
      return;
    }

    this.#fire();
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

  #fire() {
    this.#timeCounter++;

    if (this.#timeCounter < 50 && Math.random() > 0.01) {
      return;
    }

    const bulletContext = {
      x: this.x,
      y: this.y,
      angle: 180,
      type: "enemyBullet",
    };

    this.#bulletFactory.createBullet(bulletContext, this);
    this.#timeCounter = 0;
  }
}
