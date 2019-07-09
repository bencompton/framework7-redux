import {NavigateToAction, GoBackAction} from './framework7-actions';

export const navigateTo = (path: string, replace?: boolean, viewName: string = 'main'): NavigateToAction => {
    return {
        type: '@@FRAMEWORK7_NAVIGATE_TO',
        path,
        replace,
        viewName
    };
};

export const goBack = (viewName: string = 'main'): GoBackAction => {
    return {
        type: '@@FRAMEWORK7_GO_BACK',
        viewName
    };    
};
