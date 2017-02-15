//Modal actions
export const SHOW_ALERT = '@@FRAMEWORK7_SHOW_ALERT';
export const CLOSE_ALERT = '@@FRAMEWORK7_CLOSE_ALERT';
export const SHOW_PRELOADER = '@@FRAMEWORK7_SHOW_PRELOADER';
export const HIDE_PRELOADER = '@@FRAMEWORK7_HIDE_PRELOADER';

//Routing actions
export const NAVIGATE_TO = '@@FRAMEWORK7_NAVIGATE_TO';
export const GO_BACK = '@@FRAMEWORK7_GO_BACK';

export interface IFramework7Action extends Redux.Action {    
    args: any;
}

export const createFramework7Action = (framework7ActionType: string, args?: any) => {
    return {
        type: framework7ActionType,        
        args: args
    };
};