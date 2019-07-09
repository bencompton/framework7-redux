import { StateKernel } from './state-kernel';

export const framework7ReduxPlugin = {
    name: 'framework7-redux',
    on: {
        init: function () {
          const app: any = this;

          // Make sure links in Framework7 don't change the URL
          app.on('click', (e: any) => {				
            const clicked = app.$(e.target);
            const clickedLink = clicked.closest('a');
            const isLink = clickedLink.length > 0;				
            
            if (isLink) {
              e.preventDefault();
            }
          });          

          if (app.params.stateKernel) {
            app.params.stateKernel.setFramework7(app);
          } else {
            throw new Error('Framework7 Redux plug-in requires a state kernel');
          }          
        }
    },
    install() {
      // Nothing to do here
    },
    create(instance: any) {
      return () => {};
    }
};