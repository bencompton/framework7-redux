import { StateKernel } from './state-kernel';

export const framework7ReduxPlugin = {
    name: 'framework7-redux',
    on: {
        init: function () {
          var app = this;

          if (app.params.stateKernel) {
            app.params.stateKernel.setFramework7(app);
          } else {
            throw new Error('Framework7 Redux plug-in requires a state kernel');
          }          
        }
    },
    install() {
      // Nothing to do here
    }
};