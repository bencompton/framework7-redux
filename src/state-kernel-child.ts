import {Framework7StateKernel} from './framework7-state-kernel';

export class StateKernelChild {
    protected parent: Framework7StateKernel;
    protected framework7: any;

    constructor(parent: Framework7StateKernel) {
        this.parent = parent;
    }

    public setFramework7(framework7: any) {
        this.framework7 = framework7;
    }
}