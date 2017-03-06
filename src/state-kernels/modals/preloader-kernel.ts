import {StateKernel} from '../../state-kernel';
import {IPreloaderState, IModalState} from '../../state/modals-state';

export class PreloaderKernel extends StateKernel<IPreloaderState> {
    private preloaderModal: any;

    protected getState(fullState: IModalState) {
        return fullState.preloader;
    }

    protected handleStateChange(state: IPreloaderState) {        
        if (state.visible) {
            this.showPreloader(state.loadingText);
        } else {
            this.hidePreloader();
        }        
    }

    private showPreloader(title: string) {
        if (!this.preloaderModal) {
            this.preloaderModal = this.framework7.showPreloader(title);
        } else {
            this.hidePreloader();
            this.showPreloader(title);
        }        
    }

    private hidePreloader() {
        if (this.preloaderModal) {
            this.framework7.hidePreloader();

            const tempPreloaderModal = this.preloaderModal;

            //Sometimes, a timing issue causes the preloader to not get cleaned up, so we're making sure it always does.
            setTimeout(() => {
                if (tempPreloaderModal) {
                    tempPreloaderModal.remove();
                }
            }, 100);

            this.preloaderModal = null;
        }
    }
}