import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { Routes, Route } from 'react-router'
import Gazette from './Gazette/Gazette.tsx'
import Beginner from './Beginner.tsx'
import Problems from './Problems.tsx'
import Home from './Home.tsx'
import TeamLookup from './TeamLookup.tsx'
import StatsLeaderboards from './StatsLeaderboards.tsx'


function App() {
  const location = useLocation();
  
  useEffect(() => {
    const isTreeFrogsPage = location.pathname.startsWith('/frogs');
    
    document.body.className = isTreeFrogsPage 
      ? 'theme-frogs' 
      : 'theme-main';

  }, [location.pathname]);
  
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/frogs">
        <Route path="/frogs/gazette" element={(<Gazette/>)} />
      </Route>
      <Route path="/beginners-guide" element={(<Beginner/>)} />
      <Route path="/team/" element={(<TeamLookup/>)} />
      <Route path="/team/:id" element={(<Problems/>)} />
      <Route path="/leaderboard/" element={(<StatsLeaderboards/>)} />
    </Routes>
  );
}

export default App;