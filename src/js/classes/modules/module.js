export default class Module {
    constructor(name, entity) {
        this.name = name;
        this.entity = entity;
    }
    Init () {
        throw("No Init function defined on module " + name);
    }
    Update () {
        throw("No Update function defined on module " + name);
    }
}