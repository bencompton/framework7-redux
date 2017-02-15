export interface IAlertState {
    title: string;
    text: string;    
}

export interface IPreloaderState {
    visible: boolean;
    title?: string;
}

export interface IModalState {
    alert: IAlertState;    
    preloader: IPreloaderState;
}