import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {  HashRouter } from 'react-router-dom'
import Router from './router/router.jsx'
import { ThemeProvider } from './Theme/ThemeProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <HashRouter>
        <Router />
      </HashRouter>
    </ThemeProvider>
  </StrictMode>,
)
