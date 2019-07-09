import {combineReducers, Reducer} from 'redux';

import {
    ModalAction
} from '../actions/framework7-actions';
import {IModalState, IModalMessageState, IPreloaderState} from '../../state/modals-state';

const initialModalMessageState: IModalMessageState = {
    modalMessageType: null,
    title: null,
    text: null
};

const initialPreloaderState: IPreloaderState = {
    loadingText: null,
    visible: false
};

export const modalMessageReducer: Reducer<IModalMessageState> = (
    state: IModalMessageState = initialModalMessageState,
    action: ModalAction
) => {
    switch (action.type) {
        case '@@FRAMEWORK7_SHOW_CONFIRM':
            return {
                modalMessageType: 'confirm',
                title: action.title,
                text: action.text                               
            };
        case '@@FRAMEWORK7_SHOW_ALERT':
            return {
                modalMessageType: 'alert',
                title: action.title,
                text: action.text                               
            };
        case '@@FRAMEWORK7_CANCEL_CONFIRM':
        case '@@FRAMEWORK7_ACCEPT_CONFIRM':
        case '@@FRAMEWORK7_CLOSE_ALERT':
            return {
                modalMessageType: null,
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
    modalMessage: modalMessageReducer,
    preloader: preloaderReducer
});