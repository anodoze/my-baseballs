import { ATTRIBUTE_CATEGORIES, type Category, type AttributeResult } from "./attributeEngine";
import StarDisplay from "./StarDisplay";

interface TalkCardProps {
  title: string;
  attributes: Record<string, AttributeResult>;
  category: Category;
}

function TalkCard({ title, attributes, category }: TalkCardProps) {
  const attrNames = ATTRIBUTE_CATEGORIES[category];

  const attributeList = attrNames.map(attr => {
    const result = attributes[attr];
    if (!result) return null;
    return (
      <li key={attr}>
        <div className="attribute-display">
          <div className="attribute-title">
            <b>{attr.substring(0, 3).toUpperCase()}</b> {Math.round(result.total * 100)}
          </div>
          <StarDisplay
            baseStars={result.baseValue}
            equipStars={result.equipBonus}
            boonStars={result.boonBonus}
          />
        </div>
      </li>
    );
  });

  return (
    <div className="talk-card">
      <h3>{title}</h3>
      <ul>{attributeList}</ul>
    </div>
  );
}

export default TalkCard;