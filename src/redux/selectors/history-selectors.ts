const checkState = (state: any) => {
    if (!state.framework7 || !state.framework7.routing || !state.framework7.state.routing.history) {
        throw new Error('State must contain a property called "framework7" and must be controlled by the framework7-redux reducer!');
    }
};

export const getCurrentRoute = (state: { framework7: any }) => {
    checkState(state);

    return state.framework7.routing.history[state.framework7.routing.history.length - 1];
};

export const getPreviousRoute = (state: { framework7: any }) => {
    checkState(state);

    return state.framework7.routing.history[state.framework7.routing.history.length - 2];
};