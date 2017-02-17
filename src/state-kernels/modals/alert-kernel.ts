import {StateKernel} from '../../state-kernel';
import {IAlertState, IModalState} from '../../state/modals-state';
import {closeAlert} from '../../redux/actions/modal-actions';

export class AlertKernel extends StateKernel<IAlertState> {
    private alertModal: any;

    protected getState(fullState: IModalState) {
        return fullState.alert;
    }

    protected handleStateChange(state: IAlertState) {
        if (state.text || state.title) {
            this.showAlert(state.text, state.title);
        } else {
            this.closeAlert();
        }
    }

    private showAlert(text: string, title?: string) {
        if (!this.alertModal) {
            this.alertModal = this.framework7.modal({
                title: title,
                text: text,
                buttons: [{
                    text: 'Ok',
                    onClick: () => this.dispatchAction(closeAlert())
                }]
            }); 
        } else {
            this.closeAlert();
            this.showAlert(text, title);
        }
    }

    private closeAlert() {
        if (this.alertModal) {
            this.framework7.closeModal(this.alertModal);
            this.alertModal = null;
        }
    }    
}