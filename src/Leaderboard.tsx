import type { BattingLeaderboardRow } from "./db";
import type { PitchingLeaderboardRow } from "./db";

interface LeaderboardProps {
  statKey: string,
  leaderboard: BattingLeaderboardRow[] | PitchingLeaderboardRow[];
  leaderboardType: 'batting' | 'pitching' | 'attribute'
}

function formatIP(value: number) {
    const totalOuts = Math.round(value * 3);
    const innings = Math.floor(totalOuts / 3);
    const outs = totalOuts % 3;
    return `${innings}.${outs}`;
}

function formatStat(value: number, leaderboardType: string, isIP: boolean)  {
    if (isIP) return formatIP(value)
    const n = Number(value);
    const fixedDigits = leaderboardType == 'batting' ? 3 : 2
    return Number.isInteger(n) ? String(n) : n.toFixed(fixedDigits);
}

function Leaderboard ({statKey, leaderboard, leaderboardType}: LeaderboardProps) {

  const isIP = statKey == 'IP'

  const leaderList = leaderboard.map(leader => {
    if (!leader) return;
    const stat = formatStat(leader.stat_value, leaderboardType, isIP)
  
    return (
      <li key={leader.player_id}>
        <div className="leader-row">

        <span className="leader-name">
          {leader.first_name} {leader.last_name} - {leader.suffix ? ` ${leader.suffix}` : ""}
        </span>
        <span className="leader-team">
          {leader.team_emoji} {leader.team_location} {leader.team_name}
        </span>
        <span className="leader-stat">{stat}</span>
        </div>
      </li>
    );
  })

  return (
    <div className="leaderboard">
      <div className="leaderboard-title">{statKey}</div>
      <ol>{leaderList}</ol>
    </div>
  )

}
export default Leaderboard;