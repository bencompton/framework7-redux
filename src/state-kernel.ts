export abstract class StateKernel<TState> {    
    protected children: StateKernel<any>[];
    protected framework7: any;
    protected router: any;
    protected previousState: TState;
    protected testMode: boolean;
    protected actionDispatchHandler: (action: any) => void;    

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
    }

    public setRouter(router: any) {
        this.router = router;
        this.children.forEach(child => child.setRouter(router));
    }

    public setActionDispatchHandler(actionDispatchHandler: (action: any) => void) {
        this.actionDispatchHandler = actionDispatchHandler;
        this.children.forEach(child => child.setActionDispatchHandler(actionDispatchHandler));
    }

    protected abstract handleStateChange(newState: TState): void
    protected abstract getState(state: any): TState
}