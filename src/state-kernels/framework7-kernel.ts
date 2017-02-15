import {StateKernel} from '../state-kernel';
import {IFramework7State} from '../state/framework7-state';
import {RoutingKernel} from './routing-kernel';
import {ModalKernel} from './modal-kernel';

export class Framework7StateKernel extends StateKernel<IFramework7State> {
    constructor(testMode: boolean) {
        super(testMode);

        this.children = [
            new RoutingKernel(),
            new ModalKernel()
        ];
    }

    protected handleStateChange() {}

    protected getState(fullState: any) {
        return fullState as IFramework7State;
    }
}