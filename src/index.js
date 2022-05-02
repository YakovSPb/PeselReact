import React from 'react';
import store from "./redux/redux-store";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClientProvider } from 'react-query';

import App from "./App";
import reportWebVitals from './reportWebVitals';
import {queryClient} from './hooks/'

ReactDOM.render(
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <App />
        </Provider>
        <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>,
    document.getElementById('root'));


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
