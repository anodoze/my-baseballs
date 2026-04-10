import PlayerCard from "./PlayerCard";
import TeamMenu from "./TeamMenu";
import { useState, useEffect } from "react";
import type { TeamData } from "./db";
import type { Player, PlayerDetails, RecentTeam } from "./types/types";
import './Problems.css'
import { useParams } from "react-router";
import { fetchTeam } from "./db";

const SLOT_ORDER = [
  'C', '1B', '2B', '3B', 'SS', 'LF', 'CF', 'RF', 'DH',
  'B1', 'B2', 'B3', 'B4',
  'SP1', 'SP2', 'SP3', 'SP4', 'SP5',
  'RP1', 'RP2', 'RP3', 'CL',
  'P1', 'P2', 'P3', 'P4',
];

function Problems() {
  const { id } = useParams()
  const [teamData, setTeamData] = useState<TeamData | null>(null)
  const [players, setPlayers] = useState<Player[]>([])
  const [error, setError] = useState<string | null>(null);
  const [playerVisibility, setPlayerVisibility] = useState<Record<string, boolean>>({})
  const [batterDisplayMode, setBatterDisplayMode] = useState<'all' | 'batting' | 'defense' | 'baserunning'>('all');
  const [pitcherDisplayMode, setPitcherDisplayMode] = useState<'all' | 'pitching'>('all');
  const [showScheduled, setShowScheduled] = useState(false);
  const [invertAttributes, setInvertAttributes] = useState(false);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  
  const teamNameDisplay = `${teamData?.emoji} ${teamData?.location} ${teamData?.name}`

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


  const batterIDs = ([
    ...players.slice(0, 13) ?? []
  ].map(p => p.id) ?? [])

  const pitcherIDs = ([
    ...players.slice(13, 26) ?? []
  ].map(p => p.id) ?? [])
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!teamData) return;
    const recent: RecentTeam[] = JSON.parse(localStorage.getItem('recentTeams') ?? '[]')
    const entry = { id: teamData.id, name: teamData.name, location: teamData.location, emoji: teamData.emoji, color: teamData.color }
    const updated = [entry, ...recent.filter(t => t.id !== teamData.id)].slice(0, 10)
    localStorage.setItem('recentTeams', JSON.stringify(updated))
  }, [teamData])

  useEffect(() => { // initialize visibility so that roster ordering works
    if (!teamData) return;  
    document.title = teamNameDisplay

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
      data.players.sort((a, b) => {
        const ai = SLOT_ORDER.indexOf(a.slot);
        const bi = SLOT_ORDER.indexOf(b.slot);
        return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
      })

      setTeamData(data);

      setPlayers(data.players.map(p => ({ // todo: find out if we can avoid this insane casting nonsesnse
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
      <TeamMenu 
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