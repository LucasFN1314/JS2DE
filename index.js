import {configuration} from "./configuration.js";
import main from "./src/js/main.js";
let app = new PIXI.Application({
    width: configuration.screen.width,
    height: configuration.screen.height
})

document.body.appendChild(app.view);
window.app = app;
window.keys = {};
window.pressed = {};
window.entities = [];
window.debug = true;
window.pixi = PIXI;

window.COLLISION_EVENT = "collision";
window.main = new main();