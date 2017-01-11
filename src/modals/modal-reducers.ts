import {IFramework7Action, SHOW_ALERT, CLOSE_ALERT} from '../actions';

export interface IModalState {
    alert: {
        title: string;
        text: string;
    }
}

const initialState: IModalState = {
    alert: null
}

export const modalsReducer = (state: IModalState = initialState, action: IFramework7Action) => {
    switch (action.type) {
        case SHOW_ALERT:
            return {
                title: action.args.title,
                text: action.args.text
            };
        case CLOSE_ALERT:
            return {
                title: null,
                text: null
            };
        default:
            return state;
    }
};