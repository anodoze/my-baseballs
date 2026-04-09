import { Routes, Route, NavLink } from 'react-router'
import Problems from './Problems.tsx'
import Home from './Home.tsx'
import TeamLookup from './TeamLookup.tsx'
import StatsLeaderboards from './StatsLeaderboards.tsx'
import './Problems.css'

function SiteNavbar() {
  return (
    <nav className="site-navbar">
      <NavLink className="navbar-button" to="/team/">Team Dash</NavLink>
      <NavLink className="navbar-button" to="/leaderboard/">Stats Leaderboards</NavLink>
    </nav>
  )
}

function App() {
  
  return (
  <>
    <SiteNavbar />
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/team/" element={(<TeamLookup/>)} />
        <Route path="/team/:id" element={(<Problems/>)} />
        <Route path="/leaderboard/" element={(<StatsLeaderboards/>)} />
    </Routes>
  </>
  );
}

export default App;