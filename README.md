# Framework7 Redux
### Redux bindings to keep your Redux store in sync with Framework7

[Framework7](https://github.com/nolimits4web/Framework7) has functionality like routing and showing + hiding modals. This means that there is state in Framework7 for things like the current URL, whether or not a modal is showing, etc. This state is therefore not available in your store, which means that things like time travel debugging and server rendering with server state sent to the client state won't work.

Framework7 Redux is a Framework7 plug-in that syncs state in Framework7 with your store. It also provides actions that you can call to do things like navigate to a URL, go back, and show + hide an alert.

### Who should use Framework7 Redux?

If you aren't already familiar with [Redux](https://github.com/reactjs/redux) and using React with [Framework7](http://framework7.io), then you will probably want to go learn those libraries before using Framework7 Redux.

Note that **this library is not mandatory** for using Redux with Framework7 and React. When you use Redux with Framework7 and React, you're using state from your store to control what prop values get passed into your components and re-rendering your components when the state changes. This works just fine without this library.

If you want to control things like navigation and alert dialogs from Redux actions and want these things to work when you do server rendering or time-travel debugging, that's when you need to use Framework7 Redux. If you just want your components to be controlled by state and are fine with navigation and modals being handled outside of Redux, then you don't need Framework7 Redux.

### Setup

First, pull down Framework7 Redux from NPM like so:

```
npm install --save framework7-redux
```

Next, update your store code to look like this:

```javascript
import { Framework7StateKernel, framework7Reducer, syncFramework7WithStore } from 'framework7-redux';

export const framework7StateKernel = new Framework7StateKernel();

export const store = createStore(
  combineReducers({
    framework7: framework7Reducer,
    ...
    ...
  })
);

syncFramework7WithStore(store, framework7StateKernel);
```

Finally, configure your root Framework7 app React component:

```javascript
import { routes } from './routes';
import { store, framework7StateKernel } from './store';
import { framework7ReduxPlugin } from 'framework7-redux';

const params = {
  ...
  routes,
  stateKernel: framework7StateKernel,
  clicks: {
    externalLinks: 'a[href="#"]' // Bypass the built-in routing for link clicks
  },
  panel: {
    closeByBackdropClick: false // Bypass the built-in routing when clicking panel backdrops
  },
  popup: {
    closeByBackdropClick: false // Bypass the built-in routing when clicking popup backdrops
  }
};

const MyApp = () => {
  return (
    <Provider store={store}>
      <App params={params}>
        <Views>
          <View id="main-view" main url="/" />                        
        </Views>
      </App>
    </Provider>
  );
};
```

### Navigation

By default, the router in Framework7 will automatically navigate to different pages when the user clicks an anchor tag with an href attribute. This works well for simpler apps, but for larger and more complex apps, it is recommended to handle all navigation through actions and only have presentation logic in your React components. In order to accomplish this, some default navigation settings in Framework7 must be disabled first.

#### Links

In the Setup section above, the Framework7 param `clicks -> externalLinks` is set to `a[href="#"]` to disable the default automatic Framework7 Link routing behavior. Once that is disabled, you can then safely call actions from the Link's `onClick` event and control all routing through Redux actions.

#### Tabs

Tabs in Framework7 can be controlled via routes, as described in the [routing docs](http://framework7.io/docs/routes.html). Once tabs are configured to be routable, the tab links should have `onClick` handlers that call actions just like any other link used with Framework7 Redux.

 #### Popups / Panels

Popups and panels can be controlled via routes as of Framework7 v3, as described in the [routing docs](http://framework7.io/docs/routes.html). The behavior of closing Panels and Popups on backdrop click should also be disabled in the Framework7 parameters as shown in the Setup section above. Once that is accomplished, you can use actions to navigate forward to a Popup or Panel route to open them, and then use actions to navigate back to close the Popup or Panel.

#### Navigating forward and back with actions

Once your the default Framework7 navigation behaviors are disabled and your components are configured to be routable, the following code can be used in your actions to control navigation:

```javascript
import { navigateTo, goBack } from 'framework7-redux'

var routes = [{
  path: '/',
  component: HomePage
}, {
  path: '/page-1/',
  component: Page1
}];

...
...

//Go to page 1
store.dispatch(navigateTo('/page-1/'));

//Go to page 2 and replace page 1 in the history
store.dispatch(navigateTo('/page-1/', true));

//Go back to the home page
store.dispatch(goBack());

```

### Modals

Framework7's API can be called for alerts, confirm dialogs, etc. While this approach is fine for simpler apps, it is better to control modals via actions so their state will be in your store.

```javascript
import { showAlert, closeAlert, showPreloader, hidePreloader } from 'framework7-redux'
	
//Show an alert with no title and the specified alert text
store.dispatch(showAlert(('Alert text!'));
	
//Close the alert
store.dispatch(closeAlert());
	
//Show an alert with the specified text and title
store.dispatch(showAlert(('Alert text!', 'Alert title'));
	
//Show the global app loading spinner
store.dispatch(showPreloader());
	
//Hide the global app loading spinner
store.dispatch(hidePreloader());
	
//Show the global app loading spinner with custom loading text
store.dispatch(showPreloader('Saving...'));	

//Show a confirm dialog
store.dispatch(showConfirm('Are you sure you want to do this?', 'Are you sure?'));

//Cancel a confirm dialog
store.dispatch(cancelConfirm());

//Accept a confirm dialog
store.dispatch(acceptConfirm());
```

It is also possible to get a promise that resolves when the user closes an alert:

```javascript
import {showAlert, closeAlert} from 'framework7-redux'
import {framework7StateKernel} from './store';

store.dispatch(showAlert('Alert text'));

framework7StateKernel.getActionPromise(closeAlert().type)
  .then(() => store.dispatch(showAlert('Alert closed!')));
```

You can then use the promise in the appropriate manner for whatever async action middleware you are using. For example, here is how it would look in [redux-thunk](https://github.com/gaearon/redux-thunk):

```javascript
const productFetchFailed = () => {
  return dispatch => {
    dispatch(showAlert('Product fetch failed!'));
    
    //Retry product fetch after the user clicks the "Ok" button on the alert
    framework7StateKernel.getActionPromise(closeAlert().type)
      .then(() => dispatch(fetchProducts()))
  };
};
```

Here is an example of a confirm dialog with redux-thunk:

```javascript
const someRiskyAction = () => {
  return dispatch => {
    dispatch(showConfirm('Are you sure you want to do this?', 'Are you sure?'));

    Promise.race([
      framework7StateKernel.getActionPromise(acceptConfirm().type).then(() => true),
      framework7StateKernel.getActionPromise(cancelConfirm().type).then(() => false)
    ])
    .then(confirmed => {
      if (confirmed) {
        dispatch(completeRiskyAction());
      }
    });
  };
};
```
### Selectors

Framework7 Redux provides some selectors to retrieve info from your state:

```javascript
import { getCurrentRoute, getPreviousRoute } from 'framework7-redux';

// Returns the current URL in the history or undefined if none
const currentUrl = getCurrentRoute(store.getState());

// Returns the previous URL in the history or undefined if none
const previousUrl = getPreviousRoute(store.getState());
```