import {IFramework7Action, HISTORY_UPDATED} from '../actions';

export interface IRoutingState {
    history: string[];
}

const initialState: IRoutingState = {
    history: []
};

export const routingReducer = (state: IRoutingState = initialState, action: IFramework7Action) => {
    switch (action.type) {
        case HISTORY_UPDATED:
            return {
                history: action.args.history
            };
        default:
            return state;
    }
};