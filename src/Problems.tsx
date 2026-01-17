import PlayerCard from "./PlayerCard";
import { useState, useEffect } from "react";
import type { TeamData } from "./types";
import './Problems.css'
import { useParams } from "react-router";

function Problems() {
  const { id } = useParams()
  const [teamData, setTeamData] = useState<TeamData | null>(null)
  const [error, setError] = useState<string | null>(null);

  const [showBatters, setShowBatters] = useState(true);
  const [showPitchers, setShowPitchers] = useState(true);
  const [showBench, setShowBench] = useState(true);

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

  if (!teamData) return <div>{error}</div>

  return (
    <div className="problems">
      {/* <h1>{teamData.Emoji} {teamData.Location} {teamData.Name} {teamData.Emoji}</h1> */}
    <div className="toggle-menu">
      {/* <div style={{fontSize: "26pt"}} > {teamData.Emoji} </div> */}
      <button className="navbar-button" onClick={() => setShowBatters(!showBatters)}>
        {showBatters ? 'hide batters' : 'show batters'}
      </button>
      <button className="navbar-button" onClick={() => setShowPitchers(!showPitchers)}>
        {showPitchers ? 'hide pitchers' : 'show pitchers'}
      </button>
      <button className="navbar-button" onClick={() => setShowBench(!showBench)}>
        {showBench ? 'hide bench' : 'show bench'}
      </button>
    </div>

    {showBatters &&
      <div className="player-group">
        <PlayerCard playerID={teamData.Players[0].PlayerID} />
        <PlayerCard playerID={teamData.Players[1].PlayerID} />
        <PlayerCard playerID={teamData.Players[2].PlayerID} />
        <PlayerCard playerID={teamData.Players[3].PlayerID} />
        <PlayerCard playerID={teamData.Players[4].PlayerID} />
        <PlayerCard playerID={teamData.Players[5].PlayerID} />
        <PlayerCard playerID={teamData.Players[6].PlayerID} />
        <PlayerCard playerID={teamData.Players[7].PlayerID} />
        <PlayerCard playerID={teamData.Players[8].PlayerID} />
      </div>
    }

    {showBench &&
      <div className="player-group">
        <PlayerCard playerID={teamData.Bench.Batters[0].PlayerID} />
        <PlayerCard playerID={teamData.Bench.Batters[1].PlayerID} />
        <PlayerCard playerID={teamData.Bench.Batters[2].PlayerID} />
        <PlayerCard playerID={teamData.Bench.Batters[3].PlayerID} />
      </div>
    }

    {showPitchers &&
      <div className="player-group">
        <PlayerCard playerID={teamData.Players[9].PlayerID} />
        <PlayerCard playerID={teamData.Players[10].PlayerID} />
        <PlayerCard playerID={teamData.Players[11].PlayerID} />
        <PlayerCard playerID={teamData.Players[12].PlayerID} />
        <PlayerCard playerID={teamData.Players[13].PlayerID} />
        <PlayerCard playerID={teamData.Players[14].PlayerID} />
        <PlayerCard playerID={teamData.Players[15].PlayerID} />
        <PlayerCard playerID={teamData.Players[16].PlayerID} />
        <PlayerCard playerID={teamData.Players[17].PlayerID} />
      </div>
    }

    {showBench &&
      <div className="player-group">
        <PlayerCard playerID={teamData.Bench.Pitchers[0].PlayerID} />
        <PlayerCard playerID={teamData.Bench.Pitchers[1].PlayerID} />
        <PlayerCard playerID={teamData.Bench.Pitchers[2].PlayerID} />
        <PlayerCard playerID={teamData.Bench.Pitchers[3].PlayerID} />
      </div>
    }
    </div>
  )
}

export default Problems;