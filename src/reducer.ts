import {combineReducers} from 'redux';

import {IRoutingState, routingReducer} from './routing/routing-reducers';
import {IModalState, modalsReducer} from './modals/modal-reducers';

export interface IFramework7State {    
    routing: IRoutingState,
    modals: IModalState    
}

export const framework7Reducer = combineReducers<IFramework7State>({
    routing: routingReducer,
    modals: modalsReducer
});