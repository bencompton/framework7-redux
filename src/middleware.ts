import {applyMiddleware} from 'redux';
import {Framework7StateKernel} from './framework7-state-kernel';
import {IFramework7Action} from './actions';

const subscribeToActionsGeneratedInFramework7 = (
    kernel: Framework7StateKernel, 
    store: Redux.MiddlewareAPI<any>
) => {
    if (!kernel.hasActionDispatchHandler) {
        kernel.setActionDispatchHandler((framework7Action: Redux.Action) => {
            store.dispatch(framework7Action);
        });
    }
};

const applyActionToFramework7 = (kernel: Framework7StateKernel, framework7Action: string, args: any[]) => {
    kernel.handleFramework7Action(framework7Action, args);
};

export const framework7Middleware = (kernel: Framework7StateKernel) => {
    return (store: Redux.MiddlewareAPI<any>) => {
        return (next: Redux.Dispatch<any>) => {
            return (action: IFramework7Action): any => {
                subscribeToActionsGeneratedInFramework7(kernel, store);

                if (action.type.indexOf('@@FRAMEWORK7') !== -1) {
                    applyActionToFramework7(kernel, action.type, action.args);
                }

                return next(action);
            };
        };
    };
};