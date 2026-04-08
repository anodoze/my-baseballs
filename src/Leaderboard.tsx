import type { BattingLeaderboardRow } from "./db";
import type { PitchingLeaderboardRow } from "./db";

interface LeaderboardProps {
  leaderboard: BattingLeaderboardRow[] | PitchingLeaderboardRow[];
  leaderboardType: 'batting' | 'pitching' | 'attribute'
}

function Leaderboard ({leaderboard, leaderboardType}: LeaderboardProps) {

  const leaderList = leaderboard.map(leader => {

  })

}