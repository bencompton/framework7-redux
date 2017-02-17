import {StateKernel} from '../state-kernel';
import {IRoutingState} from '../state/routing-state';
import {IFramework7State} from '../state/framework7-state';
import {navigateTo} from '../redux/actions/routing-actions';
import {HistoryReconciler} from './routing/history-reconciler';

export class RoutingKernel extends StateKernel<IRoutingState> {
    private previousHistory: string[];

    protected getState(fullState: IFramework7State) {
        return fullState.routing;
    }

    protected handleStateChange(state: IRoutingState) {        
        this.reconcileHistories(state.history);        
    }

    onFramework7Set() {
        this.initializeHistory();
    }

    private initializeHistory() {
        if (this.mainView.history.length) {
            this.mainView.history.forEach(f7HistoryUrl => {
                this.dispatchAction(navigateTo(f7HistoryUrl));
            });            
        }        
    }

    private reconcileHistories(newHistory: string[]) {
        if (!this.router || !this.framework7) return;

        const reconciler = new HistoryReconciler(this.router, this.mainView.history, newHistory);
        
        reconciler
            .getOperationsToReconcileHistories()
            .forEach(operation => {
                if (operation.forward) {                    
                    this.router.changeRoute(operation.url, this.mainView, { reload: operation.replace, url: operation.url });                    
                } else {
                    this.router.changeRoute(operation.url, this.mainView, { url: operation.url, isBack: true });                    
                }
            });
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
}