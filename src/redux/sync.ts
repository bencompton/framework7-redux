import {Store} from 'redux';

import {Framework7StateKernel} from '../state-kernels/framework7-kernel';

export const syncFramework7WithStore = (store: Store<any>, stateKernel: Framework7StateKernel) => {
    store.subscribe(() => {
        stateKernel.setState(store.getState());
    });

    stateKernel.setActionDispatchHandler((action) => {
        store.dispatch(action);
    });
};