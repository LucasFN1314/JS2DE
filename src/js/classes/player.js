import Entity from "./entity.js";
import MovementModule from "./modules/MovementModule.js";
import AnimationModule from "./modules/AnimationModule.js";
import Animation from "./animation.js";

export default class Player extends Entity {
    constructor() {
        super();
        this.speedMode = 1;

        this.Init();
    }

    Init () {
        this.AddModule((new AnimationModule(this)))
        this.AddModule(new MovementModule(this))

        let idle_animation = new Animation(this);
        idle_animation.name = "idle";
        idle_animation.SetDelay(9999);
        idle_animation.LoadRangeTextures("/src/images/sprites/Player", 1);

        let running_animation = new Animation(this);
        running_animation.name = "running";
        running_animation.SetDelay(160);
        running_animation.LoadRangeTextures("/src/images/sprites/Player/running", 6);

        this.AddAnimation(running_animation);
        this.AddAnimation(idle_animation)
    }

    Update() {
        super.Update();
        if (pressed[this.keys.run]) this.SwitchSpeed();


        if(this.moving.x === 0 && this.moving.y === 0) this.current_state = "idle";
        switch (this.current_state) {
            case "moving":
                this.PlayAnimation("running");
                break;
            default:
                this.PlayAnimation("idle");
                break;
        }

    }

    Move () {
        this.current_state = "moving";
    }
    SwitchSpeed() {
        pressed[this.keys.run] = false;
        this.speedMode = this.speedMode === 1 ? 2 : 1;
        this.SetSpeed(this.speedMode === 1 ? 1 : 3);
    }
}