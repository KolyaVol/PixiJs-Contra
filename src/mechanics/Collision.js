export default class Collision {
  constructor() {}

  isCollideWithArr(areaArr, entity) {
    /*const collisionResult = {
      horizontal: false,
      vertical: false,
    };

    if (!this.isCheckAABB(aaRect, bbRect)) {
      return collisionResult;
    }

    aaRect.y = aaPrevPoint.y;
    if (!this.isCheckAABB(aaRect, bbRect)) {
      collisionResult.vertical = true;
      return collisionResult;
    }

    collisionResult.horizontal = true;
    return collisionResult;
    */
    let result = null;
    if (entity) {
      if (entity.stats) {
        areaArr.forEach((area) => {
          if (
            entity.x < area.x + area.width &&
            entity.x + entity.stats.width > area.x &&
            entity.y < area.y + area.height &&
            entity.y + entity.stats.height > area.y
          ) {
            result = {
              area: area,
              colDirection: "both",
            };
            if (
              entity.x == area.x + area.width &&
              entity.x + entity.stats.width == area.x
            ) {
              result.colDirection = "horizontal";
            } else if (
              entity.y < area.y + area.height &&
              entity.y + entity.stats.height > area.y
            ) {
              result.colDirection = "vertical";
            }
          }
        });
      } else {
        areaArr.forEach((area) => {
          if (
            entity.x < area.x + area.width &&
            entity.x + entity.width > area.x &&
            entity.y < area.y + area.height &&
            entity.y + entity.height > area.y
          )
            result = area;
        });
      }
    }

    return result ? result : "";
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
