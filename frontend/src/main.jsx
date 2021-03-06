import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { App } from './App'
import { CookiesProvider } from "react-cookie";
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </Router>
)
