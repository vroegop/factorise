"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const factorise_1 = require("./factorise");
class Factory {
    constructor() {
        this.id = "";
    }
    register(id) {
        if (id) {
            this.id = id;
            factorise_1.factorise.registerFactory(this);
        }
        else {
            throw Error("Registering this factory without an event is not possible. "
                + "A factory has to listen to an event. "
                + "Please call the register method with an eventName: `register(eventName: String)`");
        }
    }
    do(oldState, payload) {
        return Object.assign({}, oldState, payload);
    }
}
exports.Factory = Factory;
//# sourceMappingURL=factory.js.map