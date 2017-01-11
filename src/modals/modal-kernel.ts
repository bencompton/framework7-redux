import {StateKernelChild} from '../state-kernel-child';
import {closeAlert} from './modal-actions';

export class ModalKernel extends StateKernelChild {
    private alertModal: any;

    public showAlert(args: {text: string, title?: string}) {
        if (!this.alertModal) {
            this.alertModal = this.framework7.modal({
                title: args.title,
                text: args.text,
                buttons: [{
                    text: 'Ok',
                    onClick: () => this.parent.dispatchAction(closeAlert())
                }]
            }); 
        } else {
            this.closeAlert();
            this.showAlert({text: args.text, title: args.title});
        }
    }

    public closeAlert() {
        if (this.alertModal) {
            this.framework7.closeModal(this.alertModal);
            this.alertModal = null;
        }        
    }
}