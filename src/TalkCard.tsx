import StarDisplay from "./StarDisplay";

interface TalkCardProps {
  talk: {
    quote: string;
    attributes: { [key: string]: number }
    stars: {
      [key: string]: {
        base_total: number;
        total: number;
      }
    }
  }
}

function TalkCard ({talk}: TalkCardProps) {
  
  const attributeList = talk?.stars
    ?  Object.keys(talk.stars).map(attr => 
    <li key={attr} >  {attr} {Math.round(talk.stars[attr].base_total * 100)} <StarDisplay stars={talk.stars[attr].base_total}/></li>
  ) : null ;

  return(
    <div>
      {talk?.quote}
      <ul>
        { attributeList }
      </ul>
    </div>
  )
}

export default TalkCard;