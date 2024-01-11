export default class Collision {
  constructor() {}

  isCollideWithArr(areaArr, entity) {
    let a = null;
    if (entity) {
      areaArr.forEach((area) => {
        if (
          entity.x < area.x + area.width &&
          entity.x + entity.width > area.x &&
          entity.y < area.y + area.height &&
          entity.y + entity.height > area.y
        )
          a = area;
      });
    }
    return a ? a : "";
  }

  bulletCollision(areaArr, entity, shooter) {
    let a = null;
    areaArr.forEach((area) => {
      console.log(shooter.y + entity.y + entity.height);
      console.log(area.y + area.height);

      if (
        shooter.x + shooter.width + entity.x < area.x + area.width &&
        shooter.x + shooter.width + entity.x > area.x &&
        shooter.y + entity.y < area.y + area.height &&
        shooter.y + entity.y + entity.height > area.y
      ) {
        a = true;
        console.log(a);
      }
    });
    return a;
  }

  isArrCollideWithArr(areaArr, entityArr) {
    /*
    for (let i = 0; i < entityArr.length; i++) {
      
      if (this.isCollideWithArr(areaArr, entityArr[i])) {
        console.log({
          entity: this.isCollideWithArr(areaArr, entityArr[i]),
          id: i,
        });
        return { entity: this.isCollideWithArr(areaArr, entityArr[i]), id: i };
      }
    }
  }*/
    console.log(areaArr);
    console.log(entityArr);
    entityArr ? console.log(this.isCollideWithArr(areaArr, entityArr[0])) : "";
  }
}
