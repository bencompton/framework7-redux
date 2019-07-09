export interface IRoutingHistoryState {
    [viewName: string]: string[];
}

export interface IRoutingState {
    history: IRoutingHistoryState;
}