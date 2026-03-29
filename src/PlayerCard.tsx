import { useEffect, useRef, useState } from "react";
import type { Player } from "./types";
import TalkCard from "./TalkCard";
import LevelUp from "./LevelUp";
import BoonDisplay from "./BoonIcon";
import PitchChart from "./PitchChart";
import PlayerAbbreviated from "./PlayerAbbreviated";
import CaretDown from "./assets/caret-down.svg?react";
import clsx from 'clsx';
import { getLastInvalidation } from "./net-utils";
import { computeAttributes, } from "./attributeEngine";

interface PlayerCardProps {
  playerID: string;
  displayPosition: string | null;
  showPlayer: boolean;
  displayMode: 'all' | 'batting' | 'defense' | 'baserunning' | 'pitching';
  showScheduled: boolean;
  onToggle: () => void;
}

function PlayerCard({ playerID, displayPosition, showPlayer, displayMode, showScheduled, onToggle }: PlayerCardProps) {
  const [playerData, setPlayerData] = useState<Player | null>(null);
  const [error, setError] = useState<string | null>(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const cacheKey = `player-${playerID}`;
    const stored = JSON.parse(localStorage.getItem(cacheKey) ?? '{}');
    const TTL = 20 * 60000;
    const fresh = stored.timestamp &&
      stored.timestamp > getLastInvalidation() &&
      (Date.now() - stored.timestamp) < TTL;

    if (fresh) {
      setPlayerData(stored.data);
      return;
    }

    fetch(`https://mmolb-proxy.vercel.app/api/player/${playerID}`, {
      headers: { 'Accept': 'application/json' }
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch player data.');
        return res.json();
      })
      .then(data => {
        setPlayerData(data);
        localStorage.setItem(cacheKey, JSON.stringify({ data, timestamp: Date.now() }));
      })
      .catch(err => setError(err.message));
  }, [playerID]);

  if (!showPlayer) {
    return (
      <PlayerAbbreviated
        playerData={playerData}
        displayPosition={displayPosition}
        onToggle={onToggle}
      />
    );
  }

  const attributes = playerData ? computeAttributes(playerData, showScheduled) : null;

  return (
    <div className="player-card">
      {error ? error : null}
      <div className="player-title">
        <div className="player-number" onClick={onToggle}>
          #{playerData?.Number}
          <CaretDown className='icon' />
        </div>
        <a href={`https://mmolb.com/player/${playerID}`}>
          <h1>{displayPosition || playerData?.Position} {playerData?.FirstName} {playerData?.LastName}</h1>
        </a>
        <div className="boons">
          {playerData?.LesserBoon?.map(boon => <BoonDisplay key={boon.Name} boon={boon} />)}
          {/* {playerData?.GreaterBoon?.map(boon => <BoonDisplay key={boon.Name} boon={boon} />)} */}
        </div>
      </div>

      {playerData?.PositionType === 'Batter' && attributes && (
        <div className={clsx('batting-card', { 'isolated': displayMode !== 'all' })}>
          {(displayMode === 'all' || displayMode === 'batting') && (
            <TalkCard title="Batting" attributes={attributes} category="Batting" />
          )}
          {displayMode === 'all' && (
            <>
              <TalkCard title="Defense" attributes={attributes} category="Defense" />
              <TalkCard title="Baserunning" attributes={attributes} category="Baserunning" />
            </>
          )}
          {displayMode === 'defense' && (
            <TalkCard title="Defense" attributes={attributes} category="Defense" />
          )}
          {displayMode === 'baserunning' && (
            <TalkCard title="Baserunning" attributes={attributes} category="Baserunning" />
          )}
        </div>
      )}

      {playerData?.PositionType === 'Pitcher' && attributes && (
        <div className={clsx('pitching-card', { 'isolated': displayMode !== 'all' })}>
          {(displayMode === 'all' || displayMode === 'pitching') && (
            <TalkCard title="Pitching" attributes={attributes} category="Pitching" />
          )}
          {displayMode === 'all' && (
            <PitchChart
              pitchSelection={playerData.PitchSelection}
              pitchTypes={playerData.PitchTypes}
            />
          )}
        </div>
      )}

      <LevelUp levelUps={playerData?.ScheduledLevelUps} />
    </div>
  );
}

export default PlayerCard;