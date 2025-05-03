import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

/* --- css link --- */
import './index.css';

/* --- components --- */
import App from './App.jsx'
import 'lenis/dist/lenis.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
