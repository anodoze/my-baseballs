import { useEffect, useState } from "react"
import { groupByBoard, fetchAttributeLeaderboard } from "./db"
import type { AttributeLeaderboardRow } from "./db"
import { useParams } from "react-router"
import Leaderboard from "./Leaderboard"
import './leaderboard.css'

const ATTRIBUTE_ORDER = ['BA', 'BABIP', 'HR']

function AttributeLeaderboards(){
  // const { leagueID } = useParams() todo: change routing and use params so peopel can bookmark their league
  const [sickoData, setSickoData] = useState<Record<string, AttributeLeaderboardRow[]> | null>(null)

    useEffect(() => {
    setSickoData(null)
    console.log("fetching leaderboards...")

    document.title = "sickosyes.png"
    
    const sickoFetch = fetchAttributeLeaderboard();

    sickoFetch.then(data =>{
      const boards = groupByBoard(data)
      setSickoData(boards)
    })
  }, [])

  const sickoLeaders = sickoData ? Object.entries(sickoData).map(([statKey, leaderboard]) => {
    return (
      <Leaderboard key={statKey} 
      leaderboardType={'attribute'}
      statKey={statKey} 
      leaderboard={leaderboard}  
      />
    )})
    : <p>loading...</p>

 return (
    <div>
      <div className="leaderboard-container">
        {sickoLeaders}
      </div>
    </div>
  )
}

export default AttributeLeaderboards;