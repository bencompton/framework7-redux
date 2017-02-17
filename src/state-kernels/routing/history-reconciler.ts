export interface IHistoryOperation {
    url: string;    
    forward: boolean;
    replace: boolean;
}

export class HistoryReconciler {
    private router: any;
    private framework7History: string[];
    private newHistory: string[];    
    private operations: IHistoryOperation[];

    constructor(router: any, framework7History: string[], newHistory: string[]) {
        this.router = router;
        this.framework7History = [...framework7History];
        this.newHistory = [...newHistory];
    }

    public getOperationsToReconcileHistories() {
        this.operations = [];        
        this.fastForwardToFirstNonMatchingPage();
        this.rewindFramework7History();

        if (this.currentF7HistoryUrl && this.currentNewHistoryUrl) {
            this.replaceLastFramework7UrlWithNewUrl();
        }

        if (this.newHistory.length) {
            this.addRemainingNewUrlsToFramework7History();
        }
        
        return this.operations;
    }

    private get currentF7HistoryUrl() {
        return this.framework7History[0];
    }

    private get currentNewHistoryUrl() {
        return this.newHistory[0];
    }

    private get currentF7HistoryPagePath() {
        return this.currentF7HistoryUrl && this.router.findMatchingRoute(this.currentF7HistoryUrl).route.pagePath;
    }

    private get currentNewHistoryPagePath() {
        return this.currentNewHistoryUrl && this.router.findMatchingRoute(this.currentNewHistoryUrl).route.pagePath;
    }    

    private fastForwardToFirstNonMatchingPage() {
        while (this.currentF7HistoryUrl && this.currentNewHistoryUrl && this.currentF7HistoryPagePath === this.currentNewHistoryPagePath) {
            if (
                (this.currentF7HistoryUrl !== this.currentNewHistoryUrl) || 
                (this.newHistory.length === 1 && this.framework7History.length) === 1
            ) {
                this.operations.push({
                    forward: true,
                    url: this.currentNewHistoryUrl,
                    replace: false
                });
            }

            const lastNewHistoryUrl = this.newHistory.shift();
            this.framework7History.shift();

            if (this.currentF7HistoryUrl && !this.currentNewHistoryUrl) {
                this.operations.push({
                    url: lastNewHistoryUrl,
                    forward: false,
                    replace: false
                });
            }
        }
    }

    private rewindFramework7History() {
        while (this.framework7History.length > 1) {
            this.operations.push({
                forward: false,
                replace: false,
                url: this.framework7History.pop()
            });            
        }
    }

    private framework7HasHistoryAtCurrentPosition() {
        return this.framework7History.length >= 0;
    }

    private replaceLastFramework7UrlWithNewUrl() {
        this.operations.push({
            forward: true,
            url: this.currentNewHistoryUrl,
            replace: true
        });

        this.newHistory.shift();
        this.framework7History.shift();
    }

    private addRemainingNewUrlsToFramework7History() {
        while (this.newHistory.length) {
            this.operations.push({
                forward: true,
                url: this.newHistory.pop(),
                replace: false
            });            
        }
    }
}