import {createFramework7Action, SHOW_ALERT, CLOSE_ALERT} from '../actions';

export const showAlert = (text: string, title?: string) => {
    return createFramework7Action(SHOW_ALERT, {
        text,
        title
    });
};

export const closeAlert = () => {
    return createFramework7Action(CLOSE_ALERT);
};