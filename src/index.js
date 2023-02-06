import React from 'react';
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';

import { store } from './store'
import MainRouter from './config/routes';

const container = document.querySelector('#root')
const root = createRoot(container); 
root.render(
    <Provider store={store}>
        <MainRouter/>
    </Provider>
);