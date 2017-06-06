# Framework7 Redux
### Redux bindings to keep your Redux store in sync with Framework7

[Framework7 React](https://github.com/bencompton/framework7-react) and [Framework7 Vue](https://github.com/nolimits4web/Framework7-Vue) rely on [Framework7](https://github.com/nolimits4web/Framework7) JavaScript to provide functionality like routing and showing + hiding modals. This means that there is state in Framework7 for things like the current URL, whether or not a modal is showing, etc. This state is therefore not available in your store, which means that things like time travel debugging and server rendering with server state sent to the client state won't work.

What Framework7 Redux does is sync state in Framework7 with your store. It also provides actions that you can call to do things like navigate to a URL, go back, and show + hide an alert.

This is primarily being designed with Framework7 React in mind, but Redux is also used with [Vue](https://vuejs.org), so this library should be perfectly usable with [Framework7 Vue](https://github.com/nolimits4web/Framework7-Vue) as well once Framework7 Vue is updated to support Framework7 Redux. However, Vue users are more likely to want to use [VueX](https://github.com/vuejs/vuex), and the goal is that much of the code in this library will be shared with a VueX version in the future.

This project is a work in progress, so stay tuned. There will be much more functionality to come.

### Who should use Framework7 Redux?

If you aren't already familiar with [Redux](https://github.com/reactjs/redux), [Framework7](http://framework7.io), and either [Framework7 React](https://github.com/bencompton/framework7-react) or [Framework7 Vue](https://github.com/nolimits4web/Framework7-Vue), then you will probably want to go learn those libraries before using Framework7 Redux.

Note that **this library is not mandatory** for using Redux with Framework7 React and Framework7 Vue. When you use Redux with Framework7 React or Framework7 Vue, you're using state from your store to control what prop values get passed into your components and re-rendering your components when the state changes. This works just fine without this library.

If you want to control things like navigation and alert dialogs from Redux actions and want these things to work when you do server rendering or time-travel debugging, that's when you need to use Framework7 Redux. If you just want your components to be controlled by state and are fine with navigation and modals being handled outside of Redux, then you don't need Framework7 Redux.

### Setup

First, pull down Framework7 Redux from NPM like so:

```
npm install --save framework7-redux
```

Next, update your store code to look like this:

```javascript
import {Framework7StateKernel, framework7Reducer, syncFramework7WithStore} from 'framework7-redux';

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

Finally, configure your Framework7App component:

```javascript
import {routes} from './routes';
import {store, framework7StateKernel} from './store';

const MyApp = () => {
  return (
    <Provider store={store}>
      <Framework7App
        routes={routes}                
        router={false}
        stateKernel={framework7StateKernel}
      />
    </Provider>
  );
};
```

Note that the Framework7 param `router` should be `false` as shown above to disable the default automatic Framework7 routing behavior (as described below) and allow routes to be controlled strictly from actions.

### Navigation

By default, the router in Framework7 React and Framework7 Vue will automatically navigate to different pages when the user clicks an anchor tag with an href attribute. This works well for simpler apps, but for larger and more complex apps, it is recommended to handle all navigation through actions and keep your React / Vue components as dumb as possible. Framework7 Redux makes this easy by providing pre-built actions for navigation:

```javascript
import {navigateTo, goBack} from 'framework7-redux'

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

//Go back to the home page
store.dispatch(goBack());
```

### Modals

Framework7 React and Framework7 Vue do not provide components to accomplish things like alert dialogs, confirm dialogs, and the preloader. Instead, they require calling Framework7's API for modals. While this approach is fine for simpler apps, it is better to control modals via actions so their state will be in your store. Modal support is still a work in progress in Framework7 Redux, but a few options are currently supported:

```javascript
import {showAlert, closeAlert, showPreloader, hidePreloader} from 'framework7-redux'
	
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
```

It is also possible to get a promise that resolves when the user closes an alert:

```javascript
import {showAlert, closeAlert} from 'framework7-redux'
import {framework7StateKernel} from './store';

store.dispatch(showAlert('Alert text'));

framework7StateKernel.getActionPromise(closeAlert().type)
  .then(() => store.dispatch(showAlert('Alert closed!')));
```

You can then use the promise in the appropriate manner for whatever async action middleware you are using. For example, here is how it would look in [redux-thunk(https://github.com/gaearon/redux-thunk]):

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

