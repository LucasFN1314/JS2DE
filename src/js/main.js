import Player from "./classes/player.js";
import CollisionSystem from "./CollisionSystem.js";
import Entity from "./classes/entity.js";
import Animation from "./classes/animation.js";
import SceneSystem from "./SceneSystem.js";
import MovementModule from "./classes/modules/MovementModule.js";

export default class Main {
    constructor() {
        this.Init();
    }

    HandleKeyboard() {
        function Abstraction(event, value) {
            document.addEventListener(event, (e) => {
                window.keys[e.key] = value;
                window.pressed[e.key] = value;
            })
        }

        Abstraction("keydown", true);
        Abstraction("keyup", false);
    }

    CreatePlayer() {
        this.player = new Player();
        this.player.SetSprite("/src/images/sprites/Player/idle_01.png");
        this.player.SetSpeed(1);
        this.player.SetSize(23, 33)
        this.player.SetScale(2);
        this.player.flipOnMove = true;
        this.player.SetKeys({
            up: "w",
            down: "s",
            left: "a",
            right: "d",
            run: "x"
        });

        this.player.SetZIndex(2);
        this.player.UseCollider(
            (collided) => {
            },
            (collided) => {
                console.log("COLLIDING", collided)
            },
            (collided) => {
                console.log("COLLIDING EXIT")
            }
        );
        window.player = this.player;
    }

    Init() {
        this.HandleKeyboard();
        this.CreatePlayer();

        let Collision_System = new CollisionSystem();
        let Scene_System = new SceneSystem(this.player);

        let ticker = app.ticker;
        ticker.minFPS = 60;
        ticker.maxFPS = 60;
        ticker.add((delta) => {
            this.player.Update();
            Collision_System.Handle();
            Scene_System.Handle();

            for (let i = 0; i < entities.length; i++) {
                entities[i].Update();
            }
        })
    }
}