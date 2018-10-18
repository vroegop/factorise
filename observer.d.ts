export declare class Observer {
    newState: any;
    oldState: any;
    register(): void;
    /**
     * This function is an example of the stateUpdate function.
     * You can copy-paste this into your code if you extend the observer to implement updates.
     * Not overriding sets newState and oldState as properties.
     * That means that in Polymer for example, they are bound to the property.
     * @param newState the new state object
     * @param oldState the old state object
     */
    stateUpdate(newState: any, oldState: any): void;
    mapEventToFactory(element: HTMLElement, event: string, factory: string): void;
    executeFactory(factory: string, payload: any): void;
}
