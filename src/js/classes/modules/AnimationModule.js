import Module from "./module.js";
export default class AnimationModule extends Module {
    constructor(entity) {
        super("AnimationModule", entity);

        this.entity.animations = [];
        this.entity.current_state = "idle";
        this.entity.running_animation = null;

        this.entity.AddAnimation = (animation) => {
            this.entity.animations.push(animation);
        }

        this.entity.PlayAnimation = (name) => {
            if(this.entity.running_animation === name) return;
            let animation = this.entity.animations.find((animation) => animation.name === name);
            if (animation) {
                this.entity.animations.forEach((x) => x.Stop());
                this.entity.running_animation = name;
                animation.Play();
            }
        }
    }

    Update () {

    }
}