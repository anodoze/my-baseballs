import { useEffect, useState } from "react";
import type { Player } from "./types";
import TalkCard from "./TalkCard";
import './PlayerCard.css'


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
    <div className="player-card">
      {error ? error : null }
      <h1>
        {playerData?.FirstName} {playerData?.LastName}
      </h1>
      <div className="batting-card">
        <TalkCard talk={playerData?.AttributeStars.Batting}/>
        <div>
          <TalkCard talk={playerData?.AttributeStars.Defense}/>
          <TalkCard talk={playerData?.AttributeStars.Baserunning}/>
        </div>
      </div>
      <div className="pitching-card">
        <TalkCard talk={playerData?.AttributeStars.Pitching}/>
      </div>
    </div>
  );
}

export default PlayerCard;
