import {combineReducers} from 'redux';

import {IFramework7State} from '../../state/framework7-state';
import {routingReducer} from './routing-reducer';
import {modalsReducer} from './modal-reducer';

export const framework7Reducer = combineReducers<IFramework7State>({
    routing: routingReducer,
    modals: modalsReducer
});