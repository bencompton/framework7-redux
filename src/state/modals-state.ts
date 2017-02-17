export interface IAlertState {
    title: string;
    text: string;    
}

export interface IPreloaderState {
    visible: boolean;
    loadingText?: string;
}

export interface IModalState {
    alert: IAlertState;    
    preloader: IPreloaderState;
}