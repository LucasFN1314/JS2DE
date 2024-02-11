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
        this.player.SetKeys("w", "s", "a", "d", "x");
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
        let iddle_animation = new Animation(this.player);
        iddle_animation.name = "idle";
        iddle_animation.SetDelay(9999);
        iddle_animation.LoadRangeTextures("/src/images/sprites/Player", 1);

        let running_animation = new Animation(this.player);
        running_animation.name = "running";
        running_animation.SetDelay(160);
        running_animation.LoadRangeTextures("/src/images/sprites/Player/running", 6);

        this.player.AddAnimation(running_animation);
        this.player.AddAnimation(iddle_animation)

        let demo = new Entity();
        demo.SetSprite("/src/images/sprites/Player/idle_01.png");
        demo.SetSize(23, 33)
        demo.SetScale(3);
        demo.SetZIndex(0);
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