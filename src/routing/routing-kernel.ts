import {StateKernelChild} from '../state-kernel-child';

export class RoutingKernel extends StateKernelChild {
    private get mainView() {
        const mainView = this.framework7 && this.framework7.views && this.framework7.views.reduce((mainView, nextView) => {
            if (nextView.main) {
                return nextView;
            } else {
                return mainView;
            }
        }, null);

        if (!mainView) {
            throw new Error('No main view found! A main view is required for routing.');
        }

        return mainView;
    } 

    public navigateTo(args: {path: string, reload: boolean}) {
        this.framework7.router.load(this.mainView, {
            url: args.path,
            reload: args.reload
        });        
    }

    public goBack() {
        this.framework7.router.back(this.mainView);
    }   
}

