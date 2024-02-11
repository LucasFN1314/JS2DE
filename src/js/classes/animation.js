export default class Animation {
    constructor(entity) {
        this.entity = entity;
        this.textures = [];

        this.name = "";
        this.delay = 30;
        this.execution_interval = null;
        this.animation_index = 0;
    }

    LoadRangeTextures(path, range) {
        for (let i = 1; i <= range; i++) {
            let num = i < 10 ? `0${i}` : i
            this.textures.push(PIXI.Texture.from(`${path}/${this.name}_${num}.png`));
        }
    }

    Play() {
        if (!this.execution_interval) {
            execute(this);
            this.execution_interval = setInterval(() => {
                execute(this);
            }, this.delay)
        }

        function execute (self) {
            self.entity.sprite.texture = (self.textures[self.animation_index]);
            self.animation_index = self.animation_index < self.textures.length - 1 ? self.animation_index + 1 : 0
        }
    }

    Stop() {
        if (this.execution_interval) clearInterval(this.execution_interval);
        this.execution_interval = null;
    }

    SetName(name) {
        this.name = name;
    }

    SetDelay(delay) {
        this.delay = delay;
    }
}