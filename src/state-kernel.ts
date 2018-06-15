export interface  StateKernel<TState> {
    onFramework7Set?(framework7?: any): void;
    onRouterSet?(router?: any): void;
}

interface ActionListener {
    actionType: string;
    callback: (action: any) => void;
    single: boolean;
}

export abstract class StateKernel<TState> {    
    private previousState: TState;
    private testMode: boolean;
    private actionDispatchHandler: (action: any) => void;    
    private actionListeners: ActionListener[] = [];
    protected children: StateKernel<any>[] = [];
    protected framework7: any;
    protected router: any;

    constructor(testMode: boolean = false) {
        this.testMode = testMode;
    }

    public setState(newFullState: any) {
        if (this.testMode) return;

        const myNewState = this.getState(newFullState);

        if (myNewState != this.previousState) {
            this.handleStateChange(myNewState);
        }

        this.previousState = myNewState;

        this.children.forEach(child => {
            child.setState(myNewState);
        });
    }

    public setTestMode(testMode: boolean) {
        this.testMode = testMode;
    }

    public setFramework7(framework7: any) {
        this.framework7 = framework7;
        this.children.forEach(child => child.setFramework7(framework7));
        if (this.onFramework7Set) this.onFramework7Set(framework7);
    }

    public setRouter(router: any) {
        this.router = router;
        this.children.forEach(child => child.setRouter(router));
        if (this.onRouterSet) this.onRouterSet(router);
    }

    public setActionDispatchHandler(actionDispatchHandler: (action: any) => void) {
        this.actionDispatchHandler = actionDispatchHandler;
        this.children.forEach(child => child.setActionDispatchHandler(this.dispatchAction.bind(this)));
    }

    public listenForAction(actionType: string, callback: (action: any) => void, single: boolean = false) {
        this.actionListeners.push({
            actionType,
            callback,
            single
        });
    }

    public getActionPromise(actionType: string) {
        return new Promise(resolve => {
            this.listenForAction(actionType, resolve, true);
        });
    }

    public dispatchAction(action: any) {
        this.actionDispatchHandler(action);

        this.actionListeners.forEach(listener => {
            if (listener.actionType === action.type) {
                listener.callback(action);
            }
        });

        this.actionListeners = this.actionListeners.filter(listener => listener.actionType !== action.type || !listener.single);
    }    

    protected abstract handleStateChange(newState: TState): void;
    protected abstract getState(state: any): TState;
}