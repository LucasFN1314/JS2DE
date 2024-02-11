import Entity from "../classes/entity.js";

export default class TestRoom {

    constructor(player) {
        this.name = "test_room";
        this.load = false;

       /* floor.SetSprite("/src/images/sprites/Player/master.png");
        floor.SetSize(23, 33)
        floor.SetPosition(0, 0)
        floor.UseCollider();*/

        this.y_player_position = configuration.screen.height - 25 - player.sprite._height;
        this.x_player_position = 0;

        window.scenes[this.name] = this;
    }

    Load(player) {
        this.load = true;
        this.floor = new Entity();

        this.floor.SetTillingSprite("/src/images/sprites/Scenes/grass_01.png", configuration.screen.width, 33);
        this.floor.SetSize(5000, 33)
        this.floor.SetPosition(0, configuration.screen.height - 33)
        this.floor.UseCollider();
        this.floor.SetZIndex(1);

        player.SetPosition( this.x_player_position, this.y_player_position );
    }

    Unload() {

    }

    Update () {
        this.floor.sprite.x -=.8;
    }
}