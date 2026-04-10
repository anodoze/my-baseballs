// to regenerate types if needed: npx supabase gen types typescript --project-id ijmzfizwhfgaaquiinwo --schema public > src/types/supabase.ts
import { createClient } from '@supabase/supabase-js'
import type { QueryData } from '@supabase/supabase-js'
import type { Database } from './types/supabase'

export type TeamData = QueryData<ReturnType<typeof teamQuery>>

const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL, 
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export async function fetchTeam(teamID: string){
  const { data, error } = await teamQuery(teamID)
  if (error) throw error
  return data
}

const teamQuery = (teamID: string) => supabase
  .from('teams')
  .select(`
    id, name, location, emoji, color,
    players (
      id, first_name, last_name, suffix, number, position, position_type, level, slot,
      player_stats (*),
      player_details (details)
    )
  `)
  .eq('id', teamID)
  .single()

export async function fetchBattingLeaderboard(leagueId: string) {
  const { data, error } = await supabase
    .from('mv_batting_leaderboard')
    .select('*')
    .eq('league_id', leagueId)
    .order('stat_key')
    .order('rank_in_league')
  if (error) throw error
  return data as BattingLeaderboardRow[]
}

export async function fetchPitchingLeaderboard(leagueId: string) {
  const { data, error } = await supabase
    .from('mv_pitching_leaderboard')
    .select('*')
    .eq('league_id', leagueId)
    .order('stat_key')
    .order('rank_in_league')
  if (error) throw error
  return data as PitchingLeaderboardRow[]
}

export async function fetchLeagueBattingContext(leagueId: string) {
  const { data, error } = await supabase
    .from('mv_league_batting_context')
    .select('*')
    .eq('league_id', leagueId)
    .single()
  if (error) throw error
  return data as LeagueBattingContext
}

export async function fetchLeaguePitchingContext(leagueId: string) {
  const { data, error } = await supabase
    .from('mv_league_pitching_context')
    .select('*')
    .eq('league_id', leagueId)
    .single()
  if (error) throw error
  return data as LeaguePitchingContext
}

export async function fetchGreaterBattingLeaderboard() {
  const { data, error } = await supabase
    .from('mv_batting_leaderboard')
    .select('*')
    .eq('league_type', 'Greater')
    .order('stat_key')
    .order('rank_in_league')
  if (error) throw error
  return rerankBatting(data as BattingLeaderboardRow[])
}

export async function fetchLesserBattingLeaderboard() {
  const { data, error } = await supabase
    .from('mv_batting_leaderboard')
    .select('*')
    .eq('league_type', 'Lesser')
    .order('stat_key')
    .order('rank_in_league')
  if (error) throw error
  return rerankBatting(data as BattingLeaderboardRow[])
}

// stat_keys where lower is better — everything else is descending
const ASCENDING_STATS = new Set(['cs', 'k'])

function rerankBatting(rows: BattingLeaderboardRow[]): BattingLeaderboardRow[] {
  const boards = groupByBoard(rows)
  return Object.entries(boards).flatMap(([stat_key, players]) => {
    const sorted = [...players].sort((a, b) =>
      ASCENDING_STATS.has(stat_key)
        ? a.stat_value - b.stat_value
        : b.stat_value - a.stat_value
    )
    return sorted.slice(0, 10).map((p, i) => ({ ...p, rank_in_league: i + 1 }))
  })
}

type LeaderboardRow = BattingLeaderboardRow | PitchingLeaderboardRow

export function groupByBoard<T extends LeaderboardRow>(rows: T[]): Record<string, T[]> {
  return rows.reduce((acc, row) => {
    if (!acc[row.stat_key]) acc[row.stat_key] = []
    acc[row.stat_key].push(row)
    return acc
  }, {} as Record<string, T[]>)
}

const PITCHING_ASCENDING_STATS = new Set(
  [
    'Earned Run Average (ERA)', 
    'Fielding Independent Pitching (FIP)', 
    'Walks and Hits per Innings Pitched (WHIP)', 
    'Walks per 9 Innings (BB/9)', 
    'Hits per 9 Innings (H/9)', 
    'Homeruns per 9 Innings (HR/9)' // space is also in db, fix later
  ]
)

export function rerankPitching(rows: PitchingLeaderboardRow[]): PitchingLeaderboardRow[] {
  const boards = groupByBoard(rows)
  return Object.entries(boards).flatMap(([stat_key, players]) => {
    const sorted = [...players].sort((a, b) =>
      PITCHING_ASCENDING_STATS.has(stat_key)
        ? a.stat_value - b.stat_value
        : b.stat_value - a.stat_value
    )
    return sorted.slice(0, 10).map((p, i) => ({ ...p, rank_in_league: i + 1 }))
  })
}

export async function fetchGreaterPitchingLeaderboard() {
  const { data, error } = await supabase
    .from('mv_pitching_leaderboard')
    .select('*')
    .eq('league_type', 'Greater')
    .order('stat_key')
    .order('rank_in_league')
  if (error) throw error
  return rerankPitching(data as PitchingLeaderboardRow[])
}

export async function fetchLesserPitchingLeaderboard() {
  const { data, error } = await supabase
    .from('mv_pitching_leaderboard')
    .select('*')
    .eq('league_type', 'Lesser')
    .order('stat_key')
    .order('rank_in_league')
  if (error) throw error
  return rerankPitching(data as PitchingLeaderboardRow[])
}

export type BattingLeaderboardRow = {
  player_id: string
  first_name: string
  last_name: string
  suffix: string | null
  position: string
  team_name: string
  team_location: string
  team_emoji: string
  team_id: string
  league_id: string
  league_name: string
  league_type: string
  plate_appearances: number
  pa_threshold: number
  stat_value: number
  stat_key: string
  rank_in_league: number
}

export type PitchingLeaderboardRow = {
  player_id: string
  first_name: string
  last_name: string
  suffix: string | null
  position: string
  team_name: string
  team_location: string
  team_emoji: string
  team_id: string
  league_id: string
  league_name: string
  league_type: string
  innings_pitched: number
  ip_threshold: number
  stat_value: number
  stat_key: string
  rank_in_league: number
}

export type LeagueBattingContext = {
  league_id: string
  league_name: string
  league_type: string
  qualified_batters: number
  avg_ba: number
  avg_obp: number
  avg_slg: number
  avg_ops: number
  avg_babip: number
}

export type LeaguePitchingContext = {
  league_id: string
  league_name: string
  league_type: string
  qualified_pitchers: number
  avg_era: number
  avg_whip: number
  avg_k9: number
  avg_bb9: number
  avg_h9: number
  avg_hr9: number
  fip_constant: number
}