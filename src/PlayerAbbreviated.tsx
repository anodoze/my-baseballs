import type { Player } from "./types";

interface PlayerAbbreviatedProps {
  playerData: Player | null;
  onToggle: () => void; 
}

function PlayerAbbreviated ({playerData, onToggle}: PlayerAbbreviatedProps){
  if (!playerData) return null;

  return (
    <div className="player-card">
      <div className="player-title">
        <div 
          className="player-number"
          onClick={onToggle}
        >
          #{playerData?.Number}
        </div>
        <a href={`https://mmolb.com/player/${playerData._id}`}>
          <h1>{playerData?.Position}  {playerData?.FirstName} {playerData?.LastName}</h1>
        </a>
      </div>
    </div>
  )
}

export default PlayerAbbreviated;