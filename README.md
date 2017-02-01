# Framework7 Redux
### Redux bindings to keep your Redux store in sync with Framework7

[Framework7 React](https://github.com/bencompton/framework7-react) relies on [Framework7](https://github.com/nolimits4web/Framework7) JavaScript to provide functionality like routing and showing + hiding modals. This means that there is state in Framework7 for things like the current URL, whether or not a modal is showing, etc. This state is therefore not available in your store, which means that things like time travel debugging and server rendering with server state sent to the client state won't work.

What Framework7 Redux does is sync state in Framework7 with your store. It also provides actions that you can call to do things like navigate to a URL, go back, and show + hide an alert.

This is primarily being designed with Framework7 React in mind, but Redux is also used with [Vue](https://vuejs.org), so it shouldn't take much work to make this work with [Framework7 Vue](https://github.com/nolimits4web/Framework7-Vue) as well. Vue users are more likely to want to use [VueX](https://github.com/vuejs/vuex), and the goal is that much of the code in this library will be shared with a VueX version.

This project is a work in progress, so stay tuned. There will be much more functionality to come.
