"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Factorise {
    constructor() {
        this.factories = {};
        this.observers = [];
        this.oldState = {};
        this.newState = {};
    }
    static get instance() {
        return this.INSTANCE || (this.INSTANCE = new this());
    }
    registerFactory(factory) {
        this.factories[factory.id] = factory;
    }
    unregisterFactory(factory) {
        this.factories[factory.id] = null;
    }
    registerObserver(observer) {
        this.observers = [...this.observers, observer];
    }
    unregisterObserver(observer) {
        this.observers = [...this.observers.filter((o) => o !== observer)];
    }
    async execute(factoryId, payload) {
        const result = await this.factories[factoryId].do(Object.assign({}, this.newState), payload);
        this.oldState = this.newState;
        this.newState = Object.assign({}, result);
        this.notifyObservers();
    }
    notifyObservers() {
        this.observers.forEach((observer) => observer
            .stateUpdate(Object.freeze(this.newState), Object.freeze(this.oldState)));
    }
}
exports.factorise = Factorise.instance;
//# sourceMappingURL=factorise.js.map