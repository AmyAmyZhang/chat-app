import React from 'react';
import ReactDom from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import App from './app'
// import { counter } from './index.redux';
import reducers from './reducer';
import './config';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

//reduxdevtool
const reduxDevtools = window.devToolsExtension ? window.devToolsExtension() : f => f
const store = createStore(reducers, compose(
    applyMiddleware(thunk), reduxDevtools
))

// function Boss() {
// 	return <h2>Boss page</h2>
// }

// function Dashboard() {
// 	return <h2>Dashboard</h2>
// }

// boss genius me message 4 pages
ReactDom.hydrate(
        (<Provider store={store}>
           <BrowserRouter>
				<App/>
           </BrowserRouter>
        </Provider>)
        , document.getElementById('root'));
