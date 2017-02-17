import {NavigateToAction, GoBackAction} from './framework7-actions';

export const navigateTo = (path: string, replace?: boolean): NavigateToAction => {
    return {
        type: '@@FRAMEWORK7_NAVIGATE_TO',
        path,
        replace
    };
};

export const goBack = (): GoBackAction => {
    return {
        type: '@@FRAMEWORK7_GO_BACK'
    };    
};