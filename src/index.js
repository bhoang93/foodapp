import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import './index.css';
import App from './App';
import { restaurantInfo } from './reducers'
import registerServiceWorker from './registerServiceWorker';

const rootReducer = combineReducers({ restaurantInfo })
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

ReactDOM.render(
	<Provider store={store}>
	<App />
	</Provider>, document.getElementById('root'));
registerServiceWorker();
