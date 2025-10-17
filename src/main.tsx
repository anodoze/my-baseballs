import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './Home.tsx'
import { HashRouter, Routes, Route } from 'react-router'
import Gazette from './Gazette/Gazette.tsx'
import Beginner from './Beginner.tsx'
// import Problems from './Problems.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={(<Home/>)} />
        <Route path="/gazette" element={(<Gazette/>)} />
        <Route path="/beginners-guide" element={(<Beginner/>)} />
        {/* <Route path="/problems" element={(<Problems/>)} /> */}
      </Routes>
    </HashRouter>
  </StrictMode>,
)
