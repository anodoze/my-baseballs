import { useState } from 'react';
import './TeamNavbar.css';

interface TeamNavbarProps {
  teamName: string;
  batterIDs: string[];
  pitcherIDs: string[];
  toggleGroup: (playerIDs: string[], show: boolean) => void;
  batterDisplayMode: 'all' | 'batting' | 'defense' | 'baserunning';
  setBatterDisplayMode: (mode: 'all' | 'batting' | 'defense' | 'baserunning') => void;
  pitcherDisplayMode: 'all' | 'pitching';
  setPitcherDisplayMode: (mode: 'all' | 'pitching') => void;
}

function TeamNavbar({ 
  teamName,
  batterIDs, 
  pitcherIDs, 
  toggleGroup, 
  batterDisplayMode, 
  setBatterDisplayMode,
  pitcherDisplayMode,
  setPitcherDisplayMode 
}: TeamNavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="team-navbar">
      <div>
        <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>
        <button className="menu" onClick={() => setIsOpen(!isOpen)}>
          Menu
        </button>
        {teamName}
      </div>
      
      <div className={`nav-buttons ${isOpen ? 'open' : ''}`}>
        <button onClick={() => toggleGroup(batterIDs, true)}>show all batters</button>
        <button onClick={() => toggleGroup(batterIDs, false)}>hide batters</button>
        <button onClick={() => toggleGroup(pitcherIDs, true)}>show all pitchers</button>
        <button onClick={() => toggleGroup(pitcherIDs, false)}>hide pitchers</button>

        <button onClick={() => setBatterDisplayMode('batting')}>Isolate Batting</button>
        <button onClick={() => setBatterDisplayMode('defense')}>Isolate Defense</button>
        <button onClick={() => setBatterDisplayMode('baserunning')}>Isolate Baserunning</button>
        <button onClick={() => setBatterDisplayMode('all')}>Show All Attributes</button>
        
        <button onClick={() => setPitcherDisplayMode(pitcherDisplayMode === 'all' ? 'pitching' : 'all')}>
          {pitcherDisplayMode === 'all' ? 'Hide Pitch Chart' : 'Show Pitch Chart'}
        </button>
      </div>
    </nav>
  );
}

export default TeamNavbar;