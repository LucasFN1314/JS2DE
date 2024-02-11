import Player from "./classes/player.js";
import CollisionSystem from "./CollisionSystem.js";
import Entity from "./classes/entity.js";
import Animation from "./classes/animation.js";

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
        this.player.SetScale(3);
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
                console.log("COLLIDING")
            },
            (collided) => {
                console.log("COLLIDING EXIT")
            }
        );


        let demo = new Entity();
        demo.SetSprite("/src/images/sprites/Player/idle_01.png");
        demo.SetSize(23, 33)
        demo.SetScale(3);
        demo.SetZIndex(1);
        demo.SetPosition(100, 100)
        demo.UseCollider();
    }

    Init() {
        this.HandleKeyboard();
        this.CreatePlayer();

        let Collision_System = new CollisionSystem();

        let ticker = app.ticker;
        ticker.minFPS = 60;
        ticker.maxFPS = 60;
        ticker.add((delta) => {
            this.player.Update();
            Collision_System.Handle();

            for (let i = 0; i < entities.length; i++) {
                entities[i].Update();
            }
        })
    }
}