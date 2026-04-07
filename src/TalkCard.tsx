import type { AttributeBreakdown } from "./types/types";
import StarDisplay from "./StarDisplay";

export const ATTRIBUTE_CATEGORIES = {
  Batting:     ['Aiming','Contact','Cunning','Determination','Discipline',
                'Insight','Intimidation','Lift','Muscle','Selflessness','Vision','Wisdom'],
  Baserunning: ['Greed','Performance','Speed','Stealth'],
  Defense:     ['Acrobatics','Agility','Arm','Awareness','Composure',
                'Dexterity','Patience','Reaction'],
  Pitching:    ['Accuracy','Control','Defiance','Deception','Guts',
                'Intuition','Persuasion','Presence','Rotation','Stamina','Stuff','Velocity'],
} as const;

export type Category = keyof typeof ATTRIBUTE_CATEGORIES;

interface TalkCardProps {
  title: string;
  attributes: Record<string, AttributeBreakdown>;
  category: Category;
}

function TalkCard({ title, attributes, category }: TalkCardProps) {
  const attrNames = ATTRIBUTE_CATEGORIES[category];

  const attributeList = attrNames.map(attribute => {
    const result = attributes[attribute];
    if (!result) return null;
    return (
      <li key={attribute}>
        <div className="attribute-display">
          <div className="attribute-title">
            <b>{attribute}</b> {Math.round(result.total * 100)}
          </div>
          <StarDisplay
            baseStars={result.baseValue}
            augmentStars={result.augmentBonus}
            equipStars={result.equipBonus}
            boonStars={result.boonBonus}
            total={result.total}
          />
        </div>
      </li>
    );
  });

  return (
    <div className="talk-card">
      <div className="talk-title">{title}</div>
      <ul>{attributeList}</ul>
    </div>
  );
}

export default TalkCard;