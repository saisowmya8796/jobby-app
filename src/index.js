import React from 'react'
import {createRoot} from 'react-dom/client' // 🔄 CHANGED
import {BrowserRouter} from 'react-router-dom'

import App from './App'

const container = document.getElementById('root')
const root = createRoot(container) // 🔄 CHANGED

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
