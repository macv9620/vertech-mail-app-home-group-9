import ReactDOM from 'react-dom/client'
import {App} from './App.tsx'
import './index.css'
import { ContextAuthProvider } from './context/AuthContextProvider.tsx'
import { StrictMode } from 'react'

ReactDOM.createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <ContextAuthProvider>
      <App />
    </ContextAuthProvider>
  </StrictMode>


)
