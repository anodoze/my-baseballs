import PlayerCard from "./PlayerCard";
import TeamNavbar from "./TeamNavbar";
import { useState, useEffect } from "react";
import type { TeamData } from "./db";
import type { Player, PlayerDetails } from "./types/types";
import './Problems.css'
import { useParams } from "react-router";
import { fetchTeam } from "./db";

function Problems() {
  const { id } = useParams()
  const [teamData, setTeamData] = useState<TeamData | null>(null)
  const [players, setPlayers] = useState<Player[]>([])
  const [error, setError] = useState<string | null>(null);
  const [playerVisibility, setPlayerVisibility] = useState<Record<string, boolean>>({})
  const [batterDisplayMode, setBatterDisplayMode] = useState<'all' | 'batting' | 'defense' | 'baserunning'>('all');
  const [pitcherDisplayMode, setPitcherDisplayMode] = useState<'all' | 'pitching'>('all');
  const [showScheduled, setShowScheduled] = useState(false);
  // const [previewScheduled, setPreviewScheduled] = useState(false);
  const [invertAttributes, setInvertAttributes] = useState(false);


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

  const teamNameDisplay = `${teamData?.emoji} ${teamData?.location} ${teamData?.name}`

  const batterIDs = [
    ...teamData?.players.slice(0, 9) ?? [],
    ...teamData?.players.slice(18, 22) ?? [],
  ].map(p => p.id) ?? [];

  const pitcherIDs = [
    ...teamData?.players.slice(9, 18) ?? [],
    ...teamData?.players.slice(22, 26) ?? [],
  ].map(p => p.id) ?? [];
  
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => { // initialize visibility so that roster ordering works
    if (!teamData) return;  
    const allPlayerIDs = [
      ...batterIDs,
      ...pitcherIDs
    ];   
    const initialVisibility = Object.fromEntries(
      allPlayerIDs.map(id => [id, false])
  );
  
  setPlayerVisibility(initialVisibility);
}, [teamData]);

  useEffect(() => { 
    console.log("fetching team data...", id)
    fetchTeam(`${id}`).then(data =>{
      console.log(data)
      setTeamData(data);
      setPlayers(data.players?.map(p => ({ // todo: find out if we can avoid this insane casting nonsesnse
      ...p,
      player_details: p.player_details 
        ? { details: p.player_details.details as unknown as PlayerDetails }
        : null
    })) ?? [])
    })
    .catch(error => {
      setError(error.message)
    })
  }, []);

  const renderPlayers = (playerIDs: string[], positionType: 'Batter' | 'Pitcher') => {
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
        playerData={players.find(p => p.id === id) ?? null}
        showPlayer={playerVisibility[id] ?? false}
        displayMode={positionType === 'Batter' ? batterDisplayMode : pitcherDisplayMode}
        showScheduled={showScheduled}
        onToggle={() => togglePlayer(id)}
        invertAttributes={invertAttributes}
      />
    ));
  };

  if (!teamData) return <div>{error}</div>

  return (
    <div className="problems">
      <TeamNavbar 
        teamName={teamNameDisplay}
        batterIDs={batterIDs}
        pitcherIDs={pitcherIDs}
        toggleGroup={toggleGroup}
        batterDisplayMode={batterDisplayMode}
        setBatterDisplayMode={setBatterDisplayMode}
        pitcherDisplayMode={pitcherDisplayMode}
        setPitcherDisplayMode={setPitcherDisplayMode}
        showScheduled={showScheduled}
        setShowScheduled={setShowScheduled}
        invertAttributes={invertAttributes}
        setInvertAttributes={setInvertAttributes}
      />

      <div className="player-group">
        {renderPlayers(batterIDs, 'Batter')}
      </div>

      <div className="player-group">
        {renderPlayers(pitcherIDs, 'Pitcher')}
      </div>

    </div>
  )
}

export default Problems;