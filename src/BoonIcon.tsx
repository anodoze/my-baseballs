import { useState } from "react";

interface BoonDisplayProps {
  boon?: {
    Name: string;
    Description: string;
    Emoji: string;
  };
}

function BoonDisplay({boon}: BoonDisplayProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  if (!boon) return null 

  return(
    <div className="boon-emoji" onClick={() => setShowTooltip(!showTooltip)}>
      {!showTooltip && <div style={{fontSize: "30px"}} className="boon-display">{boon.Emoji}</div>}

      {showTooltip && (
        <div className="boon-display">
          <h3>{boon.Emoji} {boon.Name}</h3>
          <p>{boon.Description}</p>
        </div>)}
    </div>
  )
}

export default BoonDisplay;