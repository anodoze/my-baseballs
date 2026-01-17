interface LevelUpChoice {
  amount?: number;
  attribute?: string;
  bonus?: number;
  category?: string;
  id: string;
  label: string;
  type: string;
  pitch_type?: string;
  new_pitch?: string;
  old_pitch?: string;
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
    <>
      <h3>Scheduled Level-Ups</h3>
    <div className="boons">
      {levelUps.map(levelUp => (
        <div key={levelUp.id} className="level-up">
          
          {levelUp.choice.amount && levelUp.choice.type === 'attribute' && (
            <div className="level-display">
              <h3>
                Level {levelUp.level}:     
                +{(levelUp.choice.amount * 100)} {levelUp.choice.attribute}
              </h3>
            </div>
          )}
          
          {levelUp.choice.type === 'lesser_boon' && levelUp.choice.boon && (
            <div className="level-display">
              <h3>{levelUp.choice.boon.Emoji} {levelUp.choice.boon.Name}</h3>
              <p>{levelUp.choice.boon.Description}</p>
            </div>
          )}

          {levelUp.choice.type === 'greater_boon' && levelUp.choice.boon && (
            <div className="level-display">
              <h3>{levelUp.choice.boon.Emoji} {levelUp.choice.boon.Name}</h3>
              <p>{levelUp.choice.boon.Description}</p>
            </div>
          )}

          {levelUp.choice.type === 'pitch_type_bonus' && (
            <div className="level-display">
              <h3>
                Level {levelUp.level}: +{(levelUp.choice.bonus! * 100)}% effectiveness for {levelUp.choice.pitch_type}
              </h3>
            </div>
          )}

          {levelUp.choice.type === 'pitch_replace' && (
            <div className="level-display">
              <h3>
                Level {levelUp.level}: Replace {levelUp.choice.old_pitch} with {levelUp.choice.new_pitch}
              </h3>
            </div>
          )}

          {levelUp.choice.type === 'pitch_learn' && (
            <div className="level-display">
              <h3>
                Level {levelUp.level}: Learn {levelUp.choice.pitch_type} (Breaking)
              </h3>
            </div>
          )}

          {levelUp.choice.type === 'pitch_category_bonus' && (
            <div className="level-display">
              <h3>
                Level {levelUp.level}: +{(levelUp.choice.bonus! * 100)}% effectiveness for {levelUp.choice.category} pitches
              </h3>
            </div>
          )}

          {levelUp.choice.type === 'pitch_forget' && (
            <div className="level-display">
              <h3>
                Level {levelUp.level}: Forget {levelUp.choice.old_pitch}
              </h3>
            </div>
          )}

          <div className="level-display">
            Effective: {new Date(levelUp.effective_at).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
    </>
  );
}

export default LevelUp;