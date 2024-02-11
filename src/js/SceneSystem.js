import TestRoom from "./scenes/test_room.js";

export default class SceneSystem {
    constructor(player) {
        this.player = player;
        this.current_scene = "test_room";

        let test_room = new TestRoom(1);
    }

    Handle () {
        if(!scenes[this.current_scene].load){
            scenes[this.current_scene].Load(this.player);
        }

        scenes[this.current_scene].Update();
    }
}