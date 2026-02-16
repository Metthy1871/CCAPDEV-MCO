/* This is the entry point of the React application. */

import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  
    /* Developmental tool that helps identify problems with the app */
    <React.StrictMode>

        {/* Allows client-side routing */}
        <BrowserRouter>

            <App/>

        </BrowserRouter>

    </React.StrictMode>,
)