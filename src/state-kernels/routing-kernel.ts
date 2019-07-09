import {StateKernel} from '../state-kernel';
import {IRoutingState} from '../state/routing-state';
import {IFramework7State} from '../state/framework7-state';
import {navigateTo} from '../redux/actions/routing-actions';
import {HistoryReconciler} from './routing/history-reconciler';

export class RoutingKernel extends StateKernel<IRoutingState> {
    protected getState(fullState: IFramework7State) {
        return fullState.routing;
    }

    protected handleStateChange(state: IRoutingState) {
        Object.keys(state.history).forEach((viewName) => {
            this.reconcileHistories(viewName, state.history[viewName]);        
        });
    }

    onFramework7Set() {
        this.framework7.once('pageInit', () => this.initializeHistory());        
    }

    private initializeHistory() {
        const mainView = this.framework7.views.find((view: any) => view.main);

        if (!mainView) {
            throw new Error('Framework7 Redux requires a main view');
        }

        this.framework7.views.forEach((view: any) => {
            const router = view.router;

            if (router.history.length) {
                router.history.forEach((f7HistoryUrl: string) => {
                    this.dispatchAction(navigateTo(f7HistoryUrl, false, view.name || view.main && 'main'));
                });
            }
        });
    }

    private reconcileHistories(viewName: string, newHistory: string[]) {
        if (!this.framework7) return;

        const view = this.framework7.views.find((view: any) => {
            if (viewName === 'main') {
                return view.main;
            } else {
                return view.name === viewName;
            }
        });

        if (!view) {
            // If view no longer exists, ignore it for now. The state for that view will get preserved in the store
            // and if that view gets recreated at some point, it will be restored to the correct state. For example,
            // if a page is using a routable panel that has a view with multiple pages, and that routable panel gets
            // destroyed after moving elsewhere, and then gets recreated after navigating back to the original page,
            // this will preserve the page in the panel where the user left off.
            return;
        }

        const reconciler = new HistoryReconciler(view.router, view.router.history, newHistory);
        
        reconciler
            .getOperationsToReconcileHistories()
            .forEach(operation => {
                if (operation.forward) {                    
                    view.router.navigate(operation.url, { reloadCurrent: operation.replace });                    
                } else {
                    view.router.back();
                }
            });
    }
}