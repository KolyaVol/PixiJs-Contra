export default class Collision {
  constructor() {}

  checkArrCollisionOrientation(entity, areaArr) {
    const collisionResult = {
      area: null,
      isCollide: false,
      horizontal: false,
      vertical: false,
    };

    for (let i = 0; i < areaArr.length; i++) {
      const result = this.checkCollisionOrientation(entity, areaArr[i]);
      if (result.horizontal === true) {
        collisionResult.horizontal = true;
        collisionResult.isCollide = true;
      }
      if (result.vertical === true) {
        collisionResult.area = areaArr[i];
        collisionResult.vertical = true;
        collisionResult.isCollide = true;
      }
    }
    console.log(collisionResult);
    return collisionResult;
  }

  checkCollisionOrientation(entity, area) {
    const collisionResult = {
      horizontal: false,
      vertical: false,
    };
    if (!this.isCollide(entity, area)) {
      return collisionResult;
    } else {
      const prevY = entity.y;
      entity.y = entity.prevPoint.y;
      if (!this.isCollide(entity, area)) {
        collisionResult.vertical = true;
        entity.y = prevY;
        return collisionResult;
      } else {
        entity.y = prevY;
        collisionResult.horizontal = true;
        return collisionResult;
      }
    }
  }

  isCollide(entity, area) {
    return (
      entity.x < area.x + area.width &&
      entity.x + entity.view.collisionBox.width > area.x &&
      entity.y < area.y + area.height &&
      entity.y + entity.view.collisionBox.height > area.y
    );
  }
}
