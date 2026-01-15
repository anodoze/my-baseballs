import StarDisplay from "./StarDisplay";

interface TalkCardProps {
  talk?: {
    [key: string]: {
      base_total: number;
      total: number;
    }
  }
}

function TalkCard ({talk}: TalkCardProps) {
  if (!talk) return null;

  console.log(talk)
  
  const attributeList = Object.keys(talk).map(attr => 
    <li key={attr} >  
      {attr} {Math.round(talk[attr].total * 100)} 
      <StarDisplay 
        baseStars={talk[attr].base_total} 
        totalStars={talk[attr].total}
      />
    </li>
  );

  return(
    <div className="talk-card">
      <ul>
        { attributeList }
      </ul>
    </div>
  )
}

export default TalkCard;