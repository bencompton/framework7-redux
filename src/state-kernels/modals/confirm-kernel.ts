import { acceptConfirm, cancelConfirm } from '../../redux/actions/modal-actions';
import { IModalState, IModalMessageState } from '../../state/modals-state';
import { ModalMessageHelper } from './modal-message-helper';
import { StateKernel } from '../../state-kernel';

export class ConfirmKernel extends StateKernel<IModalMessageState> {
    private modalMessageHelper: ModalMessageHelper;

    public onFramework7Set(framework7: any) {
        this.modalMessageHelper = new ModalMessageHelper(framework7, [{
            text: 'Ok',
            onClick: () => this.dispatchAction(acceptConfirm())
        }, {
            text: 'Cancel',
            onClick: () => this.dispatchAction(cancelConfirm())
        }]);
    }

    protected getState(state: IModalState) {
        return state.modalMessage;
    }

    protected handleStateChange(state: IModalMessageState) {
        if (state.modalMessageType === 'confirm') {
            this.modalMessageHelper.handleStateChange(state);
        }
    }
}