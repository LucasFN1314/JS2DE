import Module from "./module.js";

export default class MovementModule extends Module {

    constructor(entity) {
        super("MovementModule", entity);
        this.entity.keys = {
            up: null,
            down: null,
            left: null,
            right: null,
            run: null,
        };
        this.entity_keys = Object.keys(this.entity.keys);
        this.entity.speed = 0;

        this.entity.moving = {
            x: 0,
            y: 0,
        }

        this.entity.flipOnMove = false;
        this.MoveFunctions = {}

        this.entity.SetKeys = (keys) => {
            Object.keys(keys).forEach((x) => {
                this.entity.keys[x] = keys[x];
            })

            this.entity_keys = Object.keys(this.entity.keys);

            this.MoveFunctions["left"] = {
                function: this.HorizontalMove,
                params: -1,
                self: this,
            };

            this.MoveFunctions["right"] = {
                function: this.HorizontalMove,
                self: this,
                params: 1
            };

            this.MoveFunctions["up"] = {
                function: this.VerticalMove,
                self: this,
                params: -1
            };

            this.MoveFunctions["down"] = {
                function: this.VerticalMove,
                self: this,
                params: 1
            };
        }
        this.entity.SetSpeed = (speed) => {
            this.entity.speed = speed;
        }
        this.entity.GetSpeed = () => {
            return this.entity.speed;
        }
    }

    Update() {
        this.entity.moving = {
            x: 0,
            y: 0,
        }
        this.entity_keys.forEach((x) => {
            if (keys[this.entity.keys[x]] && this.MoveFunctions[x]) {
                this.MoveFunctions[x].function( this.MoveFunctions[x].self, this.MoveFunctions[x].params);
            }
        })
    }

    HorizontalMove (self, direction) {
        self.entity.moving.x = direction;
        self.Move("x", direction);
        if(!self.entity.flipOnMove) return;
        if (self.entity.sprite.scale.x === self.entity.scale && direction === -1) {
            self.entity.sprite.scale.x = -self.entity.scale;
            self.entity.sprite.position.x += self.entity.sprite.width / 2;
        }
        else if (self.entity.sprite.scale.x === -self.entity.scale && direction === 1) {
            self.entity.sprite.scale.x = self.entity.scale;
            self.entity.sprite.position.x -= self.entity.sprite.width / 2;
        }
    }

    VerticalMove (self, direction) {
        self.entity.moving.y = direction;
        self.Move("y", direction);
    }

    Move(axis, direction) {
        this.entity.sprite[axis] += direction * this.entity.speed;
        this.entity.Move();
    }
}