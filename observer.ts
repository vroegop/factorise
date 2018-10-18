import { factorise } from "./factorise";

export class Observer {
    public newState: any = {};
    public oldState: any = {};

    public register() {
        factorise.registerObserver(this);
    }

    /**
     * This function is an example of the stateUpdate function.
     * You can copy-paste this into your code if you extend the observer to implement updates.
     * Not overriding sets newState and oldState as properties.
     * That means that in Polymer for example, they are bound to the property.
     * @param newState the new state object
     * @param oldState the old state object
     */
    public stateUpdate(newState: any, oldState: any) {
        this.newState = newState;
        this.oldState = oldState;
    }

    public mapEventToFactory(element: HTMLElement, event: string, factory: string) {
        element.addEventListener(event, (e) => factorise.execute(factory, (e as CustomEvent).detail));
    }

    public executeFactory(factory: string, payload: any) {
        factorise.execute(factory, payload);
    }
}
