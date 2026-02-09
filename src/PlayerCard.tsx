import { useEffect, useRef, useState } from "react";
import type { Player } from "./types";
import TalkCard from "./TalkCard";
import LevelUp from "./LevelUp";
import BoonDisplay from "./BoonIcon";
import PitchChart from "./PitchChart";
import PlayerAbbreviated from "./PlayerAbbreviated";
import CaretDown from "./assets/caret-down.svg?react"
import clsx from 'clsx';

interface PlayerCardProps {
  playerID: string;
  displayPosition: string | null;
  showPlayer: boolean | false;
  displayMode: 'all' | 'batting' | 'defense' | 'baserunning' | 'pitching';
  onToggle: () => void;
}

function PlayerCard({playerID, displayPosition, showPlayer, displayMode, onToggle}: PlayerCardProps) {

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
        displayPosition={displayPosition}
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
          <CaretDown className='icon' />
        </div>
        <a href={`https://mmolb.com/player/${playerID}`}>
          <h1>{displayPosition || playerData?.Position} {playerData?.FirstName} {playerData?.LastName}</h1>
        </a>
        <div className="boons">
          {playerData?.LesserBoon?.[0] && ( <BoonDisplay boon={playerData?.LesserBoon[0]} /> )}
          {playerData?.LesserBoon?.[0] && ( <BoonDisplay boon={playerData?.LesserBoon[1]} /> )}
          {playerData?.LesserBoon?.[0] && ( <BoonDisplay boon={playerData?.LesserBoon[2]} /> )}
          {playerData?.GreaterBoon?.[0] && ( <BoonDisplay boon={playerData?.GreaterBoon[0]} /> )}
          {playerData?.GreaterBoon?.[0] && ( <BoonDisplay boon={playerData?.GreaterBoon[1]} /> )}
        </div>
      </div>
      {playerData?.PositionType == "Batter" && (
        <div className={clsx('batting-card', { 'isolated': displayMode !== 'all'})}>
          {(displayMode === 'all' || displayMode === 'batting') && (
            <TalkCard title={"Batting"} talk={playerData?.AttributeStars.Batting}/>
          )}
          {displayMode === 'all' && <div>
            <TalkCard title={"Defense"} talk={playerData?.AttributeStars.Defense}/>
            <TalkCard title={"Baserunning"} talk={playerData?.AttributeStars.Baserunning}/>
          </div>}
          {displayMode === 'defense' && (
            <TalkCard title={"Defense"} talk={playerData?.AttributeStars.Defense}/>
          )}
          {displayMode === 'baserunning' && (
            <TalkCard title={"Baserunning"} talk={playerData?.AttributeStars.Baserunning}/>
          )}
        </div>
      )}
      
      {playerData?.PositionType == "Pitcher" && (
        <div className={clsx('pitching-card', { 'isolated': displayMode !== 'all'})}>
          {(displayMode === 'all' || displayMode === 'pitching') && (
            <TalkCard title={"Pitching"} talk={playerData?.AttributeStars.Pitching}/>
          )}
          {displayMode === 'all' && (
            <PitchChart 
              pitchSelection={playerData?.PitchSelection} 
              pitchTypes={playerData.PitchTypes}
              pitchCategoryBonuses={playerData.PitchCategoryBonuses}
              pitchTypeBonuses={playerData.PitchTypeBonuses}
            />
          )}
        </div>
      )}
      <LevelUp levelUps={playerData?.ScheduledLevelUps} />
    </div>
  );
}

export default PlayerCard;
