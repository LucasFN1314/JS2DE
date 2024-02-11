import Entity from "../classes/entity.js";
import Chunk from "../classes/scenes/chunk.js";

export default class TestRoom {

    constructor(size) {
        this.name = "test_room";
        this.load = false;
        this.size = size;
        this.chunk_width = 10;
        this.chunk_height = 3;
        this.sprite_size = 33;
        window.scenes[this.name] = this;

        let entity = new Entity();
        entity.SetSprite("/src/images/sprites/Player/idle_01.png");
        entity.SetSize(20, 33)
        entity.SetScale(2)
        entity.SetZIndex(1);
        entity.UseCollider();

        this.chunks = [];
        this.chunk_entities = [
            {
                chunk: 0,
                entities: [
                    {
                        entity: entity,
                        position: {
                            x: 10,
                            y: 1
                        },
                        direction: -1
                    },
                    {
                        entity: player,
                        position: {
                            x: 1,
                            y: 1
                        },
                        direction: 1
                    },
                ]
            }
        ];
    }

    Load(player) {
        this.load = true;
        this.GenerateChunks();
    }

    GenerateChunks() {
        for (let chunk = 0; chunk < this.size; chunk++) {
            let _chunk = new Chunk({
                    width: this.chunk_width * this.size,
                    height: this.chunk_height
                },
                {
                    x: chunk * (this.chunk_width * this.sprite_size),
                    y: configuration.screen.height - this.chunk_height
                },
                this.sprite_size
            );

            let cEntities = [];

            this.chunk_entities.forEach((x) => {
                if(x.chunk === chunk) {
                    x.entities.forEach((e) => {
                        cEntities.push(e);
                    });
                }
            })
            _chunk.SetEntities(cEntities)
            _chunk.SetFloorSprite("/src/images/sprites/Scenes/grass_01.png", this.sprite_size)
            _chunk.DrawEntities();
            this.chunks.push(_chunk);
        }
    }

    Unload() {

    }

    Update() {
        // this.floor.sprite.x -=.8;
    }
}