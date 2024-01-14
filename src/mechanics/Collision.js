export default class Collision {
  constructor() {}

  /*isCollideWithArr(entity, areaArr) {
    let result = null;
    for (let i = 0; i < areaArr.length; i++) {
      const collisionOrientation = this.checkCollisionOrientation(
        entity,
        areaArr[i],
        entity.prevPoint
      );
      if (
        collisionOrientation.horizontal === false &&
        collisionOrientation.vertical === false
      ) {
        continue;
      } else {
        result = { area: areaArr[i], collisionOrientation };
      }
    }
    return result ? result : "";
  }*/

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
        console.log(collisionResult);
        return collisionResult;
      } else {
        entity.y = prevY;
        collisionResult.horizontal = true;
        console.log(collisionResult);
        return collisionResult;
      }
    }
  }

  isCollide(entity, area) {
    return (
      entity.x < area.x + area.width &&
      entity.x + entity.width > area.x &&
      entity.y < area.y + area.height &&
      entity.y + entity.height > area.y
    );
  }

  bulletCollision(areaArr, entity, shooter) {
    let result = null;
    areaArr.forEach((area) => {
      if (
        shooter.x + shooter.width + entity.x < area.x + area.width &&
        shooter.x + shooter.width + entity.x > area.x &&
        shooter.y + entity.y < area.y + area.height &&
        shooter.y + entity.y + entity.height > area.y
      ) {
        result = true;
      }
    });
    return result;
  }
}
