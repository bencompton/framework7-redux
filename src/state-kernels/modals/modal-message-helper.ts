import { IModalState, IModalMessageState } from "../../state/modals-state";
import { StateKernel } from "../../state-kernel";

export interface IModalMessageButton {
    text: string, onClick(): void
}

export class ModalMessageHelper {
    private modal: any;
    private framework7: any;
    protected buttons: IModalMessageButton[];

    constructor(framework7: any, buttons: IModalMessageButton[]) {
        this.framework7 = framework7;
        this.buttons = buttons;
    }

    public handleStateChange(state: IModalMessageState) {
        if (state.text || state.title) {
            this.show(state.text, state.title);
        } else {
            this.close();
        }
    }

    private show(text: string, title: string) {
        if (!this.modal) {
            this.modal = this.framework7.customModal({
                title,
                text,
                buttons: this.buttons
            }); 
        } else {
            this.close();
            this.show(text, title);
        }
    }

    private close() {
        if (this.modal) {
            this.framework7.closeModal(this.modal);
            this.modal = null;
        }
    }    
}