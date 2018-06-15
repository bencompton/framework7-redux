import { StateKernel } from '../state-kernel';
import { IModalState } from '../state/modals-state';
import { IFramework7State } from '../state/framework7-state';
import { AlertKernel } from './modals/alert-kernel';
import { PreloaderKernel } from './modals/preloader-kernel';
import { ConfirmKernel } from './modals/confirm-kernel';

export class ModalKernel extends StateKernel<IModalState> {
    constructor() {
        super();

        this.children = [
            new AlertKernel(),
            new ConfirmKernel(),
            new PreloaderKernel()
        ]
    }

    protected getState(fullState: IFramework7State) {
        return fullState.modals;
    }

    protected handleStateChange(state: IModalState) {}
}