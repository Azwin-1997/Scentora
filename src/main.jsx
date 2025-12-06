import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./index.css"
import CartProvider from './context/CartProvider.jsx'
import SearchProvider from './context/SearchProvider.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider >
      <SearchProvider >
        <App />
      </SearchProvider>
    </CartProvider>
  </StrictMode>,
)
