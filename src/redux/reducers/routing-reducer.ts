import {combineReducers, Reducer} from 'redux';
import {RoutingAction} from '../actions/framework7-actions';
import {IRoutingState, IRoutingHistoryState} from '../../state/routing-state';

const initialState: IRoutingHistoryState = {
    main: []
};

export const historyReducer: Reducer<IRoutingHistoryState> = (state: IRoutingHistoryState = initialState, action: RoutingAction) => {
    switch (action.type) {
        case '@@FRAMEWORK7_NAVIGATE_TO':
            let currentHistory = state[action.viewName] || [];

            if (action.replace) {
                currentHistory = currentHistory.slice(0, state[action.viewName].length - 1)
            }

            return {
                ...state,
                [action.viewName]: [...currentHistory, action.path]
            };
        case '@@FRAMEWORK7_GO_BACK':
            const editedHistory = [...state[action.viewName].slice(0, state[action.viewName].length - 1)];
        
            return {
                ...state,
                [action.viewName]: editedHistory
            };
        default:
            return state;
    }
};

export const routingReducer = combineReducers<IRoutingState>({
    history: historyReducer
});