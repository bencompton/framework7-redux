export interface  StateKernel<TState> {
    onFramework7Set?(framework7?: any): void;
    onRouterSet?(router?: any): void;
}

export abstract class StateKernel<TState> {    
    private previousState: TState;
    private testMode: boolean;
    private actionDispatchHandler: (action: any) => void;    
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
        this.children.forEach(child => child.setActionDispatchHandler(actionDispatchHandler));
    }

    protected abstract handleStateChange(newState: TState): void
    protected abstract getState(state: any): TState

    protected dispatchAction(action: any) {
        this.actionDispatchHandler(action);
    }
}