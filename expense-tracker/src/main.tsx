import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";

// Lets work with latest react 18
const root = ReactDOM.createRoot(document.getElementById('root') as Element);
root.render(
  <BrowserRouter>
  < Provider store={store} >
    <App />
  </Provider >
  </BrowserRouter>)

// SPA quick install sheet
// Mains => Vite (react-ts), Tailwind (d) [@tailwindcss/forms], Amplify [@types/amplify], Recharts, Redux, react-redux, Thunk, persist?, router v6, react-hook-form, dayjs
// Extras => sass?(d), husky, eslint, prettier?