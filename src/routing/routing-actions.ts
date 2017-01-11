import {createFramework7Action, NAVIGATE_TO, GO_BACK} from '../actions';

export const navigateTo = (path: string, replace?: boolean) => {
    return createFramework7Action(NAVIGATE_TO, {
        path,
        replace
    });
};

export const goBack = () => {
    return createFramework7Action(GO_BACK);
};