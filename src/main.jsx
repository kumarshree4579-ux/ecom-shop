import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './Context/CartContext.jsx'
import { AuthProvider } from './Context/AuthContext.jsx'
import { StoreProvider } from './Context/StoreContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <StoreProvider>
        <App />
        </StoreProvider>
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
)
