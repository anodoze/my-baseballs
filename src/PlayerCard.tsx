import { useEffect, useRef, useState } from "react";
import type { Player } from "./types";
import TalkCard from "./TalkCard";
import LevelUp from "./LevelUp";
import BoonDisplay from "./BoonIcon";
import PitchChart from "./PitchChart";
import PlayerAbbreviated from "./PlayerAbbreviated";


interface PlayerCardProps {
  playerID: string;
  showPlayer: boolean;
  onToggle: () => void;
}

function PlayerCard({playerID, showPlayer, onToggle}: PlayerCardProps) {

  const [playerData, setPlayerData] = useState<Player | null>(null)
  const [error, setError] = useState<string | null>(null);
  const hasFetched = useRef(false); // this is a fallback for if the component is unnecessarily re-mounting, but we should address the mount issue at some point

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    console.log("fetching player data...")
    fetch(`https://mmolb-proxy.vercel.app/api/player/${playerID}`, {
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

  if (!showPlayer) {
    return (
      <PlayerAbbreviated 
        playerData={playerData}
        showPlayer={showPlayer}
        onToggle={onToggle}
      />
    )
  }

  return (
    <div className="player-card">
      {error ? error : null }
      <div className="player-title">
        <div 
          className="player-number"
          onClick={onToggle}
        >
          #{playerData?.Number}
        </div>
        <a href={`https://mmolb.com/player/${playerID}`}>
          <h1>{playerData?.Position}  {playerData?.FirstName} {playerData?.LastName}</h1>
        </a>
        <div className="boons">
          {playerData?.LesserBoon?.[0] && ( <BoonDisplay boon={playerData?.LesserBoon[0]} /> )}
          {playerData?.LesserBoon?.[0] && ( <BoonDisplay boon={playerData?.LesserBoon[1]} /> )}
          {playerData?.LesserBoon?.[0] && ( <BoonDisplay boon={playerData?.LesserBoon[2]} /> )}
          {playerData?.GreaterBoon?.[0] && ( <BoonDisplay boon={playerData?.GreaterBoon[0]} /> )}
          {playerData?.GreaterBoon?.[0] && ( <BoonDisplay boon={playerData?.GreaterBoon[1]} /> )}
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
