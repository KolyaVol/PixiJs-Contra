import Entity from "../../Entity.js";

export default class Boss extends Entity {
  type = "Boss";
  group = "Enemy";
  isBoss = true;

  constructor(view) {
    super(view);
    this.hp = 5;
    this.view = view;
    this.isActive = true;
  }

  update() {}

  damage() {
    this.hp--;

    if (this.hp < 1) {
      this.isActive = false;

      const deadAnimation = this._view.showAndGetDeadAnimation();
      deadAnimation.onComplete = () => {
        this._view.showAdditionalExplosions();
        deadAnimation.removeFromParent();
        this.dead();
      };
    }
  }
}
