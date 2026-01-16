interface LevelUpChoice {
  amount?: number;
  attribute?: string;
  id: string;
  label: string;
  type: string;
  boon?: {
    Description: string;
    Emoji: string;
    Name: string;
  };
  description?: string;
  name?: string;
}

interface ScheduledLevelUp {
  applied_at: string;
  choice: LevelUpChoice;
  effective_at: string;
  id: string;
  level: number;
}

interface LevelUpDisplayProps {
  levelUps?: ScheduledLevelUp[];
}

function LevelUp({ levelUps }: LevelUpDisplayProps) {
  if (!levelUps || levelUps.length === 0) return null;

  return (
    <div className="level-ups">
      <h3>Scheduled Level-Ups</h3>
      {levelUps.map(levelUp => (
        <div key={levelUp.id} className="level-up-item">
          <div className="level-badge">Level {levelUp.level}</div>
          
          {levelUp.choice.type === 'attribute' && (
            <div className="attribute-boost">
              +{levelUp.choice.amount} {levelUp.choice.attribute}
            </div>
          )}
          
          {levelUp.choice.type === 'lesser_boon' && levelUp.choice.boon && (
            <div className="boon-choice">
              <span className="boon-emoji">{levelUp.choice.boon.Emoji}</span>
              <span className="boon-name">{levelUp.choice.boon.Name}</span>
              <p className="boon-description">{levelUp.choice.boon.Description}</p>
            </div>
          )}
          
          <div className="effective-time">
            Effective: {new Date(levelUp.effective_at).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}

export default LevelUp;