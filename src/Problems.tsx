import PlayerCard from "./PlayerCard";
import { useMemo, useState, useEffect } from "react";
import type { TeamData } from "./types";
import './Problems.css'
import { useParams } from "react-router";

function Problems() {
  const { id } = useParams()
  const [teamData, setTeamData] = useState<TeamData | null>(null)
  const [error, setError] = useState<string | null>(null);

  const [playerVisibility, setPlayerVisibility] = useState<Record<string, boolean>>({})

  const togglePlayer = (playerID: string) => {
    setPlayerVisibility(prev => ({
      ...prev,
      [playerID]: !prev[playerID]
    }))
  }
  const toggleGroup = (playerIDs: string[], show: boolean) => {
    const updates = Object.fromEntries(playerIDs.map(id => [id, show]));
    setPlayerVisibility(prev => ({ ...prev, ...updates }));
  };

  const batterIDs = teamData?.Players.slice(0, 9).map(p => p.PlayerID) ?? [];
  const benchBatterIDs = teamData?.Bench.Batters.map(p => p.PlayerID) ?? [];
  const pitcherIDs = teamData?.Players.slice(9, 18).map(p => p.PlayerID) ?? [];
  const benchPitcherIDs = teamData?.Bench.Pitchers.map(p => p.PlayerID) ?? [];
  
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => { // initialize visibility so that roster ordering works
    if (!teamData) return;
    
    const allPlayerIDs = [
      ...teamData.Players.slice(0, 9).map(p => p.PlayerID),
      ...teamData.Bench.Batters.map(p => p.PlayerID),
      ...teamData.Players.slice(9, 18).map(p => p.PlayerID),
      ...teamData.Bench.Pitchers.map(p => p.PlayerID)
    ];
    
    const initialVisibility = Object.fromEntries(
      allPlayerIDs.map(id => [id, false])
  );
  
  setPlayerVisibility(initialVisibility);
}, [teamData]);

  useEffect(() => { // fetch player from mmolb api
    fetch(`https://mmolb-proxy.vercel.app/api/team/${id}`, {
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(res => {
      if (!res.ok) throw new Error('Failed to fetch team data.');
      return res.json();
    })
    .then(data => {
      setTeamData(data);
    })
    .catch(err => {
      setError(err.message);
    });
  }, []);

  const renderPlayers = (playerIDs: string[], posOverrides?: Record<string, string>) => {
    // const expandedIDs = playerIDs.filter(id => playerVisibility[id] ?? true);
    // const collapsedIDs = playerIDs.filter(id => !(playerVisibility[id] ?? true));
    const sortedIDs = isMobile 
      ? playerIDs
      : [
          ...playerIDs.filter(id => playerVisibility[id] ?? true),
          ...playerIDs.filter(id => !(playerVisibility[id] ?? true))
        ];
    
    return sortedIDs.map(id => (
      <PlayerCard
        key={id}
        playerID={id}
        showPlayer={playerVisibility[id] ?? false}
        displayPosition={posOverrides?.[id] ?? null}
        onToggle={() => togglePlayer(id)}
      />
    ));
  };

  if (!teamData) return <div>{error}</div>

  return (
    <div className="problems">
      {/* <h1>{teamData.Emoji} {teamData.Location} {teamData.Name} {teamData.Emoji}</h1> */}
      <div className="toggle-menu">
        <button onClick={() => toggleGroup(batterIDs, true)}>
          show all batters
        </button>
        <button onClick={() => toggleGroup(batterIDs, false)}>
          hide all batters
        </button>
        <button onClick={() => toggleGroup(pitcherIDs, true)}>
          show all pitchers
        </button>
        <button onClick={() => toggleGroup(pitcherIDs, false)}>
          hide all pitchers
        </button>
      </div>

      <div className="player-group">
        {renderPlayers(batterIDs, {[batterIDs[8]]: 'DH' })}
        {renderPlayers(benchBatterIDs, Object.fromEntries(benchBatterIDs.map(id => [id, 'B'])))}
      </div>

      <div className="player-group">
        {renderPlayers(pitcherIDs)}
        {renderPlayers(benchPitcherIDs, Object.fromEntries(benchPitcherIDs.map(id => [id, 'B'])))}
      </div>

    </div>
  )
}

export default Problems;