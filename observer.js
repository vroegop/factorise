"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const factorise_1 = require("./factorise");
class Observer {
    constructor() {
        this.newState = {};
        this.oldState = {};
    }
    register() {
        factorise_1.factorise.registerObserver(this);
    }
    /**
     * This function is an example of the stateUpdate function.
     * You can copy-paste this into your code if you extend the observer to implement updates.
     * Not overriding sets newState and oldState as properties.
     * That means that in Polymer for example, they are bound to the property.
     * @param newState the new state object
     * @param oldState the old state object
     */
    stateUpdate(newState, oldState) {
        this.newState = newState;
        this.oldState = oldState;
    }
    mapEventToFactory(element, event, factory) {
        element.addEventListener(event, (e) => factorise_1.factorise.execute(factory, e.detail));
    }
    executeFactory(factory, payload) {
        factorise_1.factorise.execute(factory, payload);
    }
}
exports.Observer = Observer;
//# sourceMappingURL=observer.js.map