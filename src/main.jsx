import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./index.css"
import CartProvider from './context/CartContext.jsx'
import SearchProvider from './context/SearchContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider >
      <SearchProvider >
        <App />
      </SearchProvider>
    </CartProvider>
  </StrictMode>,
)
