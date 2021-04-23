import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {config} from "@fortawesome/fontawesome-svg-core";
import configureStore from "./redux/configureStore";
import { Provider } from 'react-redux';
import * as queryString from "querystring";

const params = new URLSearchParams(window.location.search)

const store = configureStore((params.get("game") || 0) as number, params.get("joinCode") || "");

const render = () => {
  return ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
}

if ( process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./App', render)
}

render();


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
