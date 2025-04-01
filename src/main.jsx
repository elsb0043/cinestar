import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // Import Router for at håndtere routing i appen
import { AlertProvider } from './context/alertContext.jsx' // Importer AlertContext for global håndtering af alerts
import { AuthContextProvider } from './context/authContext.jsx' // Importer AuthContext for global håndtering af brugerens autentificering
import './index.css' // Importer global CSS
import App from './App.jsx' // Importer hovedkomponenten i appen

// Render applikationen til DOM
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* StrictMode hjælper med at finde problemer i appen under udvikling (kun i udviklingsmiljø) */}
    <BrowserRouter>
      {/* BrowserRouter sørger for at holde styr på navigationen (URL-routing) i appen */}
      <AuthContextProvider>
        {/* AuthContextProvider giver adgang til autentificering data og funktioner i hele appen */}
          <AlertProvider>
            {/* AlertProvider giver adgang til global alert state (fejl- eller succesbeskeder) */}
            <App />
            {/* Hovedkomponenten som er den øverste komponent i appen */}
          </AlertProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>,
)