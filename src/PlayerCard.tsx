import type { Player } from "./types/types";
import TalkCard from "./TalkCard";
import LevelDisplay from "./LevelDisplay";
import BoonDisplay from "./BoonIcon";
import PitchChart from "./PitchChart";
import PlayerAbbreviated from "./PlayerAbbreviated";
import CaretDown from "./assets/caret-down.svg?react";
import clsx from 'clsx';

interface PlayerCardProps {
  playerID: string;
  playerData: Player | null;
  showPlayer: boolean;
  displayMode: 'all' | 'batting' | 'defense' | 'baserunning' | 'pitching';
  showScheduled: boolean;
  onToggle: () => void;
  invertAttributes: boolean;
}

function PlayerCard({ playerData, showPlayer, displayMode, showScheduled, onToggle, invertAttributes }: PlayerCardProps) {

  if (!playerData) return;

  if (!showPlayer) {
    return (
      <PlayerAbbreviated
        playerData={playerData}
        displayPosition={playerData.slot}
        onToggle={onToggle}
      />
    );
  }

  // const attributes = playerData ? computeAttributes(playerData, showScheduled) : null;
  const attributes = playerData.player_details?.details.attributeBreakdown

  const displayType = playerData
    ? (invertAttributes
      ? (playerData.position_type === 'Batter' ? 'Pitcher' : 'Batter')
      : playerData.position_type)
    : null;

  return (
    <div className="player-card">
      <div className="player-title">
        <div className="player-number" onClick={onToggle}>
          #{playerData?.number}
          <CaretDown className='icon' />
        </div>
          <div className="player-name">{playerData?.slot} {playerData?.first_name} {playerData?.last_name}</div>
      </div>
        <div className="boons">
          {playerData?.player_details?.details.lesserBoon?.map(boon => <BoonDisplay key={boon.Name} boon={boon} />)}
        </div>

      {displayType === 'Batter' && attributes && (
        <div className={clsx('batting-card', { 'isolated': displayMode !== 'all' })}>
          {(displayMode === 'all' || displayMode === 'batting') && (
            <TalkCard title="Batting" attributes={attributes} category="Batting" />
          )}
          {displayMode === 'all' && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <TalkCard title="Defense" attributes={attributes} category="Defense" />
              <TalkCard title="Baserunning" attributes={attributes} category="Baserunning" />
            </div>
          )}
          {displayMode === 'defense' && (
            <TalkCard title="Defense" attributes={attributes} category="Defense" />
          )}
          {displayMode === 'baserunning' && (
            <TalkCard title="Baserunning" attributes={attributes} category="Baserunning" />
          )}
        </div>
      )}

      {displayType === 'Pitcher' && attributes && (
        <div className={clsx('pitching-card', { 'isolated': displayMode !== 'all' })}>
          {(displayMode === 'all' || displayMode === 'pitching') && (
            <TalkCard title="Pitching" attributes={attributes} category="Pitching" />
          )}
          {displayMode === 'all' && playerData && (
            <PitchChart
              pitchSelection={playerData.player_details?.details.pitchSelection ?? null}
              pitchTypes={playerData.player_details?.details.pitchTypes ?? null}
            />
          )}
        </div>
      )}
      {showScheduled &&
        <LevelDisplay levelUps={playerData?.player_details?.details.scheduledLevelUps} />
      }
    </div>
  );
}

export default PlayerCard;