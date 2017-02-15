import {createFramework7Action, SHOW_ALERT, CLOSE_ALERT, SHOW_PRELOADER, HIDE_PRELOADER} from './framework7-actions';

export const showAlert = (text: string, title?: string) => {
    return createFramework7Action(SHOW_ALERT, {
        text,
        title
    });
};

export const closeAlert = () => {
    return createFramework7Action(CLOSE_ALERT);
};

export const showPreloader = () => {
    return createFramework7Action(SHOW_PRELOADER);
};

export const hidePreloader = () => {
    return createFramework7Action(HIDE_PRELOADER);
};