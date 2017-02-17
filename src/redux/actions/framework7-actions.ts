//Modal actions
export type ShowAlertAction = {
    type: '@@FRAMEWORK7_SHOW_ALERT';
    title: string;
    text: string;
};

export type CloseAlertAction = {
    type: '@@FRAMEWORK7_CLOSE_ALERT';
};

export type ShowPreloaderAction = {
    type: '@@FRAMEWORK7_SHOW_PRELOADER';
    loadingText: string;
};

export type HidePreloaderAction = {
    type: '@@FRAMEWORK7_HIDE_PRELOADER';
};

export type ModalAction = ShowAlertAction | CloseAlertAction | ShowPreloaderAction | HidePreloaderAction;

//Routing actions
export type NavigateToAction = {
    type: '@@FRAMEWORK7_NAVIGATE_TO';
    path: string;
    replace: boolean;
};

export type GoBackAction = {
    type: '@@FRAMEWORK7_GO_BACK';
};

export type RoutingAction = NavigateToAction | GoBackAction;