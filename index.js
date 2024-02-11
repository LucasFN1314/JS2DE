import {configuration} from "./configuration.js";
import main from "./src/js/main.js";
let app = new PIXI.Application({
    width: configuration.screen.width,
    height: configuration.screen.height
})

const container = new PIXI.Container()
container.sortChildren();

document.body.appendChild(app.view);
window.app = app;
window.keys = {};
window.pressed = {};
window.entities = [];
window.debug = true;
window.pixi = PIXI;
window.container = container;
app.stage.addChild(container);

window.COLLISION_EVENT = "collision";
window.main = new main();