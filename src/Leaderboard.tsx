import type { BattingLeaderboardRow } from "./db";
import type { PitchingLeaderboardRow } from "./db";

interface LeaderboardProps {
  statKey: string,
  leaderboard: BattingLeaderboardRow[] | PitchingLeaderboardRow[];
  leaderboardType: 'batting' | 'pitching' | 'attribute'
}

function formatStat(value: number | string): string {
    const n = Number(value);
    return Number.isInteger(n) ? String(n) : n.toFixed(3);
}

function Leaderboard ({statKey, leaderboard, leaderboardType}: LeaderboardProps) {

  const leaderList = leaderboard.map(leader => {
    if (!leader) return null;

    const stat = formatStat(leader.stat_value)
  
    return(
      <li key={leader.player_id}>
        <p>{leader.first_name} {leader.last_name} {leader?.suffix} {leader.team_emoji} {leader.team_location} {leader.team_name} {stat} </p>
      </li>
    )
  })

  return (
    <div className="leaderboard">
      <div className="leaderboard-title">{statKey}</div>
      <ol>{leaderList}</ol>
    </div>
  )

}
export default Leaderboard;