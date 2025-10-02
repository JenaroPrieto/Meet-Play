import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Routing from './Routing'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Routing />
  </StrictMode>,
)
