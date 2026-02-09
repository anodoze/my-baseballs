import PlayerCard from "./PlayerCard";
import TeamNavbar from "./TeamNavbar";
import { useState, useEffect } from "react";
import type { TeamData } from "./types";
import './Problems.css'
import { useParams } from "react-router";

function Problems() {
  const { id } = useParams()
  const [teamData, setTeamData] = useState<TeamData | null>(null)
  const [error, setError] = useState<string | null>(null);
  const [playerVisibility, setPlayerVisibility] = useState<Record<string, boolean>>({})
  const [batterDisplayMode, setBatterDisplayMode] = useState<'all' | 'batting' | 'defense' | 'baserunning'>('all');
  const [pitcherDisplayMode, setPitcherDisplayMode] = useState<'all' | 'pitching'>('all');


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

  const teamNameDisplay = `${teamData?.Emoji} ${teamData?.Location} ${teamData?.Name}`

  const batterIDs = teamData?.Players.slice(0, 9).map(p => p.PlayerID) ?? [];
  const benchBatterIDs = teamData?.Bench.Batters.map(p => p.PlayerID) ?? [];
  const pitcherIDs = teamData?.Players.slice(9, 18).map(p => p.PlayerID) ?? [];
  const benchPitcherIDs = teamData?.Bench.Pitchers.map(p => p.PlayerID) ?? [];

  const allBatterIDs = [...batterIDs, ...benchBatterIDs];
  const allPitcherIDs = [...pitcherIDs, ...benchPitcherIDs];

  const batterPosOverrides = {
  [batterIDs[8]]: 'DH',
    ...Object.fromEntries(benchBatterIDs.map(id => [id, 'B']))
  };

  const pitcherPosOverrides = Object.fromEntries(
    benchPitcherIDs.map(id => [id, 'B'])
  );
  
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

  const renderPlayers = (playerIDs: string[], positionType: 'Batter' | 'Pitcher', posOverrides?: Record<string, string>) => {

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
        displayMode={positionType === 'Batter' ? batterDisplayMode : pitcherDisplayMode}
        onToggle={() => togglePlayer(id)}
      />
    ));
  };

  if (!teamData) return <div>{error}</div>

  return (
    <div className="problems">
      <TeamNavbar 
        teamName={teamNameDisplay}
        batterIDs={allBatterIDs}
        pitcherIDs={allPitcherIDs}
        toggleGroup={toggleGroup}
        batterDisplayMode={batterDisplayMode}
        setBatterDisplayMode={setBatterDisplayMode}
        pitcherDisplayMode={pitcherDisplayMode}
        setPitcherDisplayMode={setPitcherDisplayMode}
      />

      <div className="player-group">
        {renderPlayers(allBatterIDs, 'Batter', batterPosOverrides)}
      </div>

      <div className="player-group">
        {renderPlayers(allPitcherIDs, 'Pitcher', pitcherPosOverrides)}
      </div>

    </div>
  )
}

export default Problems;