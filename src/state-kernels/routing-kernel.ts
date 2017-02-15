import {StateKernel} from '../state-kernel';
import {IRoutingState} from '../state/routing-state';
import {IFramework7State} from '../state/framework7-state';

export class RoutingKernel extends StateKernel<IRoutingState> {
    private previousHistory: string[];

    protected getState(fullState: IFramework7State) {
        return fullState.routing;
    }

    protected handleStateChange(state: IRoutingState) {        
        this.reconcileHistories(state.history);        
    }

    private reconcileHistories(newHistory: string[]) {
        const mainView = this.mainView;
        const f7History: string[] = this.mainView.history;

        let historyIndex = 0;

        //Bring Framework7 back to the last matching point in the state history
        while (historyIndex < newHistory.length) {
            const currentNewHistoryUrl = newHistory[historyIndex];
            const currentF7HistoryUrl = f7History[historyIndex];

            if (currentF7HistoryUrl && currentF7HistoryUrl) {
                const f7PagePath = this.router.findMatchingRoute(currentF7HistoryUrl);
                const newHistoryPagePath = this.router.findMatchingRoute(currentNewHistoryUrl);

                if (f7PagePath !== newHistoryPagePath) {
                    const pagesToGoBack = (f7History.length - historyIndex);
                    this.goBack(pagesToGoBack);
                    historyIndex++;
                    break;
                }
            }

            historyIndex++;            
        }

        if (f7History.length > newHistory.length) {
            this.goBack(f7History.length - newHistory.length);
        }

        //Move Framework7 forward to the last point in state history
        while (historyIndex < newHistory.length) {
            this.navigateTo(newHistory[historyIndex], false);
            historyIndex++;
        }
    }

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

    private navigateTo(path: string, reload: boolean) {
        this.router.changeRoute(path, this.mainView, { reload });
    }

    private goBack(numberOfTimes = 1) {
        const path = '';

        for (let i = 0; i < numberOfTimes; i++) {
            this.router.changeRoute(path, this.mainView, { isBack: true });            
        }
    }   
}
