//Modal actions
export interface ShowAlertAction {
    type: '@@FRAMEWORK7_SHOW_ALERT';
    title: string;
    text: string;
};

export interface CloseAlertAction {
    type: '@@FRAMEWORK7_CLOSE_ALERT';
};

export interface ShowPreloaderAction {
    type: '@@FRAMEWORK7_SHOW_PRELOADER';
    loadingText: string;
};

export interface HidePreloaderAction {
    type: '@@FRAMEWORK7_HIDE_PRELOADER';
};

export type ModalAction = ShowAlertAction | CloseAlertAction | ShowPreloaderAction | HidePreloaderAction;

//Routing actions
export interface NavigateToAction {
    type: '@@FRAMEWORK7_NAVIGATE_TO';
    path: string;
    replace: boolean;
};

export interface GoBackAction {
    type: '@@FRAMEWORK7_GO_BACK';
};

export type RoutingAction = NavigateToAction | GoBackAction;