import { useEffect, useState } from "react"
import { groupByBoard, fetchBattingLeaderboard, fetchPitchingLeaderboard } from "./db"
import type { BattingLeaderboardRow, PitchingLeaderboardRow } from "./db"
import { useNavigate, useParams } from "react-router"
import Leaderboard from "./Leaderboard"
import './leaderboard.css'

type LeagueInfo = {
  id: string
  Name: string
  Emoji: string
  Color: string
  TextColor: string
  LeagueType: string
}

const BATTING_STAT_ORDER = [
  'Batting Average (BA)', 'On Base Percentage (OBP)', 'Slugging Percentage (SLG)', 
  'On Base Plus Slugging (OPS)', 'Batting Average on Balls in Play (BABIP)',
  'Hits', 'Singles', 'Doubles', 'Triples', 'Home Runs',
  'Runs', 'Runs Batted In (RBI)',
  'Walks', 'Hit By Pitch (HBP)', 'Stolen Bases',
  'Caught Stealing', 'Struck Out' 
]

const PITCHING_STAT_ORDER = [
  'Earned Run Average (ERA)', 'Fielding Independent Pitching (FIP)', 
  'Walks and Hits per Inning Pitched (WHIP)',
  'Strikeouts per 9 Innings (K/9)', 'Hits per 9 Innings (H/9)', 
  'Homeruns per 9 Innings (HR/9)', 'Walks per 9 Innings (BB/9)',
  'Strikeouts', 'Wins', 'Quality Starts', 'Saves', 'Innings Pitched (IP)',
  'Hit Batters'
]

const STAT_BLACKLIST = ['Fielding Independent Pitching (FIP)']

const LEAGUES: LeagueInfo[] = [
  { id: '__lesser__', Name: 'All Lesser Leagues',         Emoji: '🌎',  Color: '444', TextColor: 'fff', LeagueType: 'Lesser' },
  { id: '__greater__', Name: 'Greater League',            Emoji: '☘️🍍',Color: '444', TextColor: 'fff', LeagueType: 'Greater' },
  { id: '6805db0cac48194de3cd3ff4', Name: 'Amphibian',    Emoji: '🐸',  Color: '5b9340', TextColor: 'fff', LeagueType: 'Lesser' },
  { id: '6805db0cac48194de3cd3fe7', Name: 'Baseball',     Emoji: '⚾️',  Color: '47678e', TextColor: 'fff', LeagueType: 'Lesser' },
  { id: '6805db0cac48194de3cd3fe8', Name: 'Precision',    Emoji: '🎯',  Color: '507d45', TextColor: 'fff', LeagueType: 'Lesser' },
  { id: '6805db0cac48194de3cd3fe9', Name: 'Isosceles',    Emoji: '🔺',  Color: '7c65a3', TextColor: 'fff', LeagueType: 'Lesser' },
  { id: '6805db0cac48194de3cd3fea', Name: 'Liberty',      Emoji: '🗽',  Color: '2e768d', TextColor: 'fff', LeagueType: 'Lesser' },
  { id: '6805db0cac48194de3cd3feb', Name: 'Maple',        Emoji: '🍁',  Color: 'a13e33', TextColor: 'fff', LeagueType: 'Lesser' },
  { id: '6805db0cac48194de3cd3fec', Name: 'Cricket',      Emoji: '🦗',  Color: '4a8546', TextColor: 'fff', LeagueType: 'Lesser' },
  { id: '6805db0cac48194de3cd3fed', Name: 'Tornado',      Emoji: '🌪️',  Color: '5a5e6e', TextColor: 'fff', LeagueType: 'Lesser' },
  { id: '6805db0cac48194de3cd3fee', Name: 'Coleoptera',   Emoji: '🪲',  Color: '3f624d', TextColor: 'fff', LeagueType: 'Lesser' },
  { id: '6805db0cac48194de3cd3fef', Name: 'Clean',        Emoji: '🧼',  Color: '88b9ba', TextColor: '000', LeagueType: 'Lesser' },
  { id: '6805db0cac48194de3cd3ff0', Name: 'Shiny',        Emoji: '✨',  Color: 'e0d95a', TextColor: '000', LeagueType: 'Lesser' },
  { id: '6805db0cac48194de3cd3ff1', Name: 'Psychic',      Emoji: '🔮',  Color: '734d92', TextColor: 'fff', LeagueType: 'Lesser' },
  { id: '6805db0cac48194de3cd3ff2', Name: 'Unidentified', Emoji: '❓',  Color: '6c6c6c', TextColor: 'fff', LeagueType: 'Lesser' },
  { id: '6805db0cac48194de3cd3ff3', Name: 'Ghastly',      Emoji: '👻',  Color: '5b4b62', TextColor: 'fff', LeagueType: 'Lesser' },
  { id: '6805db0cac48194de3cd3ff5', Name: 'Deep',         Emoji: '🌊',  Color: '1a3a4f', TextColor: 'fff', LeagueType: 'Lesser' },
  { id: '6805db0cac48194de3cd3ff6', Name: 'Harmony',      Emoji: '🎵',  Color: '659b87', TextColor: '000', LeagueType: 'Lesser' },
]

function StatsLeaderboards(){
  const { leagueID } = useParams() 
  const navigate = useNavigate();
  const [battingData, setBattingData] = useState<Record<string, BattingLeaderboardRow[]> | null>(null)
  const [pitchingData, setPitchingData] = useState<Record<string, PitchingLeaderboardRow[]> | null>(null)
  const [selectedLeague, setSelectedLeague] = useState<LeagueInfo>(
    LEAGUES.find(l => l.id === leagueID) ?? LEAGUES[0]
  )

    useEffect(() => {
    setBattingData(null)
    setPitchingData(null)
    console.log("fetching leaderboards...")

    document.title = `${selectedLeague.Emoji} ${selectedLeague.Name} Leaders`
    
    const battingFetch = fetchBattingLeaderboard(selectedLeague.id)
    const pitchingFetch = fetchPitchingLeaderboard(selectedLeague.id)

    battingFetch.then(data =>{
      const boards = groupByBoard(data)
      console.log(boards)
      setBattingData(boards)
    })
    pitchingFetch.then(data =>{
      const boards = groupByBoard(data)
      console.log(boards)
      setPitchingData(boards)
    })
  }, [selectedLeague])

  const battingLeaders = battingData
    ? BATTING_STAT_ORDER.filter(key => battingData[key]).map(key => (
        <Leaderboard key={key} leaderboardType="batting" statKey={key} leaderboard={battingData[key]} />
      ))
    : <p>loading...</p>

  const pitchingLeaders = pitchingData
  ? PITCHING_STAT_ORDER
    .filter(key => pitchingData[key])
    .filter(key => !STAT_BLACKLIST.includes(key))
    .map(key => (
      <Leaderboard key={key} leaderboardType="pitching" statKey={key} leaderboard={pitchingData[key]} />
    ))
  : <p>loading...</p>

 return (
    <div 
      style={
        { 
          '--league-color': `#${selectedLeague.Color}`,
         '--league-text-color': `#${selectedLeague.TextColor}`
        }as React.CSSProperties}>
      <div className="leaderboard-bar">
        <select
          className="league-selector"
          value={selectedLeague.id}
          onChange={e => {
            const league = LEAGUES.find(l => l.id === e.target.value)!
            setSelectedLeague(league)
            navigate(`/stats-leaders/${league.id}`)
          }}
        >
          {LEAGUES.map(league => (
            <option key={league.id} value={league.id}>
              {league.Emoji} {league.Name}
            </option>
          ))}
        </select>
      </div>
      <div className="leaderboard-box">
        <h2>Batting</h2>
        <div className="leaderboard-container">
          {battingLeaders}
        </div>
        <h2>Pitching</h2>
        <div className="leaderboard-container">
          {pitchingLeaders}
        </div>
      </div>
    </div>
  )
}

export default StatsLeaderboards;