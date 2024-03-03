import React from 'react';
import ReactDOM from "react-dom";
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClientProvider } from 'react-query';

import App from "./App";
import reportWebVitals from './reportWebVitals';
import {queryClient} from "./api/reactQuery";

ReactDOM.render(
    <QueryClientProvider client={queryClient}>
            <App />
        <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>,
    document.getElementById('root'));

reportWebVitals();
