import { Factory } from "./factory";
import { Observer } from "./observer";
declare class Factorise {
    private static INSTANCE;
    private factories;
    private observers;
    private oldState;
    private newState;
    private constructor();
    static readonly instance: Factorise;
    registerFactory(factory: Factory): void;
    unregisterFactory(factory: Factory): void;
    registerObserver(observer: Observer): void;
    unregisterObserver(observer: Observer): void;
    execute(factoryId: string, payload: any): Promise<void>;
    private notifyObservers;
}
export declare const factorise: Factorise;
export {};
