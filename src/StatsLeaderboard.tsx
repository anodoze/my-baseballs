import { useEffect, useState } from "react"
import { groupByBoard, fetchBattingLeaderboard } from "./db"
import type { BattingLeaderboardRow } from "./db"

function StatsLeaderboard(){
  const [battingData, setBattingData] = useState<Record<string, BattingLeaderboardRow[]> | null>(null)

  useEffect(() => {
    console.log("fetching leaderboards...")
    fetchBattingLeaderboard('__greater__').then(data =>{
      console.log(data)
      const boards = groupByBoard(data)
      console.log("leaderboards", boards)
      setBattingData(boards)
    })
  }, [])

  return(
    <p>hi im stats</p>
  )
}

export default StatsLeaderboard;

//6805db0cac48194de3cd3ff4 amphibian