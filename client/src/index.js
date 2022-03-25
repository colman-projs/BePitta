import React from 'react';
import ReactDOM from 'react-dom';
import { positions, Provider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';

import reportWebVitals from './reportWebVitals';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { darkTheme } from './theme';
import App from './App';

import './index.scss';

const options = {
    timeout: 5000,
    position: positions.BOTTOM_LEFT,
};

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={darkTheme}>
            <Provider template={AlertTemplate} {...options}>
                <ErrorBoundary>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </ErrorBoundary>
            </Provider>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
