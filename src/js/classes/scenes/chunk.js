import Entity from "../entity.js";

export default class Chunk {
    constructor (size, position, sprite_size) {
        this.size = size;
        this.position = position;
        this.isVisible = false;
        this.floor_sprite = null;
        this.floor = null;
        this.entities = [];
        this.sprite_size = sprite_size;
    }

    SetFloorSprite (path) {
        this.floor = new Entity();
        this.floor.SetTillingSprite(path, this.size.width * this.sprite_size, this.size.height * this.sprite_size);
        this.floor.SetPosition(this.position.x, this.position.y - this.floor.sprite.height)
        this.floor.SetZIndex(0);
    }

    SetEntities (entities) {
        this.entities = entities;
    }


    DrawEntities () {
        this.entities.forEach((entity) => {
            entity.entity.sprite.position.x = this.position.x + ((entity.position.x -1) * this.sprite_size) ;
            entity.entity.sprite.position.y = this.position.y - (this.floor.sprite.height + entity.entity.sprite.height);
            entity.entity.sprite.scale.x =  (entity.direction * entity.entity.sprite.scale.x);
        })
    }
}