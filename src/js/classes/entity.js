
export default class Entity {
    constructor() {
        this.x = 0;
        this.y = 0;

        this.width = 0;
        this.height = 0;

        this.scale = 1;
        this.collider = false;
        this.collider_graphic = null;
        this.collidingEntities = [];

        this.id = Math.random()
        entities.push(this);
        this.modules = [];
    }

    Update () {
        this.modules.forEach((x) => x.Update())
        if (this.collider && this.collider_graphic) {
            this.collider_graphic.position.x = this.sprite.x;
            this.collider_graphic.position.y = this.sprite.y;
        }
    }

    AddModule (module) {
        this.modules.push(module);
    }

    // ============================================================================================================== //

    SetSprite (path) {
        this.sprite = pixi.Sprite.from(path);
        container.addChild(this.sprite);
        this.SavePosition();
    }

    SetTillingSprite (path, width, height) {
        const texture = PIXI.Texture.from(path);
        this.sprite = new PIXI.TilingSprite(texture, width, height);
        container.addChild(this.sprite);
        this.SavePosition();
    }

    SavePosition () {
        this.x = this.sprite.x;
        this.y = this.sprite.y;
    }

    SetPosition (x, y) {
        this.sprite.x = x;
        this.sprite.y = y;
        this.SavePosition();
    }

    SaveSize () {
        this.width = this.sprite.width;
        this.height = this.sprite.height;
    }

    RemoveSprite () {
        app.stage.removeChild(this.sprite);
    }

    SetScale (scale) {
        this.sprite.width = this.sprite.width * scale;
        this.sprite.height = this.sprite.height * scale;
        this.sprite.scale.x = scale;
        this.sprite.scale.y = scale;
        this.scale = scale;
        this.SaveSize();
    }

    SetSize (width, height) {
        this.sprite.width = width;
        this.sprite.height = height;
        this.SaveSize();
    }

    GetBounds () {
        return this.sprite.getBounds();
    }

    UseCollider (CollisionStay = () => {}, Collision = () => {}, CollisionExit = () => {}) {
        if(this.collider) return;
        this.collider = true;

        this.sprite.on("collision", (collided) => {
            if(!this.collidingEntities.includes(collided)) {
                this.collidingEntities.push(collided);
                Collision(collided)
            }
            CollisionStay(collided)
        });

        this.sprite.on("collisionExit", (collided) => {
            this.collidingEntities.splice(this.collidingEntities.indexOf(collided), 1);
            CollisionExit(collided)
        });
    }

    SetZIndex (zIndex) {
        this.sprite.zIndex = zIndex;
        container.sortChildren();
    }

    Emit (event, value) {
        this.sprite.emit(event, value);
    }
}