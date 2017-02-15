import {Store} from 'redux';

import {Framework7StateKernel} from './framework7-state-kernel';

export const syncFramework7WithStore = (store: Store<any>, stateKernel: Framework7StateKernel) => {
    store.subscribe(() => {
        stateKernel.stateChanged(store.getState());
    });

    stateKernel.setActionDispatchHandler((action) => {
        store.dispatch(action);
    });
};