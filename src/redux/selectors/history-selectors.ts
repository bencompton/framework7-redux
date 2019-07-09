const checkState = (state: any) => {
    if (!state.framework7 || !state.framework7.routing || !state.framework7.routing.history) {
        throw new Error('State must contain a property called "framework7" and must be controlled by the framework7-redux reducer!');
    }
};

export const getCurrentRoute = (state: { framework7: any }, viewName: string = 'main') => {
    checkState(state);

    return state.framework7.routing.history[viewName][state.framework7.routing.history[viewName].length - 1] as string;
};

export const getPreviousRoute = (state: { framework7: any }, viewName: string = 'main') => {
    checkState(state);

    return state.framework7.routing.history[viewName][state.framework7.routing.history[viewName].length - 2] as string;
};