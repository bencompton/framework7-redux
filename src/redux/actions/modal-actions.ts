import {
    ShowAlertAction,
    CloseAlertAction,
    ShowPreloaderAction,
    HidePreloaderAction,
    CancelConfirmAction,
    AcceptConfirmAction,
    ShowConfirmAction
} from './framework7-actions';

export const showAlert = (text: string, title?: string): ShowAlertAction => {
    return {
        type: '@@FRAMEWORK7_SHOW_ALERT',
        text,
        title
    };
};

export const closeAlert = (): CloseAlertAction => {
    return { type: '@@FRAMEWORK7_CLOSE_ALERT' };
};

export const showConfirm = (text: string, title?: string): ShowConfirmAction => {
    return {
        type: '@@FRAMEWORK7_SHOW_CONFIRM',
        text,
        title
    }
}

export const cancelConfirm = (): CancelConfirmAction => {
    return { type: '@@FRAMEWORK7_CANCEL_CONFIRM' };
};

export const acceptConfirm = (): AcceptConfirmAction => {
    return { type: '@@FRAMEWORK7_ACCEPT_CONFIRM' };
}

export const showPreloader = (loadingText?: string): ShowPreloaderAction => {
    return {
        type: '@@FRAMEWORK7_SHOW_PRELOADER',
        loadingText: loadingText
    };
};

export const hidePreloader = (): HidePreloaderAction => {
    return { type: '@@FRAMEWORK7_HIDE_PRELOADER' };
};