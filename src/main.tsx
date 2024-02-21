import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './App.tsx'
import './index.css'
import { ContextAuthProvider } from './context/AuthContextProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ContextAuthProvider>
      <App />
    </ContextAuthProvider>
  </React.StrictMode>,
)
