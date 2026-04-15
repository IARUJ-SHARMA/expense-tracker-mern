import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom' // <-- 1. ADD THIS LINE
import './index.css' 

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>    {/* <-- 2. ADD THIS WRAPPER */}
    <App />
  </BrowserRouter>   
)