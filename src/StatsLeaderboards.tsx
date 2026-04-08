import { useEffect, useState } from "react"
import { groupByBoard, fetchBattingLeaderboard } from "./db"
import type { BattingLeaderboardRow } from "./db"
import { useParams } from "react-router"

function StatsLeaderboards(){
  // const { leagueID } = useParams()
  const [battingData, setBattingData] = useState<Record<string, BattingLeaderboardRow[]> | null>(null)

  useEffect(() => {
    console.log("fetching leaderboards...")
    fetchBattingLeaderboard('6805db0cac48194de3cd3ff4').then(data =>{
      console.log(data)
      const boards = groupByBoard(data)
      console.log("leaderboards", boards)
      setBattingData(boards)
    })
  }, [])

  useEffect(() => {

  }, [])

  return(
    <p>hi im stats</p>
  )
}

export default StatsLeaderboards;

//6805db0cac48194de3cd3ff4 amphibian