/* This is the entry point of the React application. */

import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.jsx'
import './index.css'

/* Create the Client to manage the data */
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  
    /* Developmental tool that helps identify problems with the app */
    <React.StrictMode>

        {/* Allows client-side routing */}
        <BrowserRouter>
            <QueryClientProvider client = {queryClient}>
                <App/>
            </QueryClientProvider>
        </BrowserRouter>
        
    </React.StrictMode>,
)