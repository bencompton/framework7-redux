export interface IModalMessageState {
    modalMessageType: 'alert' | 'confirm';
    title: string;
    text: string;    
}

export interface IPreloaderState {
    visible: boolean;
    loadingText?: string;
}

export interface IModalState {
    modalMessage: IModalMessageState;    
    preloader: IPreloaderState;
}