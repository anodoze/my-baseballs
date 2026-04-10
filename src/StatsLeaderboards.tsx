import { useEffect, useState } from "react"
import { groupByBoard, fetchBattingLeaderboard, fetchPitchingLeaderboard, fetchGreaterPitchingLeaderboard, fetchGreaterBattingLeaderboard, fetchLesserBattingLeaderboard, fetchLesserPitchingLeaderboard } from "./db"
import type { BattingLeaderboardRow, PitchingLeaderboardRow } from "./db"
import { useParams } from "react-router"
import Leaderboard from "./Leaderboard"
import './leaderboard.css'

type LeagueInfo = {
  id: string
  Name: string
  Emoji: string
  Color: string
  LeagueType: string
}

const BATTING_STAT_ORDER = ['BA', 'BABIP', 'HR']
const PITCHING_STAT_ORDER = ['ERA', 'WHIP']

const LEAGUES: LeagueInfo[] = [
  { id: '__lesser__', Name: 'All Lesser Leagues',    Emoji: '',  Color: '5b9340', LeagueType: 'Lesser' },
  { id: '__greater__', Name: 'Greater League',    Emoji: '☘️🍍',  Color: '5b9340', LeagueType: 'Greater' },
  { id: '6805db0cac48194de3cd3ff4', Name: 'Amphibian',    Emoji: '🐸',  Color: '5b9340', LeagueType: 'Lesser' },
  { id: '6805db0cac48194de3cd3fe7', Name: 'Baseball',     Emoji: '⚾️',  Color: '47678e', LeagueType: 'Lesser' },
  { id: '6805db0cac48194de3cd3fe8', Name: 'Precision',    Emoji: '🎯',  Color: '507d45', LeagueType: 'Lesser' },
  { id: '6805db0cac48194de3cd3fe9', Name: 'Isosceles',    Emoji: '🔺',  Color: '7c65a3', LeagueType: 'Lesser' },
  { id: '6805db0cac48194de3cd3fea', Name: 'Liberty',      Emoji: '🗽',  Color: '2e768d', LeagueType: 'Lesser' },
  { id: '6805db0cac48194de3cd3feb', Name: 'Maple',        Emoji: '🍁',  Color: 'a13e33', LeagueType: 'Lesser' },
  { id: '6805db0cac48194de3cd3fec', Name: 'Cricket',      Emoji: '🦗',  Color: '4a8546', LeagueType: 'Lesser' },
  { id: '6805db0cac48194de3cd3fed', Name: 'Tornado',      Emoji: '🌪️',  Color: '5a5e6e', LeagueType: 'Lesser' },
  { id: '6805db0cac48194de3cd3fee', Name: 'Coleoptera',   Emoji: '🪲',  Color: '3f624d', LeagueType: 'Lesser' },
  { id: '6805db0cac48194de3cd3fef', Name: 'Clean',        Emoji: '🧼',  Color: '88b9ba', LeagueType: 'Lesser' },
  { id: '6805db0cac48194de3cd3ff0', Name: 'Shiny',        Emoji: '✨',  Color: 'e0d95a', LeagueType: 'Lesser' },
  { id: '6805db0cac48194de3cd3ff1', Name: 'Psychic',      Emoji: '🔮',  Color: '734d92', LeagueType: 'Lesser' },
  { id: '6805db0cac48194de3cd3ff2', Name: 'Unidentified', Emoji: '❓',  Color: '6c6c6c', LeagueType: 'Lesser' },
  { id: '6805db0cac48194de3cd3ff3', Name: 'Ghastly',      Emoji: '👻',  Color: '5b4b62', LeagueType: 'Lesser' },
  { id: '6805db0cac48194de3cd3ff5', Name: 'Deep',         Emoji: '🌊',  Color: '1a3a4f', LeagueType: 'Lesser' },
  { id: '6805db0cac48194de3cd3ff6', Name: 'Harmony',      Emoji: '🎵',  Color: '659b87', LeagueType: 'Lesser' },
]

function StatsLeaderboards(){
  // const { leagueID } = useParams() todo: change routing and use params so peopel can bookmark their league
  const [battingData, setBattingData] = useState<Record<string, BattingLeaderboardRow[]> | null>(null)
  const [pitchingData, setPitchingData] = useState<Record<string, PitchingLeaderboardRow[]> | null>(null)
  const [selectedLeague, setSelectedLeague] = useState<LeagueInfo>(LEAGUES[0])

    useEffect(() => {
    setBattingData(null)
    setPitchingData(null)
    console.log("fetching leaderboards...")

    document.title = `${selectedLeague.Emoji} ${selectedLeague.Name}`
    
    const battingFetch = fetchBattingLeaderboard(selectedLeague.id)
    const pitchingFetch = fetchPitchingLeaderboard(selectedLeague.id)

    battingFetch.then(data =>{
      const boards = groupByBoard(data)

      // TODO: setting fixed order for leaderboards
      // Object.entries(boards) 
      //   .sort(([a], [b]) => BATTING_STAT_ORDER.indexOf(a) - BATTING_STAT_ORDER.indexOf(b))
      //   .map(([statKey, leaderboard]) => ...)

      setBattingData(boards)
    })
    pitchingFetch.then(data =>{
      const boards = groupByBoard(data)
      setPitchingData(boards)
    })
  }, [selectedLeague])

  const battingLeaders = battingData ? Object.entries(battingData).map(([statKey, leaderboard]) => {
    return (
      <Leaderboard key={statKey} 
      leaderboardType={'batting'}
      statKey={statKey} 
      leaderboard={leaderboard}  
      />
    )})
    : <p>loading...</p>

  const pitchingLeaders = pitchingData ? Object.entries(pitchingData).map(([statKey, leaderboard]) => {
    return (
      <Leaderboard key={statKey} 
      leaderboardType={'pitching'}
      statKey={statKey} 
      leaderboard={leaderboard}  
      />
    )})
    : <p>loading...</p>

 return (
    <div>
      <div className="leaderboard-bar">
        <select
          className="league-selector"
          value={selectedLeague.id}
          onChange={e => setSelectedLeague(LEAGUES.find(l => l.id === e.target.value)!)}
        >
          {LEAGUES.map(league => (
            <option key={league.id} value={league.id}>
              {league.Emoji} {league.Name}
            </option>
          ))}
        </select>
      </div>
      <div className="leaderboard-container">
        {battingLeaders}
      </div>
      <div className="leaderboard-container">
        {pitchingLeaders}
      </div>
    </div>
  )
}

export default StatsLeaderboards;