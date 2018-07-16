import {StateKernel} from '../state-kernel';
import {IRoutingState} from '../state/routing-state';
import {IFramework7State} from '../state/framework7-state';
import {navigateTo} from '../redux/actions/routing-actions';
import {HistoryReconciler} from './routing/history-reconciler';

export class RoutingKernel extends StateKernel<IRoutingState> {
    private router: any;

    protected getState(fullState: IFramework7State) {
        return fullState.routing;
    }

    protected handleStateChange(state: IRoutingState) {        
        this.reconcileHistories(state.history);        
    }

    onFramework7Set() {
        this.framework7.once('pageInit', () => this.initializeHistory());        
    }

    private initializeHistory() {
        const mainView = this.framework7.views.find(view => view.main);

        if (!mainView) {
            throw new Error('Framework7 Redux requires a main view');
        }

        this.router = mainView.router;

        if (this.router.history.length) {
            this.router.history.forEach(f7HistoryUrl => {
                this.dispatchAction(navigateTo(f7HistoryUrl));
            });            
        }        
    }

    private reconcileHistories(newHistory: string[]) {
        if (!this.router || !this.framework7) return;

        const reconciler = new HistoryReconciler(this.router, this.router.history, newHistory);
        
        reconciler
            .getOperationsToReconcileHistories()
            .forEach(operation => {
                if (operation.forward) {                    
                    this.router.navigate(operation.url, { reloadCurrent: operation.replace });                    
                } else {
                    this.router.back();
                }
            });
    }
}