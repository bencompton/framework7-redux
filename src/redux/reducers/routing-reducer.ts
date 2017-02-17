import {combineReducers} from 'redux';
import {IFramework7Action, NAVIGATE_TO, GO_BACK} from '../actions/framework7-actions';
import {IRoutingState} from '../../state/routing-state';

const initialState: IRoutingState = {
    history: []
};



export const historyReducer = (state: string[] = [], action: IFramework7Action) => {
    switch (action.type) {
        case NAVIGATE_TO:
            const history = action.args.replace ? state.slice(0, state.length - 1) : state;
             
            return [            
                ...history,
                action.args.path
            ];
        case GO_BACK:        
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