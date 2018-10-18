import { factorise } from "./factorise";

export class Factory {
    public id: string = "";

    public register(id: string) {
        if (id) {
            this.id = id;
            factorise.registerFactory(this);
        } else {
            throw Error("Registering this factory without an event is not possible. "
                + "A factory has to listen to an event. "
                + "Please call the register method with an eventName: `register(eventName: String)`");
        }
    }

    public do(oldState: any, payload: any) {
        return { ...oldState, ...payload };
    }
}
