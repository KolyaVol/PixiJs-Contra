export default class Collision {
  constructor(entity, area) {
    this.entity = entity;
    this.area = area;
  }
  isCollideWithArr(areaArr) {
    const newArr = areaArr.map((area) => {
      return this.entity.x < area.x + area.width &&
        this.entity.x + this.entity.width > area.x &&
        this.entity.y < area.y + area.height &&
        this.entity.y + this.entity.height > area.y
        ? area.y
        : false;
    });
    for (let i = 0; i < newArr.length; i++) {
      const element = newArr[i];
      if (element) {
        return element;
      }
    }
  }
  isCollide() {
    return this.entity.x < this.area.x + this.area.width &&
      this.entity.x + this.entity.width > this.area.x &&
      this.entity.y < this.area.y + this.area.height &&
      this.entity.y + this.entity.height > this.area.y
      ? this.area.y
      : false;
  }
}
