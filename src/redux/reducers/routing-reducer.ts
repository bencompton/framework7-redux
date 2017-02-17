import {combineReducers} from 'redux';
import {RoutingAction, NavigateToAction, GoBackAction} from '../actions/framework7-actions';
import {IRoutingState} from '../../state/routing-state';

const initialState: IRoutingState = {
    history: []
};

export const historyReducer = (state: string[] = [], action: RoutingAction) => {
    switch (action.type) {
        case '@@FRAMEWORK7_NAVIGATE_TO':
            const history = action.replace ? state.slice(0, state.length - 1) : state;
             
            return [            
                ...history,
                action.path
            ];
        case '@@FRAMEWORK7_GO_BACK':        
            return [
                ...state.slice(0, state.length - 1)
            ]; 
        default:
            return state;
    }
};

export const routingReducer = combineReducers<IRoutingState>({
    history: historyReducer
});