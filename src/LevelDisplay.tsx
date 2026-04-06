import type { LevelUp } from "./types/types";

interface LevelUpDisplayProps {
  levelUps?: LevelUp[];
}

function LevelDisplay({ levelUps }: LevelUpDisplayProps) {
  if (!levelUps || levelUps.length === 0) return null;

  return (
    <>
      <h3>Pending Level-Ups</h3>
      <div className="boons">
        {levelUps.map(levelUp => (
          <div key={levelUp.id} className="level-up">
            
            {levelUp.choice.amount && levelUp.choice.type === 'attribute' && (
              <div className="level-display">
                <h4>
                  Level {levelUp.level}:     
                  +{(levelUp.choice.amount * 100)} {levelUp.choice.attribute}
                </h4>
              </div>
            )}
            
            {levelUp.choice.type === 'lesser_boon' && levelUp.choice.boon && (
              <div className="level-display">
                <h4>{levelUp.choice.boon.Emoji} {levelUp.choice.boon.Name}</h4>
                <p>{levelUp.choice.boon.Description}</p>
              </div>
            )}

            <div className="level-display">
              Chosen: {new Date(levelUp.earned_at).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default LevelDisplay;