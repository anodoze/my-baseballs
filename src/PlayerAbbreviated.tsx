import type { Player } from "./types/types";
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
          #{playerData?.number}
          <CaretForward className='icon' />
        </div>
          <h2>{displayPosition || playerData?.position} {playerData?.first_name} {playerData?.last_name}</h2>
      </div>
    </div>
  )
}

export default PlayerAbbreviated;