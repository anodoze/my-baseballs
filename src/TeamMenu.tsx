import { useState } from 'react';
import './TeamMenu.css';

interface TeamMenuProps {
  teamName: string;
  batterIDs: string[];
  pitcherIDs: string[];
  toggleGroup: (playerIDs: string[], show: boolean) => void;
  batterDisplayMode: 'all' | 'batting' | 'defense' | 'baserunning';
  setBatterDisplayMode: (mode: 'all' | 'batting' | 'defense' | 'baserunning') => void;
  pitcherDisplayMode: 'all' | 'pitching';
  setPitcherDisplayMode: (mode: 'all' | 'pitching') => void;
  showScheduled: boolean;
  setShowScheduled: (show: boolean) => void;
  invertAttributes: boolean;
  setInvertAttributes: (invert: boolean) => void;
}

export type BatterDisplayMode = 'all' | 'batting' | 'defense' | 'baserunning';

const BATTER_MODES: { mode: BatterDisplayMode; label: string }[] = [
  { mode: 'all', label: 'show all' },
  { mode: 'batting', label: 'batting only' },
  { mode: 'defense', label: 'defense only' },
  { mode: 'baserunning', label: 'baserunning' },
]

function TeamMenu({ 
  teamName,
  batterIDs, 
  pitcherIDs, 
  toggleGroup, 
  batterDisplayMode, 
  setBatterDisplayMode,
  pitcherDisplayMode,
  setPitcherDisplayMode,
  showScheduled,
  setShowScheduled,
  invertAttributes,
  setInvertAttributes
}: TeamMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  
  console.log(batterDisplayMode)
  const batterVisibility = BATTER_MODES.map(({ mode, label }) => (
    <button
    key={mode}
    className={batterDisplayMode === mode ? 'active' : ''}
    onClick={() => setBatterDisplayMode(mode)}
    id="menu-block-button"
    >
    {label}
  </button>
));

  return (
    <nav className="team-navbar">
      <div className='menu-bar-flex'>
        <button className="menu-button" onClick={() => setIsOpen(!isOpen)}>
          Dashboard Menu
        </button>
        <div className='team-title'>
          {teamName}
        </div>
      </div>
      
      <div className={`nav-buttons ${isOpen ? 'open' : ''}`}>
          <div className="menu-block">
            <div className='menu-block-title'>batter attribute visibility</div>
            {batterVisibility}
          </div>
          <div className='menu-block'>
            <div className='menu-block-title'>expand/collapse player groups</div>
            <button id='menu-block-button' onClick={() => toggleGroup(batterIDs, true)}>show all batters</button>
            <button id='menu-block-button' onClick={() => toggleGroup(batterIDs, false)}>hide batters</button>
            <button id='menu-block-button' onClick={() => toggleGroup(pitcherIDs, true)}>show all pitchers</button>
            <button id='menu-block-button' onClick={() => toggleGroup(pitcherIDs, false)}>hide pitchers</button>
          </div>
          <div className='menu-block'>
            <div className='menu-block-title'>misc</div>
            <button id="menu-block-button" onClick={() => setShowScheduled(!showScheduled)}>{showScheduled ? 'Hide Pending Levels' : 'Show Pending Levels'}</button>
            <button id="menu-block-button" onClick={() => setPitcherDisplayMode(pitcherDisplayMode === 'all' ? 'pitching' : 'all')}>
              {pitcherDisplayMode === 'all' ? 'Hide Pitch Chart' : 'Show Pitch Chart'}
            </button>
            <button id="menu-block-button" onClick={() => setInvertAttributes(!invertAttributes)}>
              Invert Pitching/Batting
            </button>
          </div>
        </div>
    </nav>
  );
}

export default TeamMenu;