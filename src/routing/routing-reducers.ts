import {IFramework7Action, NAVIGATE_TO, GO_BACK} from '../actions';

export interface IRoutingState {
    history: string[];
}

const initialState: IRoutingState = {
    history: []
};

export const historyReducer = (state: string[], action: IFramework7Action) => {
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
    }
};

export const routingReducer = (state: IRoutingState = initialState, action: IFramework7Action) => {
    switch (action.type) {
        case NAVIGATE_TO:
        case GO_BACK:
            return {
                history: historyReducer(state.history, action)
            }
        case GO_BACK:
            return {

            };
        default:
            return state;
    }
};