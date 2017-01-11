import * as camelCase from 'camelcase';

import {StateKernelChild} from './state-kernel-child';
import {RoutingKernel} from './routing/routing-kernel';
import {ModalKernel} from './modals/modal-kernel';

export class Framework7StateKernel {
    private actionDispatchHandler: (action: any) => void;
    private children: StateKernelChild[];

    constructor() {
        this.children = [
            new RoutingKernel(this),
            new ModalKernel(this)
        ];
    }

    public get hasActionDispatchHandler() {
        return !!this.actionDispatchHandler;
    }

    public setActionDispatchHandler(actionDispatchHandler: (action: any) => void) {
        this.actionDispatchHandler = actionDispatchHandler;
    }

    public setFramework7(framework7: any) {
        this.children.forEach(child => child.setFramework7(framework7));
    }

    public handleFramework7Action(framework7Action: string, args: any[]) {
        const methodName = camelCase(framework7Action.replace('@@FRAMEWORK7_', ''));

        this.children.forEach(child => {
            if (child[methodName]) {
                child[methodName](args);
            }
        });
    }

    public dispatchAction(action: any) {
        if (this.actionDispatchHandler) {
            this.actionDispatchHandler(action);
        } else {
            throw new Error('No action dispatch handler set!');
        }
    }
}