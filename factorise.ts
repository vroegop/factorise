import { Factory } from "./factory";
import { Observer } from "./observer";

class Factorise {
    private static INSTANCE: Factorise;

    private factories: any = {};
    private observers: Observer[] = [];

    private oldState: any = {};
    private newState: any = {};

    private constructor() {}

    public static get instance() {
        return this.INSTANCE || (this.INSTANCE = new this());
    }

    public registerFactory(factory: Factory) {
        this.factories[factory.id] = factory;
    }

    public unregisterFactory(factory: Factory) {
        this.factories[factory.id] = null;
    }

    public registerObserver(observer: Observer) {
        this.observers = [...this.observers, observer];
    }

    public unregisterObserver(observer: Observer) {
        this.observers = [...this.observers.filter((o) => o !== observer)];
    }

    public async execute(factoryId: string, payload: any) {
        const result: any = await this.factories[factoryId].do({ ...this.newState }, payload);
        this.oldState = this.newState;
        this.newState = { ...result };
        this.notifyObservers();
    }

    private notifyObservers() {
        this.observers.forEach((observer) => observer
            .stateUpdate(Object.freeze(this.newState), Object.freeze(this.oldState)));
    }
}

export const factorise = Factorise.instance;
