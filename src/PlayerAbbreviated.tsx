import type { PlayerDetails } from "./types/types";
import CaretForward from './assets/caret-forward.svg?react'
// import Statbox from "./Statbox";

interface PlayerAbbreviatedProps {
  playerData: PlayerDetails | null;
  displayPosition: string | null;
  onToggle: () => void; 
}

function PlayerAbbreviated ({playerData, displayPosition, onToggle}: PlayerAbbreviatedProps){
  if (!playerData) return null;

  return (
    <div className="player-card">
      <div className="player-title">
        <div className="player-number"onClick={onToggle}>
          #{playerData?.Number}
          <CaretForward className='icon' />
        </div>
          <div className="player-name">{displayPosition || playerData?.Position} {playerData?.FirstName} {playerData?.LastName}</div>
      </div>
    </div>
  )
}

export default PlayerAbbreviated;