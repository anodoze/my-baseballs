import { useEffect, useState } from "react";
import type { Player } from "./types";
import TalkCard from "./TalkCard";
import Statbox from "./Statbox";
import LevelUp from "./LevelUp";
import BoonDisplay from "./BoonIcon";
import PitchChart from "./PitchChart";


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
      <div className="player-title">
        <div className="player-number">#{playerData?.Number}</div>
        <h1>{playerData?.Position}  {playerData?.FirstName} {playerData?.LastName}</h1>
        <div className="boons">
          <BoonDisplay boon={playerData?.LesserBoon[0]} />
          <BoonDisplay boon={playerData?.LesserBoon[1]} />
          <BoonDisplay boon={playerData?.LesserBoon[2]} />
          <BoonDisplay boon={playerData?.GreaterBoon[0]} />
          <BoonDisplay boon={playerData?.GreaterBoon[1]} />
        </div>
      </div>
      {playerData?.PositionType == "Batter" && <div className="batting-card">
        <TalkCard title={"Batting"} talk={playerData?.AttributeStars.Batting}/>
        <div>
          <TalkCard title={"Defense"} talk={playerData?.AttributeStars.Defense}/>
          <TalkCard title={"Baserunning"} talk={playerData?.AttributeStars.Baserunning}/>
        </div>
      </div>}
      {playerData?.PositionType == "Pitcher" && <div className="pitching-card">
        <TalkCard title={"Pitching"} talk={playerData?.AttributeStars.Pitching}/>
        <PitchChart 
          pitchSelection={playerData?.PitchSelection} 
          pitchTypes={playerData.PitchTypes}
          pitchCategoryBonuses={playerData.PitchCategoryBonuses}
          pitchTypeBonuses={playerData.PitchTypeBonuses}
        />
      </div>}
      <LevelUp levelUps={playerData?.ScheduledLevelUps} />
    </div>
  );
}

export default PlayerCard;
