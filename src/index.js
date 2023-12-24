import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { NextUIProvider } from "@nextui-org/react";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <NextUIProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </NextUIProvider>
    </Provider>
  </React.StrictMode>
);


