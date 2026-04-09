import { Routes, Route } from 'react-router'
import Problems from './Problems.tsx'
import Home from './Home.tsx'
import TeamLookup from './TeamLookup.tsx'
import StatsLeaderboards from './StatsLeaderboards.tsx'

import { Link } from 'react-router'

function SiteNavbar() {
  return (
    <nav className="site-navbar">
      <Link to="/team/">Team Dash</Link>
      <Link to="/leaderboard/">Stats Leaderboards</Link>
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