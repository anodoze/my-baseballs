import type { BattingLeaderboardRow } from "./db";
import type { PitchingLeaderboardRow } from "./db";

interface LeaderboardProps {
  statKey: string,
  leaderboard: BattingLeaderboardRow[] | PitchingLeaderboardRow[];
  leaderboardType: 'batting' | 'pitching' | 'attribute'
}

function Leaderboard ({statKey, leaderboard, leaderboardType}: LeaderboardProps) {

  const leaderList = leaderboard.map(leader => {
    if (!leader) return null;

    return(
      <li key={leader.player_id}>
        <p>{leader.first_name}</p>
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