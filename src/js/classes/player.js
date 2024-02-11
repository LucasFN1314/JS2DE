import Entity from "./entity.js";

export default class Player extends Entity {
    constructor() {
        super();

        this.keys = {};
        this.animations = [];
        this.speedMode = 1;

        this.current_state = "";
        this.running_animation = null;
    }

    Update() {
        super.Update();
        this.current_state = "idle";

        let up = keys[this.keys.up];
        let down = keys[this.keys.down];
        let left = keys[this.keys.left];
        let right = keys[this.keys.right];

        let hDir = (left) ? -1 : (right) ? 1 : 0;
        let vDir = (up) ? -1 : (down) ? 1 : 0;

        if (hDir || vDir) {
            this.Move("x", hDir);
            this.Move("y", vDir);

            if(left) this.FaceLeft();
            if(right) this.FaceRight();
        }

        if (pressed[this.keys.run]) this.SwitchSpeed();

        switch (this.current_state) {
            case "moving":
                this.PlayAnimation("running");
                break;
            default:
                this.PlayAnimation("idle");
                break;
        }
    }

    Move (axe, dir) {
        super.Move(axe, dir);
        this.current_state = "moving";
    }

    SwitchSpeed() {
        pressed[this.keys.run] = false;
        this.speedMode = this.speedMode === 1 ? 2 : 1;
        this.SetSpeed(this.speedMode === 1 ? 1 : 3);
    }

    SetKeys(up, down, left, right, run) {
        this.keys.up = up;
        this.keys.down = down;
        this.keys.left = left;
        this.keys.right = right;
        this.keys.run = run;
    }

    AddAnimation(animation) {
        this.animations.push(animation);
    }

    PlayAnimation(name) {
        if(this.running_animation === name) return;
        let animation = this.animations.find((animation) => animation.name === name);
        if (animation) {
            this.animations.forEach((x) => x.Stop());
            this.running_animation = name;
            animation.Play();
        }
    }
}