import { useEffect, useState } from "react";
import type { Player } from "./types";
// import TalkCard from "./TalkCard";


interface PlayerCardProps {
  playerID: string;
}

function PlayerCard({playerID}: PlayerCardProps) {

  const [playerData, setPlayerData] = useState<Player | null>(null)
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    fetch(`http://localhost:3001/api/player/${playerID}`, {
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(res => {
      if (!res.ok) throw new Error('Failed to fetch player data.');
      return res.json();
    })
    .then(data => {
      setPlayerData(data);
    })
    .catch(err => {
      setError(err.message);
    });
  }, [playerID]);

  return (
    <div>
      {error ? error : null }
      <h2>
        {playerData?.FirstName} {playerData?.LastName}
      </h2>
      {/* <TalkCard talk={playerData?.Talk.Batting}/> */}
      {/* <TalkCard talk={playerData?.Talk.Defense}/> */}
      {/* <TalkCard talk={playerData?.Talk.Baserunning}/> */}
      {/* <TalkCard talk={playerData?.Talk.Pitching}/> */}
    </div>
  );
}

export default PlayerCard;
