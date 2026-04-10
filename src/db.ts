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

export type LeaderboardRow = BattingLeaderboardRow | PitchingLeaderboardRow | AttributeLeaderboardRow

export function groupByBoard<T extends LeaderboardRow>(
  rows: T[],
  getKey: (row: T) => string = (row) => (row as any).stat_key ?? (row as any).attr_name
): Record<string, T[]> {
  return rows.reduce((acc, row) => {
    const key = getKey(row)
    if (!acc[key]) acc[key] = []
    acc[key].push(row)
    return acc
  }, {} as Record<string, T[]>)
}

export async function fetchAttributeLeaderboard() {
  const { data, error } = await supabase
    .from('mv_attribute_leaderboard')
    .select('*')
    .order('attr_name')
    .order('rank_overall')
  if (error) throw error
  return data as AttributeLeaderboardRow[]
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

export type AttributeLeaderboardRow = {
  player_id: string
  first_name: string
  last_name: string
  suffix: string | null
  position: string
  team_name: string
  team_location: string
  team_emoji: string
  team_id: string
  attr_name: string
  attr_value: number
  rank_overall: number
}
