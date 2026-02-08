import PlayerCard from "./PlayerCard";
import { useMemo, useState, useEffect } from "react";
import type { TeamData } from "./types";
// import type { Player } from "./types";
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

  const sortedBatterIDs = useMemo(() => {
    const expandedIDs = batterIDs.filter(id => playerVisibility[id] ?? true);
    const collapsedIDs = batterIDs.filter(id => !(playerVisibility[id] ?? true));
    return [...expandedIDs, ...collapsedIDs];
  }, [batterIDs, playerVisibility]);

  useEffect(() => {
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

  const renderPlayers = (playerIDs: string[]) => {
    const expandedIDs = playerIDs.filter(id => playerVisibility[id] ?? true);
    const collapsedIDs = playerIDs.filter(id => !(playerVisibility[id] ?? true));
    
    return [...expandedIDs, ...collapsedIDs].map(id => (
      <PlayerCard
        key={id}
        playerID={id}
        showPlayer={playerVisibility[id] ?? false}
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
    </div>

      <div className="player-group">
        {renderPlayers(batterIDs)}
        {/* <PlayerCard playerID={teamData.Players[0].PlayerID} 
          showPlayer={playerVisibility[teamData.Players[0].PlayerID] ?? false}
          onToggle={() => togglePlayer(teamData.Players[0].PlayerID)}
        />        
        <PlayerCard playerID={teamData.Players[1].PlayerID} 
          showPlayer={playerVisibility[teamData.Players[1].PlayerID] ?? false}
          onToggle={() => togglePlayer(teamData.Players[1].PlayerID)}
        />        
        <PlayerCard playerID={teamData.Players[2].PlayerID} 
          showPlayer={playerVisibility[teamData.Players[2].PlayerID] ?? false}
          onToggle={() => togglePlayer(teamData.Players[2].PlayerID)}
        />        
        <PlayerCard playerID={teamData.Players[3].PlayerID} 
          showPlayer={playerVisibility[teamData.Players[3].PlayerID] ?? false}
          onToggle={() => togglePlayer(teamData.Players[3].PlayerID)}
        />
        <PlayerCard playerID={teamData.Players[4].PlayerID} 
          showPlayer={playerVisibility[teamData.Players[4].PlayerID] ?? false}
          onToggle={() => togglePlayer(teamData.Players[4].PlayerID)}
        />        
        <PlayerCard playerID={teamData.Players[5].PlayerID} 
          showPlayer={playerVisibility[teamData.Players[5].PlayerID] ?? false}
          onToggle={() => togglePlayer(teamData.Players[5].PlayerID)}
        />        
        <PlayerCard playerID={teamData.Players[6].PlayerID} 
          showPlayer={playerVisibility[teamData.Players[6].PlayerID] ?? false}
          onToggle={() => togglePlayer(teamData.Players[6].PlayerID)}
        />        
        <PlayerCard playerID={teamData.Players[7].PlayerID} 
          showPlayer={playerVisibility[teamData.Players[7].PlayerID] ?? false}
          onToggle={() => togglePlayer(teamData.Players[7].PlayerID)}
        />
        <PlayerCard playerID={teamData.Players[8].PlayerID} 
          showPlayer={playerVisibility[teamData.Players[8].PlayerID] ?? false}
          onToggle={() => togglePlayer(teamData.Players[8].PlayerID)}
        />

        <PlayerCard playerID={teamData.Bench.Batters[0].PlayerID} 
          showPlayer={playerVisibility[teamData.Bench.Batters[0].PlayerID] ?? false}
          onToggle={() => togglePlayer(teamData.Bench.Batters[0].PlayerID)}
        />
        <PlayerCard playerID={teamData.Bench.Batters[1].PlayerID} 
          showPlayer={playerVisibility[teamData.Bench.Batters[1].PlayerID] ?? false}
          onToggle={() => togglePlayer(teamData.Bench.Batters[1].PlayerID)}
        />        
        <PlayerCard playerID={teamData.Bench.Batters[2].PlayerID} 
          showPlayer={playerVisibility[teamData.Bench.Batters[2].PlayerID] ?? false}
          onToggle={() => togglePlayer(teamData.Bench.Batters[2].PlayerID)}
        />
        <PlayerCard playerID={teamData.Bench.Batters[3].PlayerID} 
          showPlayer={playerVisibility[teamData.Bench.Batters[3].PlayerID] ?? false}
          onToggle={() => togglePlayer(teamData.Bench.Batters[3].PlayerID)}
        /> */}
      </div>

      <div className="player-group">
        {/* <PlayerCard playerID={teamData.Players[9].PlayerID} />
        <PlayerCard playerID={teamData.Players[10].PlayerID} />
        <PlayerCard playerID={teamData.Players[11].PlayerID} />
        <PlayerCard playerID={teamData.Players[12].PlayerID} />
        <PlayerCard playerID={teamData.Players[13].PlayerID} />
        <PlayerCard playerID={teamData.Players[14].PlayerID} />
        <PlayerCard playerID={teamData.Players[15].PlayerID} />
        <PlayerCard playerID={teamData.Players[16].PlayerID} />
        <PlayerCard playerID={teamData.Players[17].PlayerID} />
        <PlayerCard playerID={teamData.Bench.Pitchers[0].PlayerID} />
        <PlayerCard playerID={teamData.Bench.Pitchers[1].PlayerID} />
        <PlayerCard playerID={teamData.Bench.Pitchers[2].PlayerID} />
        <PlayerCard playerID={teamData.Bench.Pitchers[3].PlayerID} /> */}
      </div>

    </div>
  )
}

export default Problems;