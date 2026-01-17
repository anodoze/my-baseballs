import StarDisplay from "./StarDisplay";

interface TalkCardProps {
  title: string,
  talk?: {
    [key: string]: {
      base_total: number;
      total: number;
    }
  }
}

function TalkCard ({talk, title}: TalkCardProps) {
  if (!talk) return null;
  
  const attributeList = Object.keys(talk).map(attr => 
    <li key={attr} >
      <div className="attribute-display">
        <div className="attribute-title">
          <b>{attr.substring(0, 3).toUpperCase()}</b> {Math.round(talk[attr].total * 100)} 
        </div>  
        <StarDisplay 
          baseStars={talk[attr].base_total} 
          totalStars={talk[attr].total}
          />
      </div>
    </li>
  );

  return(
    <div className="talk-card">
      <h3>{title}</h3>
      <ul>
        { attributeList }
      </ul>
    </div>
  )
}

export default TalkCard;