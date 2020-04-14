// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import Routers from './components/routers'
// import DeleteForm from './components/deleteForm'
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<Routers/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();



import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore,applyMiddleware,compose} from 'redux';
import appReducers from './reducers'
import {Provider} from 'react-redux'
import Routers from './components/routers'
import thunk from 'redux-thunk'
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore (
    appReducers,
  //  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    composeEnhancer(applyMiddleware(thunk))
);

ReactDOM.render(
    <Provider store={store}>
      <Routers />
    </Provider>,
    document.getElementById('root')

);
serviceWorker.unregister();
