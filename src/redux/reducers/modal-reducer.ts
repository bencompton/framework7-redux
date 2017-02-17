import {combineReducers} from 'redux';
import {IFramework7Action, SHOW_ALERT, CLOSE_ALERT, SHOW_PRELOADER, HIDE_PRELOADER} from '../actions/framework7-actions';
import {IModalState, IAlertState, IPreloaderState} from '../../state/modals-state';

const initialAlertState = {
    title: null,
    text: null
};

const initialPreloaderState = {
    title: null,
    visible: false
};

export const alertReducer = (state: IAlertState = initialAlertState, action: IFramework7Action) => {
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

export const preloaderReducer = (state: IPreloaderState = initialPreloaderState, action: IFramework7Action) => {
    switch (action.type) {
        case SHOW_PRELOADER:
            return {
                title: action.args.title,
                visible: true
            };
        case HIDE_PRELOADER:
            return {
                title: null,
                visible: false
            };
        default:
            return state;
    }
};

export const modalsReducer = combineReducers<IModalState>({
    alert: alertReducer,
    preloader: preloaderReducer
});