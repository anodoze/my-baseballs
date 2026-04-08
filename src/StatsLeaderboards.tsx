import { useEffect, useState } from "react"
import { groupByBoard, fetchBattingLeaderboard } from "./db"
import type { BattingLeaderboardRow } from "./db"
import { useParams } from "react-router"
import Leaderboard from "./Leaderboard"

type LeagueInfo = {
  _id: string
  Name: string
  Emoji: string
  Color: string
  LeagueType: string
}

const LEAGUES: LeagueInfo[] = [
  { _id: "6805db0cac48194de3cd3ff4", Name: "Amphibian", Emoji: "🐸", Color: "5b9340", LeagueType: "Lesser" },
  // add more leagues here later
]

function StatsLeaderboards(){
  // const { leagueID } = useParams()
  const [battingData, setBattingData] = useState<Record<string, BattingLeaderboardRow[]> | null>(null)
  const [selectedLeague, setSelectedLeague] = useState<LeagueInfo>(LEAGUES[0])

  useEffect(() => {
    setBattingData(null)
    console.log("fetching leaderboards...")
    fetchBattingLeaderboard(selectedLeague._id).then(data =>{ // we can pull the id from params once basic display is working
      const boards = groupByBoard(data)
      console.log("leaderboards", boards)
      setBattingData(boards)
    })
  }, [selectedLeague])

  if (!battingData) return <p>oop</p>

 return (
    <div>
      <div style={{ borderLeft: `4px solid #${selectedLeague.Color}` }}>
        <span>{selectedLeague.Emoji} {selectedLeague.Name}</span>
        <select
          value={selectedLeague._id}
          onChange={e => setSelectedLeague(LEAGUES.find(l => l._id === e.target.value)!)}
        >
          {LEAGUES.map(league => (
            <option key={league._id} value={league._id}>
              {league.Emoji} {league.Name}
            </option>
          ))}
        </select>
      </div>

      {battingData
        ? Object.entries(battingData).map(([statKey, leaderboard]) => (
            <Leaderboard key={statKey} 
              leaderboardType={'batting'}
              statKey={statKey} 
              leaderboard={leaderboard}  
            />
          ))
        : <p>Loading...</p>
      }
    </div>
  )
}

export default StatsLeaderboards;

//6805db0cac48194de3cd3ff4 amphibian league