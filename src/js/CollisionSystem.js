export default class CollisionSystem {
    constructor() {
        window.existent_collisions = [];
    }
    Handle () {
        for (let i = 0; i<entities.length; i++) {
            if (!entities[i].collider) continue;
            for (let j = 0; j<entities.length; j++) {
                if (!entities[j].collider || entities[i] === entities[j]) continue;
                this.CheckCollision(entities[i], entities[j]);
            }
        }

        this.ClearCollisions();
    }

    CheckCollision (obj1, obj2) {
        const box1 = obj1.GetBounds();
        const box2 = obj2.GetBounds();

        if (box1.x < box2.x + box2.width &&
            box1.x + box1.width > box2.x &&
            box1.y < box2.y + box2.height &&
            box1.height + box1.y > box2.y) {
            if(!existent_collisions.some(obj => obj.obj1 === obj1 && obj.obj2 === obj2)) {
                existent_collisions.push({obj1: obj1, obj2: obj2});
            }
            obj1.Emit("collision", obj2);
            obj2.Emit("collision", obj1);
        }
    }

    ClearCollisions () {
        existent_collisions.forEach((x) => {
            let obj1 = x.obj1;
            let obj2 = x.obj2;
            const box1 = obj1.GetBounds();
            const box2 = obj2.GetBounds();

            if (box1.x < box2.x + box2.width &&
                box1.x + box1.width > box2.x &&
                box1.y < box2.y + box2.height &&
                box1.height + box1.y > box2.y) {
                return;
            }
            else {
                existent_collisions.splice(existent_collisions.indexOf(x), 1);
                if(existent_collisions.length === 0) return;

                obj1.Emit("collisionExit", obj2);
                obj2.Emit("collisionExit", obj1);
            }
        })
    }
}