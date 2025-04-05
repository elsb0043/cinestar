import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AlertProvider } from './context/alertContext.jsx'
import { AuthContextProvider } from './context/authContext.jsx'
import App from './App.jsx'
import './index.css'

// Render applikationen til DOM
createRoot(document.getElementById('root')).render(
  <StrictMode> {/* StrictMode hjælper med at finde problemer i appen under udvikling (kun i udviklingsmiljø) */}
    <BrowserRouter> {/* BrowserRouter sørger for at holde styr på navigationen (URL-routing) i appen */}
      <AuthContextProvider> {/* AuthContextProvider giver adgang til autentificering data og funktioner i hele appen */}
          <AlertProvider> {/* AlertProvider giver adgang til global alert state (fejl- eller succesbeskeder) */}
            <App /> {/* Hovedkomponenten som er den øverste komponent i appen */}
          </AlertProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>,
)