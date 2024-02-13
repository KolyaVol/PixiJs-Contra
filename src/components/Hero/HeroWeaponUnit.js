export default class HeroWeaponUnit {
  #bulletAngle;
  #bulletContext = {
    x: 0,
    y: 0,
    angle: 0,
  };

  #heroView;

  constructor(heroView) {
    this.#heroView = heroView;
  }

  get bulletContext() {
    this.#bulletContext.x =
      this.#heroView.x + this.#heroView.bulletPointShift.x;
    this.#bulletContext.y =
      this.#heroView.y + this.#heroView.bulletPointShift.y;

    this.#bulletContext.angle = this.#heroView.isFlipped
      ? this.#bulletAngle * -1 + 180
      : this.#bulletAngle;

    return this.#bulletContext;
  }

  setBulletAngle(isMoveRight, isMoveLeft, isArrowDown, isArrowUp, isJump) {
    if (isMoveLeft || isMoveRight) {
      if (isArrowUp) {
        this.#bulletAngle = -45;
      } else if (isArrowDown) {
        this.#bulletAngle = 45;
      } else {
        this.#bulletAngle = 0;
      }
    } else {
      if (isArrowUp) {
        this.#bulletAngle = -90;
      } else if (isArrowDown && isJump) {
        this.#bulletAngle = 90;
      } else {
        this.#bulletAngle = 0;
      }
    }
    console.log(this.#bulletAngle);
  }
}
