import {IFramework7Action, SHOW_ALERT, CLOSE_ALERT, SHOW_PRELOADER, HIDE_PRELOADER} from '../actions';

export interface IAlertState {
    title: string;
    text: string;    
}

export interface IPreloaderState {
    visible: boolean;
}

export interface IModalState {
    alert: IAlertState;    
    preloader: IPreloaderState;
}

const initialState: IModalState = {
    alert: null,
    preloader: null
}

export const alertReducer = (state: IAlertState, action: IFramework7Action) => {
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

export const preloaderReducer = (state: IPreloaderState, action: IFramework7Action) => {
    switch (action.type) {
        case SHOW_PRELOADER:
            return {
                visible: true
            };
        case HIDE_PRELOADER:
            return {
                visible: false
            };
    }
};

export const modalsReducer = (state: IModalState = initialState, action: IFramework7Action) => {
    return {
        alert: alertReducer(state.alert, action),
        preloader: preloaderReducer(state.preloader, action)
    };
};