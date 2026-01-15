import PlayerCard from "./PlayerCard";
import { useState, useEffect } from "react";
import type { TeamData } from "./types";

function Problems() {
  const [teamData, setTeamData] = useState<TeamData | null>(null)
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/team/6806d81fee9f269dec724b8a', {
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
    <>
      <h1>{teamData.Emoji} {teamData.Location} {teamData.Name} {teamData.Emoji}</h1>
      <PlayerCard playerID={teamData.Players[0].PlayerID} />
      <PlayerCard playerID={teamData.Players[1].PlayerID} />
      <PlayerCard playerID={teamData.Players[2].PlayerID} />
      {/* <PlayerCard playerID={teamData.Players[3].PlayerID} />
      <PlayerCard playerID={teamData.Players[4].PlayerID} />
      <PlayerCard playerID={teamData.Players[5].PlayerID} />
      <PlayerCard playerID={teamData.Players[6].PlayerID} />
      <PlayerCard playerID={teamData.Players[7].PlayerID} />
      <PlayerCard playerID={teamData.Players[8].PlayerID} /> */}
{/* 
      <PlayerCard playerID={teamData.Players[9].PlayerID} />
      <PlayerCard playerID={teamData.Players[10].PlayerID} />
      <PlayerCard playerID={teamData.Players[11].PlayerID} />
      <PlayerCard playerID={teamData.Players[12].PlayerID} />
      <PlayerCard playerID={teamData.Players[13].PlayerID} />
      <PlayerCard playerID={teamData.Players[14].PlayerID} />
      <PlayerCard playerID={teamData.Players[15].PlayerID} />
      <PlayerCard playerID={teamData.Players[16].PlayerID} />
      <PlayerCard playerID={teamData.Players[17].PlayerID} /> */}

    </>
  )
}

export default Problems;