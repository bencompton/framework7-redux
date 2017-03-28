import {combineReducers, Reducer} from 'redux';
import {ModalAction, ShowAlertAction, CloseAlertAction, ShowPreloaderAction, HidePreloaderAction} from '../actions/framework7-actions';
import {IModalState, IAlertState, IPreloaderState} from '../../state/modals-state';

const initialAlertState = {
    title: null,
    text: null
};

const initialPreloaderState = {
    loadingText: null,
    visible: false
};

export const alertReducer: Reducer<IAlertState> = (state: IAlertState = initialAlertState, action: ModalAction) => {
    switch (action.type) {
        case '@@FRAMEWORK7_SHOW_ALERT':
            return {
                title: action.title,
                text: action.text                               
            };
        case '@@FRAMEWORK7_CLOSE_ALERT':
            return {
                title: null,
                text: null
            };            
        default:
            return state;
    }
};

export const preloaderReducer: Reducer<IPreloaderState> = (state: IPreloaderState = initialPreloaderState, action: ModalAction) => {
    switch (action.type) {
        case '@@FRAMEWORK7_SHOW_PRELOADER':
            return {
                loadingText: action.loadingText,
                visible: true
            };
        case '@@FRAMEWORK7_HIDE_PRELOADER':
            return {
                loadingText: null,
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