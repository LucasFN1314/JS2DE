import Entity from "../classes/entity.js";
import Chunk from "../classes/scenes/chunk.js";
import {configuration} from "../../../configuration.js";
export default class TestRoom {

    constructor(size) {
        this.name = "test_room";
        this.load = false;
        this.size = size;
        this.chunk_width = 10;
        this.chunk_height = 3;
        this.sprite_size = 33;
        window.scenes[this.name] = this;

        this.chunks = [];
    }

    Load(player) {
        this.CreateChunk();
        this.load = true;
    }

    GeneratePolling() {
        // || Need 3 chunks, each one of the screen's size
        // || Each chunk has width divided by sprite size
        // || and a height of 40 blocks
    }

    LoadChunks() {

    }

    CreateChunk() {
        let material = "debug_tile";
        let width = configuration.screen.width / configuration.sprite.width;
        let init_height = Math.floor((configuration.screen.height - (configuration.screen.height / 2)) / configuration.sprite.height);
        let chunk_under_height = 7
        let blocks = [];

        for (let x = 0; x < width; x ++) {
            for (let y = init_height; y<init_height + chunk_under_height; y++) {
                let tile = new Entity();
                tile.SetSprite("/src/images/sprites/Textures/debug_tile.png");
                tile.SetPosition(x * configuration.sprite.width, y * configuration.sprite.height);

                blocks.push(tile);
            }
        }
        console.log(blocks)
    }

    Unload() {

    }

    Update() {
        // this.floor.sprite.x -=.8;
    }
}