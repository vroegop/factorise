import { factorise } from '../factorise';
import { Factory } from '../factory';
import { Observer } from '../observer';
import { expect } from 'chai';
import 'mocha';

class TestFactory extends Factory {
    constructor() {
        super();
        this.register('testFactory');
    }

    do(oldState: any, payload: String) {
        return { ...oldState, value: payload };
    }
}

class TestObserver extends Observer {
    public oldState: any = {};
    public newState: any = {};

    constructor() {
        super();
        this.register();
    }

    public setCallback(callback: any) {
        this.callback = callback;
    }

    callback() {
        
    }

    public stateUpdate(newState: any, oldState: any) {
        this.newState = newState;
        this.oldState = oldState;
        this.callback();
    }
}

describe('Using factorise', () => {
    let testFactory: TestFactory;
    let testObserver: TestObserver;

    before(() => {
        testFactory = new TestFactory();
        testObserver = new TestObserver();
    });

    describe('Registering an observer', () => {
        it('should have a register observer method', () => {
            expect(typeof factorise.registerObserver).to.equal('function');
        });
    
        it('should have a unRegister observer method', () => {
            expect(typeof factorise.unregisterObserver).to.equal('function');
        });

        it('should not throw an exception if you register', () => {
            factorise.registerObserver(testObserver);
        });

        it('should not throw an exception if you unRegister', () => {
            factorise.unregisterObserver(testObserver);
        });
    });

    describe('Registering a factory', () => {
        it('should have a register factory method', () => {
            expect(typeof factorise.registerFactory).to.equal('function');
        });
    
        it('should have a unRegister factory method', () => {
            expect(typeof factorise.unregisterFactory).to.equal('function');
        });

        it('should not throw an exception if you register', () => {
            factorise.registerFactory(testFactory);
        });

        it('should not throw an exception if you unRegister', () => {
            factorise.unregisterFactory(testFactory);
        });
    });

    describe('having a factory and observer registered', () => {
        before(() => {
            factorise.registerObserver(testObserver);
            factorise.registerFactory(testFactory);
        });

        describe('if the observer triggers a factory', () => {
            it('the stateUpdate function should be called', (done) => {
                testObserver.setCallback(() => done());
                testObserver.executeFactory('testFactory', null);
            });

            it('the stateUpdate function should get the new and old state', (done) => {
                const testValue = 'testvalue';

                testObserver.setCallback(() => {
                    expect(testObserver.newState.value).to.equal(testValue);
                    expect(testObserver.oldState.value).to.be.null;
                    done();
                });

                testObserver.executeFactory('testFactory', testValue);
            });
        });
    });
});