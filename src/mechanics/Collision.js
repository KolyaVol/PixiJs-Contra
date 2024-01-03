export default class Collision {
  constructor(entity, area) {
    this.entity = entity;
    this.area = area;
  }
  isCollide() {
    return (
      this.entity.x < this.area.x + this.area.width &&
      this.entity.x + this.entity.width > this.area.x &&
      this.entity.y < this.area.y + this.area.height &&
      this.entity.y + this.entity.height > this.area.y
    );
  }
}
