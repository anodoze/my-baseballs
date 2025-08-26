import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './Home.tsx'
import { BrowserRouter, Routes, Route } from 'react-router'
import Gazette from './Gazette.tsx'
import Problems from './Problems.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={(<Home/>)} />
        <Route path="/gazette" element={(<Gazette/>)} />
        <Route path="/problems" element={(<Problems/>)} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
