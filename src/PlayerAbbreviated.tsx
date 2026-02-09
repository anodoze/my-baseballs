import type { Player } from "./types";
import CaretForward from './assets/caret-forward.svg?react'

interface PlayerAbbreviatedProps {
  playerData: Player | null;
  displayPosition: string | null;
  onToggle: () => void; 
}

function PlayerAbbreviated ({playerData, displayPosition, onToggle}: PlayerAbbreviatedProps){
  if (!playerData) return null;

  return (
    <div className="player-card">
      <div className="player-title">
        <div 
          className="player-number"
          onClick={onToggle}
        >
          #{playerData?.Number}
          <CaretForward className='icon' />
        </div>
        <a href={`https://mmolb.com/player/${playerData._id}`}>
          <h1>{displayPosition || playerData?.Position} {playerData?.FirstName} {playerData?.LastName}</h1>
        </a>
      </div>
    </div>
  )
}

export default PlayerAbbreviated;