import { useEffect, useState } from "react"
import { groupByBoard, fetchAttributeLeaderboard } from "./db"
import type { AttributeLeaderboardRow } from "./db"
import { ATTRIBUTE_CATEGORIES } from "./TalkCard"
import Leaderboard from "./Leaderboard"
import './leaderboard.css'

function AttributeLeaderboards(){
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

const sickoLeaders = sickoData
  ? Object.fromEntries(
      Object.entries(ATTRIBUTE_CATEGORIES).map(([category, attrs]) => [
        category.toLowerCase(),
        attrs.filter(attr => sickoData[attr]).map(attr => (
          <Leaderboard
            key={attr}
            leaderboardType="attribute"
            statKey={attr}
            leaderboard={sickoData[attr]}
            getValue={(row) => Math.round(row.attr_value * 100)}
          />
        ))
      ])
    )
  : null

 return (
    <div className="leaderboard-box">
        <h2>Batting</h2>
      <div className="leaderboard-container">
        {sickoLeaders?.batting}
      </div>
        <h2>Pitching</h2>
      <div className="leaderboard-container">
        {sickoLeaders?.pitching}
      </div>
        <h2>Defense</h2>
      <div className="leaderboard-container">
        {sickoLeaders?.defense}
      </div>
        <h2>Baserunning</h2>
      <div className="leaderboard-container">
        {sickoLeaders?.baserunning}
      </div>
    </div>
  )
}

export default AttributeLeaderboards;