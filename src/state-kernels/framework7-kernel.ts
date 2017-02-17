import {StateKernel} from '../state-kernel';
import {IFramework7State} from '../state/framework7-state';
import {RoutingKernel} from './routing-kernel';
import {ModalKernel} from './modal-kernel';

export class Framework7StateKernel extends StateKernel<IFramework7State> {
    constructor(testMode: boolean = false) {
        super(testMode);

        this.children = [
            new RoutingKernel(),
            new ModalKernel()
        ];
    }

    protected handleStateChange() {}

    protected getState(fullState: any) {
        return fullState.framework7 as IFramework7State;
    }
}